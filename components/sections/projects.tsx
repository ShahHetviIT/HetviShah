"use client";

import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

const filters = [
  {
    id: "all",
    label: "All work",
    count: String(projects.length).padStart(2, "0"),
  },
  {
    id: "ai",
    label: "AI systems",
    count: String(
      projects.filter((project) => project.kind === "ai").length,
    ).padStart(2, "0"),
  },
  {
    id: "software",
    label: "Software",
    count: String(
      projects.filter((project) => project.kind === "software").length,
    ).padStart(2, "0"),
  },
] as const;
export function Projects() {
  const [filter, setFilter] = useState<"all" | "ai" | "software">("all");
  const visible = projects.filter(
    (project) => filter === "all" || project.kind === filter,
  );
  return (
    <section
      id="projects"
      className="projects-section section-pad"
      tabIndex={-1}
      aria-label="Selected work"
    >
      <div className="section-container">
        <Reveal>
          <div className="section-title-row">
            <SectionHeading
              label="02 / SELECTED WORK"
              title="AI systems I’ve helped bring to life."
            />
            <ArrowDownRight
              className="section-arrow"
              size={54}
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
          <div className="projects-toolbar">
            <p>Applied intelligence. Real-world engineering.</p>
            <div className="project-filters" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="project-grid" aria-live="polite">
          {visible.map((project) => (
            <Reveal
              key={project.id}
              className={`project-wrap ${project.id === "01" ? "project-wide" : ""}`}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
