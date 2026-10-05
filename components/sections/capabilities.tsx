import {
  ArrowUpRight,
  AudioLines,
  Database,
  Bot,
  Braces,
  Code2,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";
import { capabilities } from "@/data/portfolio";
import { Glow, Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

const icons = [
  Bot,
  Sparkles,
  Network,
  Braces,
  Workflow,
  Code2,
  AudioLines,
  Database,
];
export function Capabilities() {
  return (
    <section
      className="capabilities-section section-pad"
      aria-label="AI engineering capabilities"
    >
      <div className="section-container">
        <Reveal>
          <div className="section-title-row">
            <SectionHeading
              label="03 / CAPABILITIES"
              title="From prompts to production pipelines."
              light
            />
            <p className="section-aside">
              The model is one piece.
              <br />I build the system around it.
            </p>
          </div>
        </Reveal>
        <div className="capabilities-grid">
          {capabilities.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <Glow className="capability">
                  <div className="capability-top">
                    <Icon size={25} strokeWidth={1.4} />
                    <span className="mono">0{i + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="capability-bottom">
                    <span>{item.technologies.join(" / ")}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </Glow>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
