import {
  ArrowRight,
  CheckCheck,
  Database,
  Layers3,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  VoiceArchitecture,
  RagArchitecture,
} from "@/components/project-voice-rag";
import { DiagramFrame } from "@/components/diagram-frame";
import { StrategyArchitecture } from "@/components/strategy-architecture";
import { FlowArrow } from "@/components/ui/flow-lines";
import type { Project } from "@/data/portfolio";

export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <DiagramFrame
      name={project.name}
      visual={project.visual}
      label={
        {
          strategy: "MULTI-AGENT SYSTEM",
          social: "CONTENT, MEET INTELLIGENCE",
          voice: "CONVERSATIONAL INTELLIGENCE",
          rag: "KNOWLEDGE, CONNECTED",
          data: "DATA INTELLIGENCE",
        }[project.visual]
      }
      footer={
        project.kind === "ai"
          ? "INTELLIGENCE, ORCHESTRATED"
          : "ENGINEERED TO CONNECT"
      }
    >
      {project.visual === "voice" && <VoiceArchitecture />}
      {project.visual === "rag" && <RagArchitecture />}
      {project.visual === "strategy" && <StrategyArchitecture />}
      {project.visual === "social" && (
        <div className="social-diagram">
          <div className="mock-prompt">
            <span className="prompt-spark">
              <Sparkles size={17} />
            </span>
            <div>
              <small>FROM A SINGLE IDEA</small>
              <span>Make something worth sharing.</span>
            </div>
            <ArrowRight size={15} />
          </div>
          <FlowArrow vertical />
          <div className="social-cards">
            <div className="post-card post-back">
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
            <div className="post-card post-front">
              <div className="post-brand">
                <span>
                  c<span>✦</span>
                </span>
                <div>
                  <strong>One idea. More possibilities.</strong>
                  <small>AI-assisted content</small>
                </div>
                <Sparkles size={13} />
              </div>
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
              <div className="post-footer">
                <span>
                  <CheckCheck size={12} />
                  Refined & ready
                </span>
                <Send size={13} />
              </div>
            </div>
          </div>
          <div className="social-flow">
            <span>Create</span>
            <FlowArrow />
            <span>Refine</span>
            <FlowArrow />
            <span>Schedule</span>
            <FlowArrow />
            <span>Publish</span>
          </div>
        </div>
      )}
      {project.visual === "data" && (
        <div className="data-diagram">
          <div className="data-stage">
            <Database size={25} />
            <span>Sources</span>
          </div>
          <FlowArrow />
          <div className="data-stage">
            <Layers3 size={25} />
            <span>Enrichment</span>
          </div>
          <FlowArrow />
          <div className="data-stage">
            <Workflow size={25} />
            <span>Insights</span>
          </div>
        </div>
      )}
    </DiagramFrame>
  );
}
