import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { portfolio, projects } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import { ProjectArchitecture } from "@/components/project-architecture";
import { StrategyPipeline } from "@/components/strategy-pipeline";
import { Footer } from "@/components/footer";
import { Reveal, ScrollProgress } from "@/components/ui/motion";
import "./project-overview.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const title = `${project.name} | ${portfolio.name}`;
  const url = siteUrl ? `${siteUrl}/projects/${project.slug}` : undefined;
  return {
    title,
    description: project.description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description: project.description,
      type: "article",
      siteName: portfolio.name,
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectOverview({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <ScrollProgress />
      <header className="overview-header" id="home">
        <nav
          className="section-container overview-nav"
          aria-label="Project navigation"
        >
          <Link prefetch={false} href="/" className="overview-brand">
            {portfolio.name}
            <span>.</span>
          </Link>
          <Link prefetch={false} href="/#projects" className="overview-back">
            <ArrowLeft size={16} /> All projects
          </Link>
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="project-overview">
        <div className="section-container">
          <section className="overview-hero" aria-labelledby="project-title">
            <Reveal immediate>
              <p className="overview-eyebrow mono">
                PROJECT {project.id} / ENGINEERING OVERVIEW
              </p>
              <p className="overview-category">{project.category}</p>
              <h1 id="project-title">{project.name}</h1>
              <p className="overview-description">{project.description}</p>
              <div className="overview-role">
                <span className="mono">MY CONTRIBUTION</span>
                <p>{project.contribution}</p>
              </div>
            </Reveal>
            <Reveal immediate delay={0.12} className="overview-visual">
              <ProjectArchitecture project={project} />
              <p className="overview-caption">
                A high-level view of the system. Explore the implementation
                below.
              </p>
            </Reveal>
          </section>

          <section
            className="overview-section overview-context"
            aria-labelledby="overview-heading"
          >
            <div>
              <p className="overview-eyebrow mono">01 / THE PROJECT</p>
              <h2 id="overview-heading">What it does.</h2>
            </div>
            <div className="overview-prose">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section
            className="overview-section"
            aria-labelledby="contributions-heading"
          >
            <p className="overview-eyebrow mono">02 / INSIDE THE BUILD</p>
            <h2 id="contributions-heading">My engineering contributions.</h2>
            <ul className="overview-contributions">
              {project.highlights.map((highlight, i) => (
                <li key={highlight}>
                  <span className="overview-item-number mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{highlight}</p>
                  <Check size={16} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>

          <section
            className="overview-section"
            aria-labelledby="workflow-heading"
          >
            <p className="overview-eyebrow mono">03 / SYSTEM FLOW</p>
            <h2 id="workflow-heading">From input to outcome.</h2>
            {project.visual === "strategy" ? (
              <StrategyPipeline />
            ) : (
              <ol className="overview-workflow">
                {project.flow.map((step, i) => (
                  <li key={step}>
                    <span className="mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong>{step}</strong>
                    {i < project.flow.length - 1 && (
                      <ArrowRight size={18} aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section
            className="overview-section overview-context"
            aria-labelledby="technologies-heading"
          >
            <div>
              <p className="overview-eyebrow mono">04 / TECHNOLOGY</p>
              <h2 id="technologies-heading">Built with.</h2>
            </div>
            <ul className="overview-technologies">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>

          <nav className="overview-next" aria-label="Continue exploring">
            <Link prefetch={false} href="/#projects">
              <ArrowLeft size={16} /> Back to all projects
            </Link>
            <Link
              prefetch={false}
              href={`/projects/${next.slug}`}
              className="overview-next-project"
            >
              <span className="mono">NEXT PROJECT</span>
              <strong>
                {next.name} <ArrowRight size={20} aria-hidden="true" />
              </strong>
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
