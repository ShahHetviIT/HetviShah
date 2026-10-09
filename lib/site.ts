export const siteTitle = "Hetvi Shah | AI Engineer & Software Engineer";
export const siteDescription =
  "AI Engineer specializing in agentic AI, LangGraph, LLM applications, AI workflow automation, Python/FastAPI, and backend engineering.";
function configuredOrigin(): string | undefined {
  // Preview deployments should not compete with the production site's URLs.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production")
    return undefined;
  const value =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.NODE_ENV === "production"
      ? "https://hetvi-shah-portfolio.vercel.app"
      : undefined);
  if (!value || value.startsWith("ADD_")) return undefined;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname === "localhost" ||
      url.hostname.endsWith(".example")
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export const siteUrl = configuredOrigin();
