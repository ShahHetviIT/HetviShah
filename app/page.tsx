import { existsSync } from "node:fs";
import path from "node:path";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Capabilities } from "@/components/sections/capabilities";
import { ExperienceTimeline } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AIProcess } from "@/components/sections/ai-process";
import { CurrentFocus } from "@/components/sections/current-focus";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/motion";
import { isSocialUrl, portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
export default function Home() {
  const resumeAvailable = existsSync(
    path.join(process.cwd(), "public", portfolio.resume.replace(/^\//, "")),
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    jobTitle: portfolio.headline,
    description: portfolio.intro,
    ...(siteUrl ? { url: siteUrl } : {}),
    sameAs: Object.values(portfolio.socials).filter(isSocialUrl),
    knowsAbout: [
      "Applied AI",
      "Conversational voice AI",
      "Retrieval-augmented generation",
      "Agentic workflows",
      "LangGraph",
      "LLM integration",
      "Python",
      "FastAPI",
      "Java",
      "Spring Boot",
      "React",
      "AI automation",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollProgress />
      <Navbar resumeAvailable={resumeAvailable} />
      <main id="main" tabIndex={-1}>
        <Hero resumeAvailable={resumeAvailable} />
        <TechMarquee />
        <About />
        <Projects />
        <Capabilities />
        <ExperienceTimeline />
        <Skills />
        <AIProcess />
        <CurrentFocus />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
