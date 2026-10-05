import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/data/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? [
        { url: siteUrl, changeFrequency: "monthly", priority: 1 },
        ...projects.map((project) => ({
          url: `${siteUrl}/projects/${project.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ]
    : [];
}
