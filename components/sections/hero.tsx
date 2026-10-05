import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { AgentGraph } from "@/components/agent-graph";
import { Reveal } from "@/components/ui/motion";
import { ResumeLink, SocialLinks } from "@/components/ui/shared";

export function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section
      id="home"
      className="hero section-container"
      tabIndex={-1}
      aria-labelledby="hero-title"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orb orb-violet" />
        <span className="hero-orb orb-cyan" />
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <Reveal immediate>
            <div className="availability">
              <span className="status-dot" />
              {portfolio.availability}
            </div>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <div className="hero-kicker mono">
              AI ENGINEER <span>×</span> PRODUCT THINKER
            </div>
            <h1 id="hero-title">
              <span className="hero-line">Building intelligent</span>
              <span className="hero-line">systems that turn</span>
              <span className="hero-line gradient-text">
                AI into real products.
              </span>
            </h1>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <p className="hero-description">{portfolio.intro}</p>
            <p className="hero-approach">{portfolio.approach}</p>
          </Reveal>
          <Reveal immediate delay={0.24}>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                View my work
                <ArrowDownRight size={18} />
              </a>
              <ResumeLink available={resumeAvailable} />
            </div>
            <div className="hero-socials">
              <SocialLinks />
              <span className="location">
                <MapPin size={13} aria-hidden="true" />
                {portfolio.location}
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal immediate className="hero-visual-wrap" delay={0.22}>
          <div className="visual-caption">
            <span className="mono">IDEAS IN. INTELLIGENCE OUT.</span>
            <ArrowUpRight size={17} />
          </div>
          <AgentGraph />
          <div className="visual-footnote">
            <span>Complex workflows. Thoughtful engineering.</span>
            <span className="mono">[ AI_SYSTEMS ]</span>
          </div>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <a href="#about" className="scroll-hint">
          <span className="scroll-icon">
            <ArrowDown size={13} />
          </span>
          Scroll to explore
        </a>
        <span className="mono hero-bottom-note">
          HUMAN INTENT <span>→</span> INTELLIGENT EXECUTION
        </span>
      </div>
    </section>
  );
}
