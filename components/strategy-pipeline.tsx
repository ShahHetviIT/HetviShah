"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { strategyPipeline, type PipelineNode } from "@/data/strategy-pipeline";
import { FlowArrow, FlowLines } from "@/components/ui/flow-lines";

function Node({ node }: { node: PipelineNode }) {
  return (
    <div className={`pipeline-node pipeline-${node.tone}`}>
      <strong>{node.title}</strong>
      {node.detail && <span>{node.detail}</span>}
    </div>
  );
}

export function StrategyPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const [paused, setPaused] = useState(false);
  return (
    <div
      ref={ref}
      className={`strategy-pipeline diagram-motion ${visible && !paused ? "is-running" : ""}`}
    >
      <div className="pipeline-toolbar">
        <p>End-to-end workflow</p>
        <button
          type="button"
          className="diagram-toggle"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={`${paused ? "Play" : "Pause"} Strategy Navigator pipeline animation`}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
          {paused ? "Play" : "Pause"} flow
        </button>
      </div>
      <p className="pipeline-intro">
        Rapid insights and the form-to-foresight branch run in parallel. Later,
        the user chooses an existing or custom report archetype.
      </p>
      <ol
        className="pipeline-stages"
        aria-label="Strategy Navigator end-to-end workflow"
      >
        {strategyPipeline.map((stage, index) => (
          <li
            key={index}
            className={`pipeline-stage pipeline-stage-${stage.kind}`}
          >
            {stage.kind === "step" ? (
              <Node node={stage.node} />
            ) : (
              <>
                <p className="pipeline-branch-label">{stage.label}</p>
                <FlowLines
                  className="pipeline-fork"
                  viewBox="0 0 480 48"
                  paths={[
                    "M240 0V12Q240 20 232 20H128Q120 20 120 28V44",
                    "M240 0V12Q240 20 248 20H352Q360 20 360 28V44",
                  ]}
                />
                <div className="pipeline-branches">
                  {stage.branches.map((branch, branchIndex) => (
                    <div className="pipeline-branch" key={branchIndex}>
                      {branch.map((node, nodeIndex) => (
                        <div className="pipeline-branch-step" key={node.title}>
                          {nodeIndex > 0 && <FlowArrow vertical />}
                          <Node node={node} />
                        </div>
                      ))}
                      <div className="pipeline-tail">
                        <FlowLines viewBox="0 0 20 100" paths={["M10 0V100"]} />
                      </div>
                    </div>
                  ))}
                </div>
                <FlowLines
                  className="pipeline-join"
                  viewBox="0 0 480 48"
                  paths={[
                    "M120 0V12Q120 20 128 20H232Q240 20 240 28V44",
                    "M360 0V12Q360 20 352 20H248Q240 20 240 28V44",
                  ]}
                />
              </>
            )}
            {index < strategyPipeline.length - 1 && stage.kind === "step" && (
              <FlowArrow vertical />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
