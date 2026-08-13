/**
 * Website Opportunity Audit & Inspection Engine
 * Inspects a business's digital presence, URL technical status, tech stack,
 * and visual signals to classify digital gap and opportunity type.
 */

const SOCIAL_DIRECTORIES = [
  "facebook.com", "instagram.com", "justdial.com", "indiamart.com",
  "youtube.com", "twitter.com", "linkedin.com", "pinterest.com",
  "yelp.com", "tripadvisor.com", "sulekha.com", "dialindia.com",
  "maps.google.com", "google.com", "whatsapp.com"
];

// Modern website indicators (domains or modern website builders/frameworks that indicate a strong modern site)
const MODERN_STACK_MARKERS = [
  "framer.app", "webflow.io", "vercel.app", "netlify.app", "shopify.com",
  "squarespace.com", "wixsite.com"
];

/**
 * Classifies website status and calculates Digital Gap Score (0-25)
 * @param {string|null} websiteUrl 
 * @param {object} metadata - Extra business context (industry, social profile, etc.)
 */
async function inspectWebsite(websiteUrl, metadata = {}) {
  const cleanUrl = (websiteUrl || "").trim().toLowerCase();

  // 1. Check if no custom website exists or if it's a social/directory link
  if (!cleanUrl || SOCIAL_DIRECTORIES.some(domain => cleanUrl.includes(domain))) {
    return {
      status: "NO_WEBSITE",
      isCustomDomain: false,
      digitalGapScore: 24, // High priority opportunity (range 22-25)
      opportunityType: determineOpportunityType("NO_WEBSITE", metadata),
      signals: [
        "No custom business website detected",
        "Relies solely on directory listings or social media profiles",
        "Lacks dedicated digital brand identity and direct conversion funnel"
      ],
      disqualified: false
    };
  }

  // 2. Normalize domain URL
  let fullUrl = cleanUrl;
  if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
    fullUrl = `https://${fullUrl}`;
  }

  try {
    // Perform fast HTTP inspection with 4s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(fullUrl, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ASENRA Opportunity Inspector/2.0"
      }
    }).catch(() => null);

    clearTimeout(timeoutId);

    // If unreachable or 404/500 server error
    if (!response || !response.ok) {
      return {
        status: "WEAK_WEBSITE",
        isCustomDomain: true,
        digitalGapScore: 21,
        opportunityType: "WEBSITE REDESIGN",
        signals: [
          "Domain exists but website is unreachable or returning server errors",
          "Potential security/SSL or hosting downtime issue",
          "High loss of prospective client trust"
        ],
        disqualified: false
      };
    }

    const html = await response.text().catch(() => "");
    const lowerHtml = html.toLowerCase();

    // Check HTTPS status
    const isHttps = fullUrl.startsWith("https://");

    // Check for modern website framework markers
    const hasNextJs = lowerHtml.includes("__next") || lowerHtml.includes("_next/static");
    const hasReact = lowerHtml.includes("react") || lowerHtml.includes("react-dom");
    const hasFramer = lowerHtml.includes("framer") || lowerHtml.includes("framer-motion");
    const hasWebflow = lowerHtml.includes("webflow");
    const hasTailwind = lowerHtml.includes("tailwind");

    // Check for outdated/basic markers
    const isOldWordpress = lowerHtml.includes("wp-content/themes") && (lowerHtml.includes("twentyfifteen") || lowerHtml.includes("twentyfourteen") || lowerHtml.includes("bootstrap/3"));
    const isTableBased = lowerHtml.includes("<table") && lowerHtml.includes("cellspacing");
    const hasViewport = lowerHtml.includes("viewport");
    const hasEnquiryForm = lowerHtml.includes("<form") || lowerHtml.includes("contact-form") || lowerHtml.includes("type=\"submit\"");

    // Evaluate strength
    let score = 15;
    let status = "BASIC_WEBSITE";
    const signals = [];

    if (!isHttps) {
      signals.push("Missing HTTPS security certificate");
      score += 3;
    }

    if (!hasViewport) {
      signals.push("Lacks mobile responsive viewport tag");
      score += 4;
      status = "OUTDATED_WEBSITE";
    }

    if (isOldWordpress || isTableBased) {
      signals.push("Outdated website structure and legacy template design");
      status = "OUTDATED_WEBSITE";
      score = Math.max(score, 18);
    }

    if (!hasEnquiryForm) {
      signals.push("No clear enquiry form or lead capture funnel detected");
      score += 2;
    }

    // Check if it's a STRONG or MODERN website that should be disqualified
    if ((hasNextJs || hasFramer || (hasWebflow && hasTailwind)) && isHttps && hasViewport && hasEnquiryForm) {
      status = "STRONG_WEBSITE";
      score = 2;
      signals.push("High-quality modern web application already present");
      return {
        status,
        isCustomDomain: true,
        digitalGapScore: score,
        opportunityType: "DIGITAL BRAND EXPERIENCE",
        signals,
        disqualified: true // HARD DISQUALIFY
      };
    } else if ((hasReact || hasWebflow || lowerHtml.includes("elementor")) && isHttps && hasViewport) {
      status = "MODERN_WEBSITE";
      score = 6;
      signals.push("Decent modern website already active");
      return {
        status,
        isCustomDomain: true,
        digitalGapScore: score,
        opportunityType: "WEBSITE MODERNIZATION",
        signals,
        disqualified: score < 8 // Disqualify if modern site is good enough
      };
    }

    // Final categorization for inspectable site
    const opportunityType = determineOpportunityType(status, metadata);

    return {
      status,
      isCustomDomain: true,
      digitalGapScore: Math.min(25, Math.max(8, score)),
      opportunityType,
      signals,
      disqualified: false
    };

  } catch (err) {
    // Fallback if inspection fails gracefully
    return {
      status: "WEAK_WEBSITE",
      isCustomDomain: true,
      digitalGapScore: 19,
      opportunityType: "WEBSITE REDESIGN",
      signals: ["Website inspection timed out or encountered firewall block"],
      disqualified: false
    };
  }
}

/**
 * Determines primary Website Opportunity Type based on observed business traits & site status
 */
function determineOpportunityType(status, metadata = {}) {
  const category = (metadata.category || "").toLowerCase();
  const industry = (metadata.industry || "").toLowerCase();

  if (status === "NO_WEBSITE") {
    if (industry.includes("manufactur") || industry.includes("equipment") || industry.includes("industrial") || industry.includes("b2b")) {
      return "B2B CORPORATE WEBSITE";
    }
    if (industry.includes("architect") || industry.includes("interior") || industry.includes("furniture") || industry.includes("design")) {
      return "PORTFOLIO WEBSITE";
    }
    if (industry.includes("audio") || industry.includes("sound") || industry.includes("av") || industry.includes("product")) {
      return "PRODUCT CATALOG WEBSITE";
    }
    return "NEW WEBSITE";
  }

  if (status === "WEAK_WEBSITE" || status === "OUTDATED_WEBSITE") {
    if (industry.includes("architect") || industry.includes("interior") || industry.includes("luxury")) {
      return "DIGITAL BRAND EXPERIENCE";
    }
    return "WEBSITE REDESIGN";
  }

  if (industry.includes("b2b") || industry.includes("supplier") || industry.includes("engineering")) {
    return "B2B CORPORATE WEBSITE";
  }

  return "WEBSITE MODERNIZATION";
}

module.exports = {
  inspectWebsite,
  determineOpportunityType
};
