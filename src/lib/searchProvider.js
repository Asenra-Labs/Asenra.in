const fs = require("fs");
const path = require("path");

class SearchProvider {
  /**
   * Search for a given query.
   * @param {string} query
   * @returns {Promise<Array<{title: string, link: string, snippet: string}>>}
   */
  async search(query) {
    throw new Error("Not implemented");
  }
}

class ApifySearchProvider extends SearchProvider {
  constructor(token) {
    super();
    this.token = token;
  }

  async search(query) {
    if (!this.token) {
      console.warn("ApifySearchProvider: Missing token. Returning empty results.");
      return [];
    }

    try {
      console.log(`[SearchProvider] Executing real search for: "${query}"`);
      // Start the run
      const response = await fetch(
        `https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=${this.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            queries: query,
            maxPagesPerQuery: 1,
            resultsPerPage: 5,
          })
        }
      );

      const runData = await response.json();
      if (!runData || !runData.data) {
        throw new Error("Apify run initiation failed.");
      }

      const runId = runData.data.id;
      const datasetId = runData.data.defaultDatasetId;

      // Poll for completion (up to 2 minutes)
      for (let i = 0; i < 24; i++) {
        await new Promise(r => setTimeout(r, 5000));
        const runRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${this.token}`);
        const runInfo = await runRes.json();
        const status = runInfo.data?.status;
        if (status && status !== "RUNNING" && status !== "READY") {
          break;
        }
      }

      // Fetch results
      const statusRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${this.token}`);
      const results = await statusRes.json();

      if (!Array.isArray(results) || results.length === 0) return [];
      
      const firstItem = results[0];
      if (!firstItem || !firstItem.organicResults) return [];

      return firstItem.organicResults.map(item => ({
        title: item.title || "",
        link: item.url || "",
        snippet: item.description || ""
      }));
    } catch (err) {
      console.error("[SearchProvider] Apify search failed:", err.message);
      return [];
    }
  }
}

class CachedSearchProvider extends SearchProvider {
  constructor(provider, cachePath) {
    super();
    this.provider = provider;
    this.cachePath = cachePath || path.join(__dirname, "../../scripts/.search_cache.json");
    this.cache = this._loadCache();
  }

  _loadCache() {
    try {
      if (fs.existsSync(this.cachePath)) {
        return JSON.parse(fs.readFileSync(this.cachePath, "utf8"));
      }
    } catch (err) {
      console.warn("Failed to load search cache, starting fresh.");
    }
    return {};
  }

  _saveCache() {
    try {
      const dir = path.dirname(this.cachePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.cachePath, JSON.stringify(this.cache, null, 2));
    } catch (err) {
      console.warn("Failed to save search cache.");
    }
  }

  async search(query) {
    const key = query.toLowerCase().trim();
    if (this.cache[key]) {
      console.log(`[SearchProvider] Cache hit for: "${query}"`);
      return this.cache[key];
    }

    const results = await this.provider.search(query);
    this.cache[key] = results;
    this._saveCache();
    return results;
  }
}

module.exports = {
  SearchProvider,
  ApifySearchProvider,
  CachedSearchProvider
};
