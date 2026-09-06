const { inspectWebsite, determineOpportunityType } = require("./websiteInspector");

/**
 * Normalizes a URL to get the base domain for matching
 */
function getBaseDomain(url) {
  try {
    const hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    return hostname.replace(/^www\./, "").toLowerCase();
  } catch (e) {
    return (url || "").toLowerCase();
  }
}

/**
 * Extracts a domain from a string (useful for social links)
 */
function extractDomain(text) {
  if (!text) return null;
  const match = text.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i);
  return match ? match[1].toLowerCase() : null;
}

const SOCIAL_DIRECTORIES = [
  "facebook.com", "instagram.com", "justdial.com", "indiamart.com", 
  "youtube.com", "twitter.com", "linkedin.com", "pinterest.com", 
  "yelp.com", "tripadvisor.com", "sulekha.com", "dialindia.com", 
  "maps.google.com", "google.com", "whatsapp.com", "tradeindia.com",
  "linktr.ee", "beacons.ai"
];

async function verifyBusinessWebsite(lead, searchProvider) {
  const evidence = [];
  const verificationSources = [];
  let confidence = 0;
  let discoveredWebsite = null;
  let websiteStatus = "NO_WEBSITE";

  // Step 1: Check existing direct URL
  if (lead.website && lead.website.trim() !== "") {
    const directDomain = getBaseDomain(lead.website);
    const isSocial = SOCIAL_DIRECTORIES.some(dir => directDomain.includes(dir));
    
    if (!isSocial) {
      const directAudit = await inspectWebsite(lead.website, lead);
      if (directAudit.status !== "NO_WEBSITE") {
        evidence.push({ type: "direct_provided", value: lead.website });
        return {
          websiteStatus: directAudit.status,
          confidence: 100,
          discoveredWebsite: lead.website,
          verificationSources: ["Initial Dataset"],
          evidence,
          checkedQueries: [],
          verificationAttempts: ["direct_url"],
          opportunityType: directAudit.opportunityType,
          verificationReason: "Direct website found in initial dataset."
        };
      }
    }
  }

  // Step 2: Search Pipeline
  const queries = [
    `${lead.name} ${lead.city || ""}`.trim(),
    `${lead.name} ${lead.phone || ""}`.trim(),
    `${lead.name} ${lead.industry || ""}`.trim(),
    lead.phone ? `${lead.phone}` : ""
  ].filter(q => q && q.trim().length > 4);

  const checkedQueries = [];
  const verificationAttempts = [];

  let candidateUrl = null;
  let bestMatchEvidence = null;

  for (const query of queries) {
    if (checkedQueries.includes(query)) continue;
    
    checkedQueries.push(query);
    verificationAttempts.push(`search: ${query}`);
    
    const results = await searchProvider.search(query);
    if (!verificationSources.includes("Search API")) {
      verificationSources.push("Search API");
    }

    for (const res of results) {
      const domain = getBaseDomain(res.link);
      const isDirectory = SOCIAL_DIRECTORIES.some(dir => domain.includes(dir));
      
      if (!isDirectory) {
        // Identity Matching
        const lowerTitle = (res.title || "").toLowerCase();
        const lowerSnippet = (res.snippet || "").toLowerCase();
        const lowerName = (lead.name || "").toLowerCase();
        
        // Remove common words for better matching
        const cleanName = lowerName.replace(/ (inc|ltd|llc|private|limited|company|co)\.?$/g, "").trim();
        const nameParts = cleanName.split(" ").filter(p => p.length > 2);
        
        let nameMatch = false;
        if (nameParts.length > 0) {
          // Require at least partial match of the core name
          const matchCount = nameParts.filter(part => lowerTitle.includes(part) || lowerSnippet.includes(part) || domain.includes(part)).length;
          nameMatch = matchCount / nameParts.length >= 0.5;
        }

        // Require location match if provided, OR require an exact name match.
        // We want to avoid matching "SimilarName Group UK" for "SimilarName Inc Pune".
        const exactNameMatch = lowerTitle.includes(cleanName) || lowerSnippet.includes(cleanName);
        const hasConflictingLocation = lowerTitle.includes("uk ") || lowerSnippet.includes("london") || lowerSnippet.includes("uk "); // Basic example
        
        const locationMatch = lead.city && (lowerTitle.includes(lead.city.toLowerCase()) || lowerSnippet.includes(lead.city.toLowerCase()));
        
        let identityVerified = false;
        if (exactNameMatch && locationMatch) {
          identityVerified = true;
        } else if (nameMatch && locationMatch) {
          identityVerified = true;
        } else if (exactNameMatch && !hasConflictingLocation) {
          // If the name matches exactly and there is no evidence of a conflicting location, assume it's them.
          identityVerified = true;
        }
        
        if (identityVerified) {
          candidateUrl = res.link;
          bestMatchEvidence = {
            type: "search_discovery",
            value: `Found matching domain (${res.link}) via query: "${query}"`,
            details: `Title/Snippet matched business identity.`
          };
          break; // found one
        }
      } else {
        // It's a directory, maybe we can extract a domain from the snippet or it matches social links
        const snippetDomain = extractDomain(res.snippet);
        if (snippetDomain && !SOCIAL_DIRECTORIES.some(dir => snippetDomain.includes(dir))) {
           // We could potentially use this, but for safety, we rely on the direct search results
        }
      }
    }
    
    if (candidateUrl) break; // Break out of queries loop if found
  }

  // Step 3: Evaluate Candidate URL
  if (candidateUrl) {
    evidence.push(bestMatchEvidence);
    const audit = await inspectWebsite(candidateUrl, lead);
    
    if (audit.status !== "NO_WEBSITE") {
      websiteStatus = audit.status;
      confidence = 95;
    } else {
      // even if inspectWebsite fails hard, we discovered a domain
      websiteStatus = "WEAK_WEBSITE";
      confidence = 85;
    }
    
    discoveredWebsite = candidateUrl;

    return {
      websiteStatus,
      confidence,
      discoveredWebsite,
      verificationSources,
      evidence,
      checkedQueries,
      verificationAttempts,
      opportunityType: determineOpportunityType(websiteStatus, lead),
      verificationReason: `Website discovered via search and identity matching.`
    };
  }

  // Step 4: NO_WEBSITE Assignment (Confidence Gate)
  evidence.push({
    type: "business_search",
    value: "No credible business-owned website found across all search queries."
  });
  
  if (checkedQueries.length >= 2) {
    confidence = 90; // Passed minimum threshold 85
    websiteStatus = "NO_WEBSITE";
  } else {
    confidence = 50; 
    websiteStatus = "WEBSITE_VERIFICATION_UNCERTAIN";
  }

  return {
    websiteStatus,
    confidence,
    discoveredWebsite: null,
    verificationSources,
    evidence,
    checkedQueries,
    verificationAttempts,
    opportunityType: determineOpportunityType(websiteStatus, lead),
    verificationReason: confidence >= 85 ? "Exhausted search strategies; no website found." : "Insufficient verification data."
  };
}

module.exports = {
  verifyBusinessWebsite,
  getBaseDomain
};
