export interface PipelineNode {
  title: string;
  detail?: string;
  tone: "neutral" | "violet" | "mint" | "amber" | "blue" | "coral" | "green";
}

export type PipelineStage =
  | { kind: "step"; node: PipelineNode }
  | { kind: "parallel" | "choice"; label: string; branches: PipelineNode[][] };

// Transcribed from Hetvi's supplied Strategy Navigator workflow diagram.
export const strategyPipeline: PipelineStage[] = [
  {
    kind: "step",
    node: { title: "User provides project context", tone: "neutral" },
  },
  {
    kind: "step",
    node: {
      title: "Domain-specific agent generated",
      detail: "Domain Specific Agent",
      tone: "violet",
    },
  },
  {
    kind: "step",
    node: {
      title: "User selects contextual + foundational agents",
      tone: "neutral",
    },
  },
  {
    kind: "parallel",
    label: "Running in parallel",
    branches: [
      [
        {
          title: "Rapid insight ideas generated",
          detail: "Rapid Insight – Consolidation Agent",
          tone: "mint",
        },
      ],
      [
        {
          title: "10-step form filling begins",
          detail: "10 Step Form Filling",
          tone: "amber",
        },
        {
          title: "Foresight ideas processed",
          detail: "Foresight Consolidation Agent",
          tone: "amber",
        },
      ],
    ],
  },
  {
    kind: "step",
    node: {
      title: "Rapid + foresight + human ideas consolidated",
      detail: "Rapid Insight – Consolidation Agent",
      tone: "blue",
    },
  },
  {
    kind: "step",
    node: {
      title: "User selects ideas + voting foundational agent",
      tone: "neutral",
    },
  },
  {
    kind: "step",
    node: {
      title: "Voting workflow",
      detail:
        "Voting Agent (Parent) · Voting Agent (Child) · Voting Middleware",
      tone: "coral",
    },
  },
  {
    kind: "step",
    node: {
      title: "Capstone pipeline runs automatically",
      detail: "Strategy Navigator Capstone Pipeline",
      tone: "violet",
    },
  },
  {
    kind: "step",
    node: { title: "User views available report archetypes", tone: "neutral" },
  },
  {
    kind: "choice",
    label: "User chooses one archetype path",
    branches: [
      [{ title: "Selects existing archetype", tone: "mint" }],
      [{ title: "Builds custom archetype", tone: "amber" }],
    ],
  },
  {
    kind: "step",
    node: {
      title: "Report rendered for user",
      detail: "Report Render",
      tone: "green",
    },
  },
];
