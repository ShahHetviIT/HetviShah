"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";

export function DiagramFrame({
  name,
  visual,
  label,
  footer,
  children,
}: {
  name: string;
  visual: string;
  label: string;
  footer: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const [paused, setPaused] = useState(false);
  return (
    <div
      ref={ref}
      className={`project-visual visual-${visual} diagram-motion ${visible && !paused ? "is-running" : ""}`}
    >
      <div className="diagram-header">
        <span className="mono">{label}</span>
        <button
          type="button"
          className="diagram-toggle"
          aria-label={`${paused ? "Play" : "Pause"} flow animation for ${name}`}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={11} /> : <Pause size={11} />}
          <span>{paused ? "Play" : "Pause"} flow</span>
        </button>
      </div>
      <div className="diagram-body" aria-hidden="true">
        {children}
      </div>
      <div className="diagram-footer mono" aria-hidden="true">
        <span>{footer}</span>
        <span>↗</span>
      </div>
    </div>
  );
}
