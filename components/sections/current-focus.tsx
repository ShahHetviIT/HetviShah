import { ArrowUpRight, Sparkles } from "lucide-react";
import { currentFocus } from "@/data/portfolio";
import { Glow, Reveal } from "@/components/ui/motion";

export function CurrentFocus() {
  return (
    <section className="focus-section" aria-label="Current focus">
      <Glow className="focus-inner">
        <div className="focus-grid" aria-hidden="true" />
        <div className="focus-aurora" aria-hidden="true" />
        <div className="section-container focus-content">
          <Reveal>
            <div className="focus-label">
              <span className="eyebrow">
                <span className="status-dot" />
                CURRENTLY EXPLORING
              </span>
              <Sparkles size={23} strokeWidth={1.3} />
            </div>
            <h2 className="sr-only">What I’m exploring next</h2>
            <div className="focus-keywords">
              {currentFocus.map((focus, index) => (
                <span
                  className={index === 0 ? "focus-primary" : ""}
                  key={focus}
                >
                  {focus}
                  {index === 0 && <ArrowUpRight size={37} strokeWidth={1.3} />}
                </span>
              ))}
            </div>
            <div className="focus-footer">
              <p>Always learning. Always connecting the next dot.</p>
              <span className="mono">
                THE NEXT ITERATION IS ALREADY IN MOTION.
              </span>
            </div>
          </Reveal>
        </div>
      </Glow>
    </section>
  );
}
