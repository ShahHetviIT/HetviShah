import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/data/portfolio";
import { ProcessLine, Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

export function AIProcess() {
  return (
    <section
      className="process-section section-pad section-container"
      aria-label="Engineering process"
    >
      <Reveal>
        <div className="section-title-row">
          <SectionHeading
            label="06 / THE APPROACH"
            title="How I approach AI engineering."
          />
          <span className="process-tag mono">BUILD → TEST → ITERATE</span>
        </div>
      </Reveal>
      <div className="process-steps">
        <ProcessLine />
        {processSteps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <div className="process-step">
              <div className="process-number mono">
                0{i + 1}
                {i === 4 && <ArrowUpRight size={16} />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
