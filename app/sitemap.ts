import type { MetadataRoute } from "next";
import { siteConfig } from "../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/support", "/contract", "/company", "/privacy", "/terms"];
  return paths.map((path, index) => ({
    url: `${siteConfig.siteUrl}${path}`,
    changeFrequency: index < 3 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : index < 3 ? 0.8 : 0.4,
  }));
}
