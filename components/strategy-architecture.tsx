import {
  Check,
  FileText,
  GitBranch,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";
import { FlowLines } from "@/components/ui/flow-lines";

export function StrategyArchitecture() {
  return (
    <div className="strategy-diagram">
      <div className="strategy-map">
        <FlowLines
          paths={[
            "M80 52V76Q80 86 90 86H206Q216 86 216 96V108",
            "M240 52V108",
            "M400 52V76Q400 86 390 86H274Q264 86 264 96V108",
            "M240 176V216",
          ]}
        />
        <div className="strategy-source source-research">
          <Layers3 size={15} />
          <span>Rapid insights</span>
        </div>
        <div className="strategy-source source-strategy">
          <Sparkles size={15} />
          <span>Foresight</span>
        </div>
        <div className="strategy-source source-analysis">
          <GitBranch size={15} />
          <span>Human ideas</span>
        </div>
        <div className="diagram-core">
          <span className="diagram-core-icon">
            <Workflow size={27} />
          </span>
          <div>
            <small>POWERED BY LANGGRAPH</small>
            <strong>Idea consolidation</strong>
          </div>
          <span className="status-dot" />
        </div>
        <div className="diagram-output">
          <FileText size={16} />
          <span>Voting → Capstone → Report</span>
          <Check size={14} />
        </div>
      </div>
      <div className="diagram-state">
        <span>STATEFUL</span>
        <span>RESUMABLE</span>
        <span>STRUCTURED</span>
      </div>
    </div>
  );
}
