"use client";

import { useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";
import { technologies } from "@/data/portfolio";

export function TechMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`tech-marquee ${paused ? "is-paused" : ""}`}
      aria-label="Technologies I work with"
    >
      <div className="marquee-label mono">MY BUILDING BLOCKS</div>
      <div
        className="marquee-window"
        tabIndex={0}
        role="region"
        aria-label="Technology list"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              className="marquee-set"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {technologies.map((tech) => (
                <span key={tech}>
                  <Sparkles size={12} aria-hidden="true" />
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="marquee-toggle"
        aria-label={
          paused ? "Play technology marquee" : "Pause technology marquee"
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}
