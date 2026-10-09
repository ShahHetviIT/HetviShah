import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const crawlers = [
  "*",
  "Googlebot",
  // Google's control token for Gemini training and grounding.
  "Google-Extended",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlers.map((userAgent) => ({
      userAgent,
      ...(siteUrl ? { allow: "/" } : { disallow: "/" }),
    })),
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
