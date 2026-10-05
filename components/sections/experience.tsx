import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="experience-section section-pad section-container"
      tabIndex={-1}
      aria-label="Professional experience"
    >
      <div className="experience-layout">
        <Reveal>
          <SectionHeading
            label="04 / EXPERIENCE"
            title="Built through doing."
          />
          <p className="experience-intro">
            Learning deeply. Building deliberately.
            <br />
            Growing with every system I ship.
          </p>
          <div className="experience-decoration" aria-hidden="true">
            <span>BUILD</span>
            <ArrowUpRight size={28} strokeWidth={1} />
            <span>LEARN</span>
            <ArrowUpRight size={28} strokeWidth={1} />
            <span>ITERATE</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="timeline">
            <span className="timeline-marker" />
            <div className="experience-date mono">
              <time dateTime={experience.startDate}>{experience.start}</time>
              <span>—</span>
              {experience.end}
              <span className="current-label">CURRENT</span>
            </div>
            <h3>{experience.role}</h3>
            <div className="company">{experience.company}</div>
            <div className="experience-location">
              <MapPin size={13} />
              {experience.location}
            </div>
            <p className="experience-description">{experience.description}</p>
            <ul>
              {experience.highlights.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <div className="progression-label mono">AN EVOLVING FOCUS</div>
            <div className="experience-progression">
              {experience.progression.map((step, i) => (
                <span key={step}>
                  {i > 0 && <ArrowRight size={12} />}
                  {step}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
