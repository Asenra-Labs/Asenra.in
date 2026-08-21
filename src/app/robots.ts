import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
       * The previous rule disallowed "/private/", a path that does not exist,
       * while every actual internal surface stayed crawlable. These are the
       * real ones: staff tooling, the client portal, auth, the sales demo
       * generator, and the per-lead mock sites it produces.
       */
      disallow: ["/admin", "/portal", "/auth", "/acquisition", "/demos"],
    },
    sitemap: "https://asenra.in/sitemap.xml",
  };
}
