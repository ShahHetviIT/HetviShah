import { ArrowUpRight, BrainCircuit, Code2, Workflow } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/shared";

const highlights = [
  {
    icon: BrainCircuit,
    title: "AI Engineering",
    text: "Intelligence with intent",
  },
  {
    icon: Workflow,
    title: "Agentic Workflows",
    text: "Agents that work together",
  },
  {
    icon: Code2,
    title: "Backend Systems",
    text: "Reliable from the ground up",
  },
];
export function About() {
  return (
    <section
      id="about"
      className="about-section section-pad section-container"
      tabIndex={-1}
      aria-label="About Hetvi"
    >
      <div className="about-layout">
        <Reveal>
          <SectionHeading
            label="01 / ABOUT"
            title="Engineering at the intersection of AI and software."
          />
          <div className="about-note mono">
            <span className="tiny-cross">+</span> SOFTWARE FOUNDATIONS. AI-FIRST
            THINKING.
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="about-copy">
            {portfolio.bio.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <a href="#experience" className="text-link">
            A little more about my journey
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
      <div className="about-highlights">
        {highlights.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.06}>
            <div className="about-highlight">
              <div className="highlight-icon">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span className="mono">0{index + 1}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
