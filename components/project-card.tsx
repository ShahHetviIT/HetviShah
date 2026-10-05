import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { Glow } from "@/components/ui/motion";
import { ProjectArchitecture } from "@/components/project-architecture";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-${project.visual}`}>
      <Glow className="project-card-inner">
        <ProjectArchitecture project={project} />
        <div className="project-content">
          <div className="project-meta">
            <span className="project-number mono">/{project.id}</span>
            <span>{project.category}</span>
            {project.id === "01" && (
              <span className="featured-label">FEATURED</span>
            )}
          </div>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="contribution">
            <span className="mono">MY CONTRIBUTION</span>
            <p>{project.contribution}</p>
          </div>
          <div className="tech-tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-actions">
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-overview-link"
              aria-label={`View overview: ${project.name} (opens in a new tab)`}
            >
              View project overview
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <span className="project-card-arrow" aria-hidden="true">
              <ArrowUpRight size={21} />
            </span>
          </div>
          <details className="project-details">
            <summary>
              Inside the build
              <Plus size={16} aria-hidden="true" />
            </summary>
            <div className="project-detail-content">
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="detail-flow" aria-label="Architecture flow">
                {project.flow.map((step, i) => (
                  <span key={step}>
                    {i > 0 && <ArrowRight size={12} aria-hidden="true" />}
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </details>
        </div>
      </Glow>
    </article>
  );
}
