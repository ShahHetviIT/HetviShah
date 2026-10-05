"use client";

import {
  BrainCircuit,
  Pause,
  Play,
  Check,
  FileText,
  Layers3,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FlowLines } from "@/components/ui/flow-lines";
import { Glow } from "@/components/ui/motion";

export function AgentGraph() {
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [8, -12]);
  return (
    <motion.div ref={ref} style={{ y }} className="agent-parallax">
      <Glow className={`agent-visual ${paused ? "graph-is-paused" : ""}`}>
        <div className="graph-topline">
          <span>
            <span className="status-dot" /> SYSTEM ARCHITECTURE
          </span>
          <button
            className="graph-play"
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play flow animation" : "Pause flow animation"}
            aria-pressed={paused}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            <span>{paused ? "PLAY FLOW" : "PAUSE FLOW"}</span>
          </button>
        </div>
        <div className="agent-canvas" aria-hidden="true">
          <div className="graph-orbit orbit-one" />
          <div className="graph-orbit-satellite">
            <i />
          </div>
          <div className="graph-orbit orbit-two" />
          <FlowLines
            className="graph-connections signal-lines"
            viewBox="0 0 480 460"
            paths={[
              "M240 61V99",
              "M240 166V190Q240 201 228 201H90Q78 201 78 214V233",
              "M240 166V233",
              "M240 166V190Q240 201 252 201H390Q402 201 402 214V233",
              "M78 306V317Q78 328 90 328H224Q236 328 236 341V355",
              "M240 306V355",
              "M402 306V317Q402 328 390 328H256Q244 328 244 341V355",
              "M240 405V429",
            ]}
          />
          <div className="graph-node input-node">
            <span className="node-dot" /> User input{" "}
            <span className="node-shortcut">↵</span>
          </div>
          <div className="graph-node orchestrator-node">
            <span className="orchestrator-halo" />
            <span className="node-icon">
              <Workflow size={23} />
            </span>
            <div>
              <small>LANGGRAPH</small>
              <strong>Orchestrator</strong>
            </div>
            <span className="node-live" />
          </div>
          <div className="graph-node agent-node research-node">
            <Search size={18} />
            <strong>Research</strong>
            <small>CONTEXT & TOOLS</small>
          </div>
          <div className="graph-node agent-node strategy-node">
            <BrainCircuit size={18} />
            <strong>Strategy</strong>
            <small>REASON & PLAN</small>
          </div>
          <div className="graph-node agent-node analysis-node">
            <Layers3 size={18} />
            <strong>Analysis</strong>
            <small>VALIDATE & REFINE</small>
          </div>
          <div className="graph-node synthesis-node">
            <Sparkles size={17} />
            <span>Synthesis</span>
            <span className="micro-pill">LLM</span>
          </div>
          <div className="graph-output">
            <FileText size={13} /> Structured output <Check size={12} />
          </div>
          <span className="graph-annotation annotation-left">
            context + memory
          </span>
          <span className="graph-annotation annotation-right">
            stateful execution
          </span>
        </div>
        <div className="graph-bottomline">
          <span>
            <span className="status-dot" /> BUILT TO WORK TOGETHER
          </span>
          <span>AGENT_ORCHESTRATION</span>
        </div>
      </Glow>
    </motion.div>
  );
}
