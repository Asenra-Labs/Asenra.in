const { verifyBusinessWebsite } = require("../src/lib/websiteVerification");

// Mock Search Provider for testing
class MockSearchProvider {
  constructor(mockResponses) {
    this.mockResponses = mockResponses;
  }
  async search(query) {
    return this.mockResponses[query] || [];
  }
}

async function runTests() {
  console.log("Running Website Verification Edge Case Tests...");
  let passed = 0;
  let failed = 0;

  const assertEqual = (expected, actual, testName) => {
    if (expected === actual) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - Expected '${expected}' but got '${actual}'`);
      failed++;
    }
  };

  // Setup Mock Responses
  const mockResponses = {
    "TestBusiness Pune": [],
    "TestBusiness +91 99999 00000": [],
    "WeakSite Inc Mumbai": [{ title: "WeakSite Inc", link: "http://example.com/missing", snippet: "WeakSite Inc in Mumbai" }],
    "OutdatedSite Corp Delhi": [{ title: "OutdatedSite Corp", link: "http://outdated-wordpress.com", snippet: "OutdatedSite Corp" }],
    "ModernSite LLC Bangalore": [{ title: "ModernSite LLC", link: "https://modern-nextjs.com", snippet: "ModernSite LLC in Bangalore" }],
    "StrongSite Pvt Ltd Chennai": [{ title: "StrongSite Pvt Ltd", link: "https://strong-framer.com", snippet: "StrongSite Pvt Ltd" }],
    "MissedSite Co Hyderabad": [{ title: "MissedSite Co", link: "https://missed-but-exists.com", snippet: "MissedSite Co Hyderabad" }],
    "SimilarName Inc Pune": [{ title: "SimilarName Group UK", link: "https://similarname.co.uk", snippet: "SimilarName Group in London" }],
    "InstaBusiness instagram": [{ title: "InstaBusiness on Instagram", link: "https://instagram.com/instabiz", snippet: "Link in bio: https://instabiz.com" }],
    "InstaBusiness Mumbai": [{ title: "InstaBusiness", link: "https://instabiz.com", snippet: "InstaBusiness in Mumbai" }],
    "PhoneBiz +91 88888 88888": [{ title: "PhoneBiz", link: "https://phonebiz.in", snippet: "Call us at +91 88888 88888. PhoneBiz." }],
    "Hyderabad Events +91 99668 28280": [{ title: "Hyderabad Events", link: "https://hyderabadevents.com", snippet: "Hyderabad Events" }]
  };
  const searchProvider = new MockSearchProvider(mockResponses);

  // We mock `inspectWebsite` inside `websiteInspector.js` globally for these tests?
  // Actually, since we are doing integration-level testing, we could just rely on network, but some URLs don't exist.
  // Instead of testing actual HTTP fetches, we can mock `websiteInspector.inspectWebsite`.
  
  // Mock global.fetch for websiteInspector
  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (url === "http://example.com/missing") throw new Error("Network error");
    
    let html = "";
    if (url === "http://outdated-wordpress.com") html = "<meta name='viewport'>wp-content/themes twentyfifteen <table cellspacing>";
    if (url === "https://modern-nextjs.com") html = "<meta name='viewport'>__next react-dom <form>";
    if (url === "https://strong-framer.com") html = "<meta name='viewport'>__next framer <form>";
    if (url === "https://missed-but-exists.com") html = "<meta name='viewport'> <form>";
    if (url === "https://instabiz.com") html = ""; // WEAK
    if (url === "https://phonebiz.in") html = "<meta name='viewport'>react-dom"; // MODERN (react but no __next)
    if (url === "https://hyderabadevents.com") html = "wp-content/themes <table cellspacing>"; // OUTDATED
    
    return {
      ok: true,
      text: async () => html
    };
  };

  try {
    // CASE 1: Business has no website -> NO_WEBSITE
    const res1 = await verifyBusinessWebsite({ name: "TestBusiness", city: "Pune", phone: "+91 99999 00000" }, searchProvider);
    assertEqual("NO_WEBSITE", res1.websiteStatus, "CASE 1: Business has no website");

    // CASE 2: Business has a weak website
    const res2 = await verifyBusinessWebsite({ name: "WeakSite Inc", city: "Mumbai" }, searchProvider);
    assertEqual("WEAK_WEBSITE", res2.websiteStatus, "CASE 2: Business has a weak website");

    // CASE 3: Business has an outdated website
    const res3 = await verifyBusinessWebsite({ name: "OutdatedSite Corp", city: "Delhi" }, searchProvider);
    assertEqual("OUTDATED_WEBSITE", res3.websiteStatus, "CASE 3: Business has an outdated website");

    // CASE 4: Business has a modern website (with __next it becomes STRONG)
    const res4 = await verifyBusinessWebsite({ name: "ModernSite LLC", city: "Bangalore" }, searchProvider);
    assertEqual("STRONG_WEBSITE", res4.websiteStatus, "CASE 4: Business has a modern website");

    // CASE 5: Business has a strong website
    const res5 = await verifyBusinessWebsite({ name: "StrongSite Pvt Ltd", city: "Chennai" }, searchProvider);
    assertEqual("STRONG_WEBSITE", res5.websiteStatus, "CASE 5: Business has a strong website");

    // CASE 6: Business has a website that search initially misses, but is discovered
    const res6 = await verifyBusinessWebsite({ name: "MissedSite Co", city: "Hyderabad" }, searchProvider);
    assertEqual("BASIC_WEBSITE", res6.websiteStatus, "CASE 6: Discovered missed website");

    // CASE 7: Business has a website discovered through Instagram
    const res7 = await verifyBusinessWebsite({ name: "InstaBusiness", city: "Mumbai", social_links: "instagram.com/instabiz" }, searchProvider);
    assertEqual("OUTDATED_WEBSITE", res7.websiteStatus, "CASE 7: Discovered via Instagram");

    // CASE 8: Business has a website discovered through phone-number search
    const res8 = await verifyBusinessWebsite({ name: "PhoneBiz", phone: "+91 88888 88888" }, searchProvider);
    assertEqual("MODERN_WEBSITE", res8.websiteStatus, "CASE 8: Discovered via phone number");

    // CASE 9: Different business has similar name -> Must NOT be incorrectly associated (returns NO_WEBSITE)
    const res9 = await verifyBusinessWebsite({ name: "SimilarName Inc", city: "Pune" }, searchProvider);
    assertEqual("NO_WEBSITE", res9.websiteStatus, "CASE 9: False positive avoidance");

    // CASE 10: Website temporarily returns an error -> must NOT immediately become NO_WEBSITE
    const res10 = await verifyBusinessWebsite({ name: "TempError", website: "http://example.com/missing" }, searchProvider);
    assertEqual("WEAK_WEBSITE", res10.websiteStatus, "CASE 10: Temporary error is WEAK_WEBSITE");

    // CASE 11: Hyderabad Events with hyderabadevents.com -> existing website
    const res11 = await verifyBusinessWebsite({ name: "Hyderabad Events", phone: "+91 99668 28280" }, searchProvider);
    assertEqual("OUTDATED_WEBSITE", res11.websiteStatus, "CASE 11: Exact domain/business combination");

    // Check confidence gate
    assertEqual(true, res1.confidence >= 85, "Confidence gate threshold passed for NO_WEBSITE");

  } finally {
    // Restore
    global.fetch = originalFetch;
  }

  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
}

runTests();
