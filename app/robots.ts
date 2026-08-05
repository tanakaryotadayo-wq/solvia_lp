import type { MetadataRoute } from "next";
import { siteConfig } from "../content/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.isProductionApproved) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
