import {
  AudioLines,
  Bot,
  CheckCheck,
  Database,
  FileText,
  Mic,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { FlowArrow, FlowLines } from "@/components/ui/flow-lines";

export function VoiceArchitecture() {
  return (
    <div className="voice-diagram">
      <div className="voice-language mono">
        ENGLISH · HINDI · GUJARATI · MARATHI · SPANISH
      </div>
      <div className="voice-center">
        <div className="voice-wave">
          {[
            16, 28, 20, 40, 58, 30, 44, 23, 50, 34, 62, 40, 26, 48, 20, 36, 54,
            28, 42, 18, 30,
          ].map((height, i) => (
            <i key={i} style={{ height, animationDelay: `${i * 0.075}s` }} />
          ))}
        </div>
        <div className="voice-mic">
          <span />
          <span />
          <Mic size={29} strokeWidth={1.5} />
        </div>
      </div>
      <div className="voice-caption">
        <strong>A conversation. An action.</strong>
        <span>Context-aware voice orchestration</span>
      </div>
      <div className="voice-flow">
        <span>
          <Phone size={13} />
          Listen
        </span>
        <FlowArrow />
        <span>
          <Bot size={13} />
          Reason
        </span>
        <FlowArrow />
        <span>
          <Wrench size={13} />
          Act
        </span>
        <FlowArrow />
        <span>
          <AudioLines size={13} />
          Respond
        </span>
      </div>
    </div>
  );
}

export function RagArchitecture() {
  return (
    <div className="rag-diagram">
      <div className="rag-map">
        <FlowLines
          viewBox="0 0 480 250"
          paths={[
            "M96 52V72Q96 82 106 82H206Q216 82 216 92V101",
            "M240 52V101",
            "M384 52V72Q384 82 374 82H274Q264 82 264 92V101",
            "M240 165V199",
          ]}
        />
        <div className="rag-document doc-one">
          <FileText size={15} />
          <span>Documents</span>
        </div>
        <div className="rag-document doc-two">
          <FileText size={15} />
          <span>Knowledge</span>
        </div>
        <div className="rag-document doc-three">
          <FileText size={15} />
          <span>Resources</span>
        </div>
        <div className="retrieval-engine">
          <span className="retrieval-icon">
            <Database size={24} />
          </span>
          <div>
            <small className="mono">QDRANT · VECTOR RETRIEVAL</small>
            <strong>The right context. Retrieved.</strong>
          </div>
          <Search size={17} />
          <i className="retrieval-scan" />
        </div>
        <div className="rag-answer">
          <Sparkles size={17} />
          <div>
            <strong>Answers grounded in your knowledge.</strong>
            <span>Retrieve → reason → respond</span>
          </div>
          <CheckCheck size={15} />
        </div>
      </div>
      <div className="rag-guardrail">
        <ShieldCheck size={12} />
        <span>GUARDRAILS · VALIDATION · TOKEN MONITORING</span>
      </div>
    </div>
  );
}
