import type { NextConfig } from "next";

/**
 * Routes retired in the information-architecture cut.
 *
 * `/services`, `/vision` and `/hiring` were one-line re-exports of pages that
 * still exist — the same content on two URLs. `/insights` listed four
 * articles that had no article pages behind them. `/audit` and
 * `/architecture` are merged into `/contact` and `/process` respectively.
 *
 * All six are in the sitemap and may be indexed, so they redirect rather than
 * 404. `permanent: true` emits a 308, which carries the same ranking signal
 * as a 301 while preserving the request method.
 *
 * `/hiring` matches exactly and does not capture `/hiring/verify`, which is a
 * live route linked from /careers.
 */
const retiredRoutes: { source: string; destination: string }[] = [
  { source: "/services", destination: "/solutions" },
  { source: "/vision", destination: "/company" },
  { source: "/hiring", destination: "/careers" },
  { source: "/insights", destination: "/" },
  { source: "/audit", destination: "/contact" },
  { source: "/architecture", destination: "/process" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return retiredRoutes.map((route) => ({ ...route, permanent: true }));
  },
};

export default nextConfig;
