const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { inspectWebsite } = require("../src/lib/websiteInspector");
const { verifyBusinessWebsite } = require("../src/lib/websiteVerification");
const { ApifySearchProvider, CachedSearchProvider } = require("../src/lib/searchProvider");
const { evaluateLeadIntelligence } = require("../src/lib/scoringEngine");

// 1. Load environment variables
const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseKey = "";
let apifyToken = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split(/\r?\n/);
  for (const line of lines) {
    const parts = line.split("=");
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_URL") {
      supabaseUrl = parts[1].trim();
    }
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
      supabaseKey = parts[1].trim();
    }
    if (parts[0] === "APIFY_TOKEN") {
      apifyToken = parts[1].trim();
    }
  }
}

supabaseUrl = (supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
supabaseKey = (supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
apifyToken = (apifyToken || process.env.APIFY_TOKEN || "").trim();

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase credentials not found!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// High-Intent Target Queries across India
const ICP_QUERIES = [
  "professional audio manufacturer in India",
  "sound equipment manufacturer in Mumbai",
  "AV integrator in Bangalore",
  "architecture studio in Pune",
  "interior design firm in Delhi NCR",
  "luxury furniture manufacturer in Jaipur",
  "specialized industrial equipment manufacturer in Ahmedabad",
  "event production company in Hyderabad",
  "custom automotive shop in Chennai",
  "boutique hotel in Rajasthan",
  "real estate developer in Gurgaon",
  "commercial lighting manufacturer in India"
];

// Fallback High-Intent Leads matching ASENRA ICP
const FALLBACK_HIGH_INTENT_LEADS = [
  {
    name: "SRS Sound & Cabinets",
    industry: "Professional Audio & Manufacturing",
    phone: "+91 98220 11223",
    email: "contact@srssound.in",
    address: " Bhosari Industrial Estate, Pune",
    city: "Pune",
    state: "Maharashtra",
    maps_link: "https://maps.google.com/?q=SRS+Sound+Pune",
    rating: 4.8,
    review_count: 142,
    social_links: "instagram.com/srssound_official",
    category: "architecture",
    website: "", // No website
    tagline: "Bespoke Concert Loudspeakers & Industrial Enclosures",
    description: "Pioneering high-output loudspeaker engineering, touring cabinets, and custom acoustic enclosures for pro audio rentals across India.",
    services: "Touring Line Arrays, Subwoofer Cabinets, Acoustic Design, OEM Pro Audio Manufacturing"
  },
  {
    name: "Aethel Architecture Studio",
    industry: "Architecture & Interior Design",
    phone: "+91 98190 88776",
    email: "projects@aethelstudio.com",
    address: "Koregaon Park, Pune",
    city: "Pune",
    state: "Maharashtra",
    maps_link: "https://maps.google.com/?q=Aethel+Architecture",
    rating: 4.9,
    review_count: 58,
    social_links: "instagram.com/aethel_architecture",
    category: "architecture",
    website: "http://aethelstudio-oldtemp.in", // Outdated website
    tagline: "Monolithic Residential Architecture & Bespoke Space Planning",
    description: "Award-winning architectural studio specializing in luxury villa design, sustainable commercial spaces, and high-end residential interiors.",
    services: "Luxury Villa Architecture, Commercial Space Design, Sustainable Building Planning"
  },
  {
    name: "Kavya Industrial Transformers",
    industry: "Specialized Industrial Manufacturing",
    phone: "+91 20 2712 4455",
    email: "sales@kavyatransformers.co.in",
    address: "Chakan MIDC Phase 2, Pune",
    city: "Pune",
    state: "Maharashtra",
    maps_link: "https://maps.google.com/?q=Kavya+Industrial",
    rating: 4.6,
    review_count: 38,
    social_links: "linkedin.com/company/kavyatransformers",
    category: "services",
    website: "", // No website
    tagline: "Heavy-Duty Power Transformers & Substation Equipment",
    description: "Leading manufacturer of industrial step-down transformers, oil-immersed distribution units, and custom power grid infrastructure.",
    services: "Distribution Transformers, Substation Contracting, Custom Industrial Power Supplies"
  },
  {
    name: "Vogue Living Bespoke Furniture",
    industry: "Luxury Furniture & Interior Styling",
    phone: "+91 99201 33445",
    email: "info@vogueliving.in",
    address: "Indiranagar 100ft Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    maps_link: "https://maps.google.com/?q=Vogue+Living+Bangalore",
    rating: 4.7,
    review_count: 94,
    social_links: "instagram.com/vogueliving_india",
    category: "boutique",
    website: "http://voguelivingfurniture.com", // Weak website
    tagline: "Bespoke Handcrafted Hardwood Furniture & Luxury Interiors",
    description: "Custom solid-wood dining tables, brass-finished upholstery, and curated aesthetic furniture for high-end residences and luxury hotels.",
    services: "Custom Hardwood Furniture, Luxury Sofa Crafting, Commercial Hotel Fitouts"
  },
  {
    name: "Apex Velocity Custom Automotive",
    industry: "Premium Automotive & Performance",
    phone: "+91 98450 77112",
    email: "builds@apexvelocity.in",
    address: "UB City Corridor, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    maps_link: "https://maps.google.com/?q=Apex+Velocity",
    rating: 4.9,
    review_count: 110,
    social_links: "instagram.com/apex_velocity_customs",
    category: "services",
    website: "", // No website
    tagline: "Supercar Detailing, Performance Exhausts & Custom Restorations",
    description: "South India's premier exotic vehicle customization workshop specializing in ceramic coating, performance exhausts, and vintage restorations.",
    services: "Exotic Car Detailing, Valved Exhaust Systems, Custom Body Restorations"
  }
];

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-");
}

function cleanBusinessName(name) {
  if (!name) return "";
  let parts = name.split(/[|:-]/);
  for (let part of parts) {
    part = part.trim();
    if (!/[\u0900-\u097F\u0A80-\u0AFF]/.test(part) && part.length > 2) {
      return part;
    }
  }
  let cleaned = name.replace(/[\u0900-\u097F\u0A80-\u0AFF]/g, "").replace(/^[|:.,\-\&]+|[|:.,\-\&]+$/g, "").trim();
  return cleaned.replace(/\s+/g, ' ');
}

// Normalizes business identifier for deduplication
function getDeduplicationKey(item) {
  const nameKey = cleanBusinessName(item.name || item.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const phoneKey = (item.phone || "").replace(/\D/g, "");
  return `${nameKey}_${phoneKey.slice(-8)}`;
}

async function fetchCandidateLeads() {
  if (!apifyToken) {
    console.log("No Apify token found in .env.local. Running with curated high-intent fallback candidates...");
    return FALLBACK_HIGH_INTENT_LEADS;
  }

  try {
    const selectedQuery = ICP_QUERIES[Math.floor(Math.random() * ICP_QUERIES.length)];
    console.log(`Searching Apify Google Places for high-intent query: "${selectedQuery}"...`);

    const response = await fetch(
      `https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=${apifyToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchStringsArray: [selectedQuery],
          maxCrawledPlacesPerSearch: 30,
        })
      }
    );

    const runData = await response.json();
    if (!runData || !runData.data) {
      console.warn("Apify run initiation failed. Using curated high-intent fallback candidates...");
      return FALLBACK_HIGH_INTENT_LEADS;
    }

    const runId = runData.data.id;
    const datasetId = runData.data.defaultDatasetId;

    // Poll for results up to 3 minutes
    for (let i = 0; i < 18; i++) {
      await new Promise(r => setTimeout(r, 10000));
      const runRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${apifyToken}`);
      const runInfo = await runRes.json();
      const status = runInfo.data?.status;
      if (status && status !== "RUNNING" && status !== "READY") {
        break;
      }
    }

    const statusRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${apifyToken}`);
    const results = await statusRes.json();

    if (!Array.isArray(results) || results.length === 0) {
      return FALLBACK_HIGH_INTENT_LEADS;
    }

    return results.map(item => ({
      name: cleanBusinessName(item.title || "Business Candidate"),
      industry: item.categoryName || "Specialized Commercial Business",
      phone: item.phone || "",
      email: item.email || "",
      address: item.address || "India",
      city: item.city || "Mumbai",
      state: item.state || "Maharashtra",
      maps_link: item.url || "https://maps.google.com",
      rating: item.totalScore || 4.5,
      review_count: item.reviewsCount || 0,
      social_links: item.instagram || item.facebook || item.linkedin || "",
      category: (item.categoryName || "").toLowerCase().includes("architect") ? "architecture" : "services",
      website: item.website || "",
      tagline: item.subTitle || null,
      description: item.description || null,
      services: item.additionalInfo?.services || "Bespoke Commercial Services"
    }));
  } catch (err) {
    console.error("Apify scraping failed:", err.message);
    return FALLBACK_HIGH_INTENT_LEADS;
  }
}

async function runProspectingPipeline() {
  console.log("=================================================");
  console.log("ASENRA HIGH-INTENT OPPORTUNITY INTELLIGENCE ENGINE");
  console.log("=================================================");

  const rawCandidates = await fetchCandidateLeads();
  console.log(`Discovered ${rawCandidates.length} raw business candidates.`);

  // 1. Deduplication Map
  const uniqueCandidatesMap = new Map();
  for (const candidate of rawCandidates) {
    const key = getDeduplicationKey(candidate);
    if (!uniqueCandidatesMap.has(key) && candidate.name) {
      uniqueCandidatesMap.set(key, candidate);
    }
  }

  const uniqueCandidates = Array.from(uniqueCandidatesMap.values());
  console.log(`Deduplicated down to ${uniqueCandidates.length} unique candidates.`);

  // Initialize Search Provider
  const baseSearchProvider = new ApifySearchProvider(apifyToken);
  const searchProvider = new CachedSearchProvider(baseSearchProvider);

  // 2. Audit & Score Candidates
  const qualifiedScoredLeads = [];

  for (const candidate of uniqueCandidates) {
    console.log(`\nInspecting digital presence & scoring: ${candidate.name}...`);
    
    // Website Opportunity Audit Pipeline (Strict Verification)
    const websiteAudit = await verifyBusinessWebsite(candidate, searchProvider);

    // Multi-factor qualification & intelligence score
    const intelligence = evaluateLeadIntelligence(candidate, websiteAudit);

    console.log(`  └ Website Status: ${intelligence.website_status}`);
    console.log(`  └ Total Score: ${intelligence.total_score}/100 [Priority: ${intelligence.priority}]`);
    console.log(`  └ Disqualified: ${intelligence.disqualified ? 'YES' : 'NO'}`);

    if (!intelligence.disqualified) {
      qualifiedScoredLeads.push({
        ...candidate,
        slug: slugify(candidate.name),
        status: "QUALIFIED",
        website: candidate.website || "",
        website_status: intelligence.website_status,
        website_opportunity_type: intelligence.website_opportunity_type,
        total_score: intelligence.total_score,
        priority: intelligence.priority,
        maturity_score: intelligence.maturity_score,
        commercial_value_score: intelligence.commercial_value_score,
        visual_richness_score: intelligence.visual_richness_score,
        digital_gap_score: intelligence.digital_gap_score,
        contactability_score: intelligence.contactability_score,
        growth_intent_score: intelligence.growth_intent_score,
        confidence_indicators: intelligence.confidence_indicators,
        why_this_lead: intelligence.why_this_lead,
        why_asenra: intelligence.why_asenra,
        key_signals: intelligence.key_signals
      });
    }
  }

  // 3. Global Ranking & Industry Diversity Enforcement
  qualifiedScoredLeads.sort((a, b) => b.total_score - a.total_score);

  const finalTop5Leads = [];
  const industryCounts = new Map();

  for (const lead of qualifiedScoredLeads) {
    const indKey = (lead.industry || "general").toLowerCase();
    const currentCount = industryCounts.get(indKey) || 0;

    // Enforce max 2 leads per industry category in daily batch
    if (currentCount < 2) {
      finalTop5Leads.push(lead);
      industryCounts.set(indKey, currentCount + 1);
    }

    if (finalTop5Leads.length >= 5) {
      break;
    }
  }

  console.log("\n-------------------------------------------------");
  console.log(`FINAL QUALIFIED TOP ${finalTop5Leads.length} HIGH-INTENT LEADS FOR TODAY:`);
  console.log("-------------------------------------------------");

  let upsertCount = 0;
  for (let i = 0; i < finalTop5Leads.length; i++) {
    const lead = finalTop5Leads[i];
    console.log(`#${i + 1} | ${lead.name} (${lead.city}, ${lead.state}) | Score: ${lead.total_score}/100 | Status: ${lead.website_status}`);
    console.log(`     Why Asenra: "${lead.why_asenra}"`);

    // Construct database payload matching Supabase table schema
    let parsedDescription = lead.description || "";
    const intelligenceMeta = {
      summary: parsedDescription,
      website: lead.website || "",
      website_confidence: lead.confidence_indicators,
      verification_evidence: lead.website_evidence,
      verification_reason: lead.verification_reason,
      why_asenra: lead.why_asenra,
      why_this_lead: lead.why_this_lead,
      key_signals: lead.key_signals,
      scores: {
        total_score: lead.total_score,
        priority: lead.priority,
        website_status: lead.website_status,
        website_opportunity_type: lead.website_opportunity_type,
        maturity_score: lead.maturity_score,
        commercial_value_score: lead.commercial_value_score,
        visual_richness_score: lead.visual_richness_score,
        digital_gap_score: lead.digital_gap_score,
        contactability_score: lead.contactability_score,
        growth_intent_score: lead.growth_intent_score
      }
    };

    const dbPayload = {
      slug: lead.slug,
      name: lead.name,
      industry: lead.industry,
      phone: lead.phone,
      email: lead.email,
      address: lead.address,
      city: lead.city,
      state: lead.state,
      maps_link: lead.maps_link,
      rating: lead.rating,
      review_count: lead.review_count,
      social_links: lead.social_links,
      category: lead.category,
      tagline: `[Score: ${lead.total_score}/100 | ${lead.website_status} | ${lead.priority} Priority] ${lead.tagline || ''}`.trim(),
      description: JSON.stringify(intelligenceMeta),
      services: lead.services,
      status: lead.status || "QUALIFIED"
    };

    // Save/Upsert to Supabase
    const { error } = await supabase
      .from("leads")
      .upsert(dbPayload, { onConflict: "slug" });

    if (error) {
      console.error(`Error saving ${lead.name}:`, error.message);
    } else {
      upsertCount++;
    }
  }

  console.log(`\nPipeline execution complete. ${upsertCount} high-intent opportunity records saved to Supabase.`);
  console.log("NOTE: Automatic demo website generation was NOT executed. Demo creation is now human-initiated in the Admin UI.");
}

runProspectingPipeline();
