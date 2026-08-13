/**
 * Multi-Factor Qualification & Intelligence Scoring Engine
 * Evaluates candidates across 6 transparent dimensions (Total 100 Points):
 * 1. Business Maturity (0-20)
 * 2. Commercial Value (0-20)
 * 3. Visual / Brand Richness (0-15)
 * 4. Digital Gap (0-25) [Primary Signal]
 * 5. Contactability (0-10)
 * 6. Growth / Intent Signals (0-10)
 */

const HIGH_TICKET_INDUSTRIES = [
  "audio", "sound", "av", "event production", "architect", "interior",
  "furniture", "manufactur", "industrial", "automotive", "real estate",
  "developer", "hospitality", "hotel", "b2b", "supplier", "technology",
  "engineering", "commercial", "luxury", "boutique", "fashion"
];

const LOW_TICKET_COMMODITIES = [
  "tea stall", "hair cutting", "laundry", "pan shop", "fast food",
  "bakery", "kirana", "local grocery"
];

/**
 * Calculates complete lead intelligence metrics and multi-factor scores
 * @param {object} item Raw lead candidate object
 * @param {object} websiteAudit Output from inspectWebsite()
 */
function evaluateLeadIntelligence(item, websiteAudit) {
  const name = item.name || item.title || "Business Candidate";
  const industry = (item.industry || item.categoryName || "").toLowerCase();
  const category = (item.category || "").toLowerCase();
  const reviewCount = item.review_count || item.reviewsCount || 0;
  const rating = item.rating || item.totalScore || 0;
  const address = item.address || "";
  const phone = item.phone || "";
  const email = item.email || "";
  const social = item.social_links || item.instagram || item.facebook || "";
  const description = item.description || "";
  const services = item.services || "";

  // 1. Business Maturity Score (0-20)
  let maturityScore = 8;
  const maturitySignals = [];

  if (address && address.length > 5) {
    maturityScore += 3;
    maturitySignals.push("Established physical location");
  }

  // Balanced review score (not blindly rewarding giant review counts)
  if (reviewCount > 10 && reviewCount <= 500) {
    maturityScore += 5;
    maturitySignals.push(`Established customer feedback base (${reviewCount} reviews)`);
  } else if (reviewCount > 500) {
    maturityScore += 4;
    maturitySignals.push(`Large customer footprint (${reviewCount}+ reviews)`);
  } else if (reviewCount > 0) {
    maturityScore += 2;
    maturitySignals.push("Initial review signals present");
  }

  if (rating >= 4.0) {
    maturityScore += 2;
    maturitySignals.push(`High customer satisfaction rating (${rating}★)`);
  }

  if (services && services.length > 15) {
    maturityScore += 2;
    maturitySignals.push("Structured multi-service offerings");
  }

  maturityScore = Math.min(20, maturityScore);

  // 2. Commercial Value Score (0-20)
  let commercialScore = 8;
  const commercialSignals = [];

  const isHighTicket = HIGH_TICKET_INDUSTRIES.some(ind => industry.includes(ind) || category.includes(ind));
  const isCommodity = LOW_TICKET_COMMODITIES.some(ind => industry.includes(ind) || category.includes(ind));

  if (isHighTicket) {
    commercialScore += 10;
    commercialSignals.push("Operates in high-ticket / B2B / project-based commercial category");
  } else if (!isCommodity) {
    commercialScore += 5;
    commercialSignals.push("Operates in standard commercial service market");
  } else {
    commercialScore -= 3;
    commercialSignals.push("Operates in low-ticket commodity retail sector");
  }

  if (description.includes("b2b") || description.includes("manufactur") || description.includes("contract") || description.includes("custom")) {
    commercialScore += 2;
    commercialSignals.push("High margin custom contract or manufacturing focus");
  }

  commercialScore = Math.min(20, Math.max(2, commercialScore));

  // 3. Visual / Brand Richness Score (0-15)
  let visualScore = 6;
  const visualSignals = [];

  if (social.includes("instagram") || social.includes("facebook") || social.includes("pinterest")) {
    visualScore += 4;
    visualSignals.push("Active social media portfolio presence");
  }

  if (
    industry.includes("architect") || industry.includes("interior") ||
    industry.includes("design") || industry.includes("furniture") ||
    industry.includes("audio") || industry.includes("sound") ||
    industry.includes("luxury") || industry.includes("fashion") ||
    industry.includes("boutique") || industry.includes("automotive")
  ) {
    visualScore += 5;
    visualSignals.push("High visual storytelling & product presentation potential");
  } else {
    visualScore += 2;
  }

  visualScore = Math.min(15, visualScore);

  // 4. Digital Gap Score (0-25) [From website Inspector]
  const digitalGapScore = websiteAudit.digitalGapScore || 18;
  const websiteStatus = websiteAudit.status || "NO_WEBSITE";
  const websiteOpportunityType = websiteAudit.opportunityType || "NEW WEBSITE";

  // 5. Contactability Score (0-10)
  let contactabilityScore = 2;
  const contactSignals = [];

  if (phone && phone.replace(/\D/g, "").length >= 8) {
    contactabilityScore += 4;
    contactSignals.push("Direct telephone / WhatsApp contact path");
  }
  if (email && email.includes("@")) {
    contactabilityScore += 3;
    contactSignals.push("Direct email address available");
  }
  if (social) {
    contactabilityScore += 1;
    contactSignals.push("Social channel messaging path");
  }

  contactabilityScore = Math.min(10, contactabilityScore);

  // 6. Growth / Intent Signals Score (0-10)
  let growthScore = 5;
  const growthSignals = [];

  if (reviewCount > 15 || rating >= 4.5) {
    growthScore += 3;
    growthSignals.push("Active ongoing client engagement");
  }
  if (social) {
    growthScore += 2;
    growthSignals.push("Active brand building investments");
  }

  growthScore = Math.min(10, growthScore);

  // Calculate Total Score (0 - 100)
  const totalScore = maturityScore + commercialScore + visualScore + digitalGapScore + contactabilityScore + growthScore;

  // Priority Classification
  let priority = "LOW";
  if (totalScore >= 80) priority = "HIGH";
  else if (totalScore >= 65) priority = "MEDIUM";

  // Generate Confidence Levels
  const confidenceIndicators = {
    maturity: reviewCount > 5 ? "HIGH" : "MEDIUM",
    commercialValue: isHighTicket ? "HIGH" : "MEDIUM",
    visualRichness: social ? "HIGH" : "MEDIUM",
    digitalGap: websiteAudit.isCustomDomain ? "HIGH" : "HIGH",
    growthIntent: reviewCount > 10 ? "HIGH" : "LOW"
  };

  // Build "WHY THIS LEAD" Context
  const whyThisLead = `Established ${item.industry || 'business'} with strong visual & commercial potential (${totalScore}/100 score), but has ${websiteStatus.toLowerCase().replace(/_/g, ' ')}.`;

  // Build "WHY ASENRA?" Concise Sales Insight
  const whyAsenra = generateWhyAsenraInsight(name, item.industry, websiteStatus, websiteOpportunityType);

  // Combine Key Signals
  const keySignals = [
    ...maturitySignals.slice(0, 2),
    ...commercialSignals.slice(0, 2),
    ...visualSignals.slice(0, 1),
    ...websiteAudit.signals.slice(0, 2)
  ].filter(Boolean);

  return {
    total_score: totalScore,
    priority,
    website_status: websiteStatus,
    website_opportunity_type: websiteOpportunityType,

    maturity_score: maturityScore,
    commercial_value_score: commercialScore,
    visual_richness_score: visualScore,
    digital_gap_score: digitalGapScore,
    contactability_score: contactabilityScore,
    growth_intent_score: growthScore,

    confidence_indicators: confidenceIndicators,
    why_this_lead: whyThisLead,
    why_asenra: whyAsenra,
    key_signals: keySignals,
    disqualified: websiteAudit.disqualified || (totalScore < 50)
  };
}

/**
 * Generates tailored sales rationale for human operator pitching Asenra
 */
function generateWhyAsenraInsight(name, industry, websiteStatus, opportunityType) {
  const ind = (industry || "brand").toLowerCase();

  if (websiteStatus === "NO_WEBSITE") {
    return `${name} has built real commercial credibility and brand presence, but lacks a dedicated website. A custom ${opportunityType.toLowerCase()} by Asenra will unify their visual identity, showcase their capabilities, and capture high-intent client inquiries.`;
  }

  if (websiteStatus === "WEAK_WEBSITE" || websiteStatus === "OUTDATED_WEBSITE") {
    return `Their current website does not match the actual quality and reputation of ${name}. Asenra can deliver a modern, high-performance website redesign that elevates their positioning and drives higher customer conversion.`;
  }

  return `A targeted ${opportunityType.toLowerCase()} will modernize ${name}'s digital touchpoints and position them ahead of competitors in the ${ind} space.`;
}

module.exports = {
  evaluateLeadIntelligence,
  generateWhyAsenraInsight
};
