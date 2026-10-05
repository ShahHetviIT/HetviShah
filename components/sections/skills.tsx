import { ArrowUpRight } from "lucide-react";
import { skills } from "@/data/portfolio";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

export function Skills() {
  return (
    <section
      id="skills"
      className="skills-section section-pad"
      tabIndex={-1}
      aria-label="Technical skills"
    >
      <div className="section-container">
        <Reveal>
          <div className="section-title-row">
            <SectionHeading
              label="05 / STACK"
              title="Technologies I build with."
            />
            <p className="section-aside">
              The right tool for the problem.
              <br />A connected stack for the whole product.
            </p>
          </div>
        </Reveal>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal
              key={group.name}
              className={i === 0 ? "skill-featured" : ""}
              delay={(i % 3) * 0.04}
            >
              <div className="skill-group">
                <div className="skill-group-title">
                  <h3>{group.name}</h3>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                {i === 0 && (
                  <div className="skill-note mono">
                    <span className="status-dot" /> MY CORE FOCUS
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
