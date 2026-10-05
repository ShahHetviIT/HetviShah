"use client";

import { useId } from "react";

export function FlowLines({
  paths,
  viewBox = "0 0 480 280",
  className = "flow-lines",
}: {
  paths: string[];
  viewBox?: string;
  className?: string;
}) {
  const markerId = `arrow-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M1 1L7 4L1 7" className="flow-arrowhead" />
        </marker>
      </defs>
      {paths.map((path, index) => (
        <g key={path}>
          <path
            d={path}
            className="flow-track"
            markerEnd={`url(#${markerId})`}
          />
          <path
            d={path}
            className="flow-signal"
            pathLength={100}
            style={{ animationDelay: `${index * -0.65}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

export function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <FlowLines
      className={`flow-arrow ${vertical ? "flow-arrow-vertical" : ""}`}
      viewBox={vertical ? "0 0 20 32" : "0 0 60 20"}
      paths={[vertical ? "M10 1V27" : "M2 10H54"]}
    />
  );
}
