export interface Project {
  id: string;
  slug: string;
  overview: string[];
  name: string;
  category: string;
  kind: "ai" | "software";
  description: string;
  contribution: string;
  highlights: string[];
  technologies: string[];
  flow: string[];
  visual: "strategy" | "social" | "voice" | "rag" | "data";
}
export interface SkillGroup {
  name: string;
  skills: string[];
}
export interface Capability {
  title: string;
  description: string;
  technologies: string[];
}

export const portfolio = {
  name: "Hetvi Shah",
  headline: "AI Engineer & Software Engineer",
  location: "Gujarat, India",
  availability: "Available for AI & software engineering opportunities",
  intro:
    "I’m Hetvi Shah, an AI & Software Engineer building multi-agent systems, conversational voice agents, RAG applications, and the backend systems that bring them to life.",
  approach:
    "I work across AI orchestration, Python/FastAPI, LangGraph, Java/Spring Boot, and modern web technologies to turn complex workflows into reliable products.",
  bio: [
    "I build AI-powered systems that go beyond simple model calls. My work connects multi-agent orchestration, multilingual voice agents, retrieval-augmented generation, and backend services into reliable applications.",
    "My software engineering background allows me to approach AI from both sides — designing intelligent workflows while understanding the APIs, services, databases, integrations, and frontend experiences required to turn them into usable products. I build with persistent state, retries, guardrails, model routing, and observability in mind.",
  ],
  socials: { github: "ADD_GITHUB_URL", linkedin: "ADD_LINKEDIN_URL" },
  email: "ADD_EMAIL",
  resume: "/resume.pdf",
  contact:
    "I’m interested in building intelligent products, agentic workflows, AI automation, and backend systems that turn emerging AI capabilities into practical software.",
  footer: "Designed & built with curiosity, code, and a lot of iteration.",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const technologies = [
  "Python",
  "LangGraph",
  "LLMs",
  "FastAPI",
  "OpenAI",
  "Prompt Engineering",
  "AI Agents",
  "n8n",
  "Java",
  "Spring Boot",
  "REST APIs",
  "React",
  "Next.js",
  "TypeScript",
  "MySQL",
  "MongoDB",
  "Docker",
  "Git",
];

export const projects: Project[] = [
  {
    id: "01",
    slug: "strategy-navigator",
    overview: [
      "Strategy Navigator takes a user’s project context through domain-specific agent generation, contextual and foundational agent selection, idea generation, voting, and report creation. The system combines multi-agent analysis with context-aware workflow automation.",
      "Rapid Insight idea generation runs in parallel with 10-step form filling. The form branch continues into foresight processing, then rapid insights, foresight ideas, and human ideas are consolidated. The user selects ideas and a voting foundational agent before the parent and child voting agents run through voting middleware.",
      "After voting, the capstone pipeline runs automatically. The user views available report archetypes and either selects an existing archetype or builds a custom one. The selected path leads to a rendered report.",
      "My work covered LangGraph and n8n orchestration, backend integrations, dynamic context-aware prompts, model routing, and long-running workflow reliability through checkpoints, retries, and resume support.",
    ],
    name: "Strategy Navigator",
    category: "Agentic AI · LangGraph · n8n",
    kind: "ai",
    visual: "strategy",
    description:
      "An AI-powered strategy analysis platform built around multi-agent workflows and structured orchestration.",
    contribution:
      "Connecting specialized agents into reliable, multi-step strategy workflows — from idea generation to a final report.",
    highlights: [
      "Built agentic workflows using LangGraph and designed multi-step AI execution pipelines with domain-specific agents.",
      "Connected parallel and sequential execution across rapid insights, 10-step analysis, foresight, consolidation, voting, capstone processing, and reports.",
      "Integrated LangGraph and n8n workflows with backend services, REST APIs, callbacks, and webhook-driven execution.",
      "Implemented persistent workflow state, checkpointing, retries, and resume support for long-running AI pipelines.",
      "Built dynamic prompts using runtime project and client context, with token counting and prompt-quality checks.",
      "Used LiteLLM for model routing and fallback across multiple LLMs, with web search tools to enrich agent context.",
      "Integrated MongoDB, Redis, and AWS S3 for state, caching, and document handling.",
      "Tested workflows in staging and improved failure handling across capstone and report generation flows.",
    ],
    technologies: [
      "LangGraph",
      "Python",
      "n8n",
      "LLMs",
      "AI Agents",
      "Prompt Engineering",
      "LiteLLM",
      "REST APIs",
      "Webhooks",
      "Java",
      "Spring Boot",
      "MySQL",
      "MongoDB",
      "Redis",
      "AWS S3",
      "Docker",
    ],
    flow: [
      "Project context",
      "Domain-specific agent",
      "Contextual + foundational agents",
      "Parallel rapid insights + 10-step form / foresight",
      "Rapid + foresight + human idea consolidation",
      "Idea + voting agent selection",
      "Voting workflow",
      "Automatic capstone pipeline",
      "Available report archetypes",
      "Existing or custom archetype",
      "Rendered report",
    ],
  },
  {
    id: "02",
    slug: "cydra-social",
    overview: [
      "CYDRA Social connects AI-assisted content creation with the practical steps of social publishing. Professionals can create content manually or generate variations, refine drafts, manage media, and schedule posts for LinkedIn, X, and Meta.",
      "I worked across AI, backend, and frontend layers. Specialized Viral, SEO, Community, and Curator agents support generation and review, while FastAPI services, React interfaces, OAuth integrations, and webhooks connect the content workflow to scheduling and publishing.",
    ],
    name: "CYDRA Social",
    category: "Multi-Agent SaaS · Generative AI · FastAPI",
    kind: "ai",
    visual: "social",
    description:
      "A multi-agent social publishing platform that turns one idea into refined, platform-ready content — from first draft to scheduled publication.",
    contribution:
      "Orchestrating specialized Viral, SEO, Community, and Curator agents, then connecting approved content to real publishing workflows.",
    highlights: [
      "Built and orchestrated specialized agents for content generation, optimization, quality review, and platform-specific adaptation.",
      "Designed AI workflows that create multiple draft variations, refine outputs, and connect approved content to scheduling and publishing.",
      "Integrated Python/FastAPI and LangGraph workflows with React, external social APIs, OAuth, and webhooks.",
      "Improved workflow reliability with persistent state, asynchronous processing, failure handling, and fixes for concurrent content generation.",
      "Contributed to manual creation, media management, timezone-aware scheduling, and publishing workflows for LinkedIn, X, and Meta.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangGraph",
      "OpenAI / LLM APIs",
      "React",
      "PostgreSQL",
      "OAuth",
      "Webhooks",
    ],
    flow: [
      "Idea",
      "Specialized agents",
      "Draft variations",
      "Quality review",
      "Schedule",
      "Publish",
    ],
  },
  {
    id: "03",
    slug: "conversational-ai-voice-agents",
    overview: [
      "These voice agents support inbound and outbound conversations across healthcare, BFSI, insurance, and retail workflows. They combine conversation context with tool calling so a conversation can lead to actions such as bookings, follow-ups, order tracking, loan processing, and claims.",
      "I built voice workflows with Python, Pipecat, LangGraph, Gemini, Twilio, and ElevenLabs. The work included automatic language handling for English, Hindi, Gujarati, Marathi, and Spanish, together with conversation state, retries, external API integrations, and reusable agent components.",
    ],
    name: "Conversational AI Voice Agents",
    category: "Voice AI · LangGraph · Real-Time Conversations",
    kind: "ai",
    visual: "voice",
    description:
      "Multilingual AI voice agents for inbound and outbound conversations, connected to the business tools needed to act on a conversation.",
    contribution:
      "Engineering context-aware voice workflows that listen, reason, call tools, and respond across multiple languages.",
    highlights: [
      "Built production-oriented voice agents for healthcare, BFSI, insurance, and retail workflows.",
      "Developed conversational agents with Python, Pipecat, LangGraph, Gemini, Twilio, and ElevenLabs.",
      "Implemented tool calling for bookings, follow-ups, order tracking, loan processing, claims, and other business workflows.",
      "Built automatic language handling across English, Hindi, Gujarati, Marathi, and Spanish.",
      "Added conversation state, retries, call handling, external API integrations, and reusable agent components.",
      "Containerized the solution with Docker for deployment.",
    ],
    technologies: [
      "Python",
      "Pipecat",
      "LangGraph",
      "Gemini",
      "ElevenLabs",
      "Twilio",
      "Tool Calling",
      "Docker",
    ],
    flow: [
      "Incoming call",
      "Language context",
      "Voice agent",
      "Business tools",
      "Spoken response",
    ],
  },
  {
    id: "04",
    slug: "wishai-knowledge-assistant",
    overview: [
      "WishAI is an internal knowledge assistant that helps employees find organizational documents and resources. Its retrieval-augmented generation workflow connects a question to relevant knowledge before a language model produces a grounded answer.",
      "My work covered document ingestion, chunking, embeddings, metadata filtering, and Qdrant retrieval. I also connected FastAPI and LangGraph workflows to a React chat interface, with dynamic model selection, response caching, guardrails, structured validation, and token monitoring.",
    ],
    name: "WishAI · Knowledge Assistant",
    category: "RAG · Qdrant · Conversational AI",
    kind: "ai",
    visual: "rag",
    description:
      "An internal RAG-based assistant that helps employees find organizational knowledge, documents, and resources through grounded AI responses.",
    contribution:
      "Building the retrieval pipeline and conversational experience — with model selection, caching, guardrails, and token monitoring.",
    highlights: [
      "Implemented document ingestion, chunking, embeddings, metadata filtering, and Qdrant vector search.",
      "Connected retrieved context to LLMs to generate grounded responses to organizational knowledge questions.",
      "Added dynamic LLM selection and response caching to reduce repeated model calls.",
      "Implemented input/output guardrails, structured validation, and logging for controlled AI interactions.",
      "Added token monitoring with Grafana.",
      "Integrated FastAPI-based LangGraph workflows with React chat interfaces, using LangChain and PostgreSQL.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Qdrant",
      "PostgreSQL",
      "React",
      "Grafana",
    ],
    flow: [
      "Documents",
      "Chunk & embed",
      "Vector retrieval",
      "Context + LLM",
      "Grounded answer",
    ],
  },
  {
    id: "05",
    slug: "web-data-intelligence",
    overview: [
      "This modular platform combines company and professional information from multiple sources. Its workflows cover Clutch and Y Combinator company data, RocketReach person data, email verification, aggregation, and enrichment, alongside email campaigns and tracking.",
      "I worked on Spring Boot services, scraping with Selenium and Jsoup, external API integrations, and company and person aggregation services. The supporting application includes REST APIs, authentication and security, and React dashboards.",
    ],
    name: "Web Data Intelligence & Lead Enrichment Platform",
    category: "Data Engineering · Automation · Backend",
    kind: "software",
    visual: "data",
    description:
      "A modular platform that aggregates company and professional information from multiple sources and enriches it through automated processing.",
    contribution:
      "Engineering the services, integrations, and dashboards behind a modular data intelligence platform.",
    highlights: [
      "Built Spring Boot services and scraping workflows using Selenium and Jsoup.",
      "Integrated external APIs and designed company and person aggregation services.",
      "Worked with Clutch and Y Combinator company data, RocketReach person data, and email verification.",
      "Implemented REST APIs, authentication/security, and React frontend dashboards.",
      "The platform includes email campaigns and email tracking.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Selenium",
      "Jsoup",
      "React",
      "REST APIs",
      "MySQL",
      "MongoDB",
    ],
    flow: ["Data sources", "Aggregation", "Enrichment", "Intelligence"],
  },
];

export const capabilities: Capability[] = [
  {
    title: "Agentic AI",
    description:
      "Designing multi-agent workflows where specialized AI agents collaborate across structured tasks.",
    technologies: ["LangGraph", "LLMs", "Agent orchestration"],
  },
  {
    title: "LLM Integration",
    description:
      "Integrating model APIs, structured outputs, tool calling, and LiteLLM routing with model fallback handling.",
    technologies: ["LiteLLM", "Tool calling", "Model fallback"],
  },
  {
    title: "Workflow Orchestration",
    description:
      "Building multi-stage AI workflows with validation, retries, state management, and structured execution.",
    technologies: ["State management", "Checkpoints"],
  },
  {
    title: "Prompt Engineering",
    description:
      "Designing dynamic prompts around runtime project context, client information, constraints, and output schemas.",
    technologies: ["Dynamic context", "Output schemas"],
  },
  {
    title: "AI Automation",
    description:
      "Connecting AI workflows with webhooks, external services, and backend applications.",
    technologies: ["n8n", "Webhooks", "Integrations"],
  },
  {
    title: "Backend Engineering",
    description:
      "Developing the APIs and services that turn intelligent workflows into production-ready applications.",
    technologies: ["Python / FastAPI", "Java / Spring Boot"],
  },
  {
    title: "Conversational Voice AI",
    description:
      "Building context-aware, multilingual voice agents that connect live conversations to business tools and APIs.",
    technologies: ["Pipecat", "Twilio", "ElevenLabs"],
  },
  {
    title: "Retrieval-Augmented Generation",
    description:
      "Turning organizational documents into grounded answers with ingestion, embeddings, vector retrieval, and guardrails.",
    technologies: ["Qdrant", "LangChain", "RAG"],
  },
];

export const experience = {
  company: "Wishtree Technologies",
  role: "Associate Software Engineer",
  location: "Ahmedabad, Gujarat",
  start: "December 2024",
  startDate: "2024-12",
  end: "Present",
  description:
    "Building AI-powered products across multi-agent workflows, multilingual voice agents, RAG assistants, and automation — supported by Python/FastAPI, Java/Spring Boot, and React.",
  progression: [
    "Software engineering",
    "Backend systems",
    "Applied AI",
    "Agentic AI & automation",
  ],
  highlights: [
    "Developing APIs, services, and integrations that connect AI capabilities to usable products.",
    "Orchestrating specialized agents, dynamic prompts, and multi-stage analysis workflows.",
    "Building workflow resilience through checkpoints, retries, model routing, guardrails, token monitoring, and observability.",
  ],
};

export const skills: SkillGroup[] = [
  {
    name: "AI & LLM",
    skills: [
      "LangGraph",
      "LLM Integration",
      "AI Agents",
      "Prompt Engineering",
      "Structured Outputs",
      "Workflow Orchestration",
      "Generative AI",
      "AI Automation",
      "LangChain",
      "RAG",
      "Tool Calling",
      "LiteLLM",
    ],
  },
  {
    name: "Python",
    skills: ["Python", "FastAPI", "Async programming", "Pydantic", "pytest"],
  },
  {
    name: "Backend",
    skills: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Spring Security",
      "JWT",
      "OAuth2",
    ],
  },
  {
    name: "Frontend",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  { name: "Automation", skills: ["n8n", "Webhooks", "API integrations"] },
  { name: "Databases", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  {
    name: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS EC2 / S3",
      "Postman",
      "Grafana",
      "Langfuse",
      "LangSmith",
      "SonarQube",
    ],
  },
  {
    name: "Voice & retrieval",
    skills: ["Pipecat", "ElevenLabs", "Twilio", "Gemini", "Qdrant", "FAISS"],
  },
];

export const processSteps = [
  {
    title: "Understand",
    description:
      "Understand the business problem, available context, constraints, and expected outcome.",
  },
  {
    title: "Design",
    description:
      "Define agents, prompts, tools, workflow states, APIs, and structured outputs.",
  },
  {
    title: "Orchestrate",
    description:
      "Connect models, agents, backend services, tools, and automation workflows.",
  },
  {
    title: "Validate",
    description:
      "Add structured validation, retries, error handling, checkpoints, and observability.",
  },
  {
    title: "Ship",
    description:
      "Integrate the AI system into a usable application and continuously improve it.",
  },
];
export const currentFocus = [
  "Agentic AI",
  "Multi-Agent Systems",
  "Voice AI",
  "LLM Orchestration",
  "RAG",
  "AI Automation",
  "Reliable AI Workflows",
];

export function isConfigured(value: string): boolean {
  return Boolean(value && !value.startsWith("ADD_"));
}
export function isSocialUrl(value: string): boolean {
  if (!isConfigured(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
export const hasEmail =
  isConfigured(portfolio.email) &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email);
