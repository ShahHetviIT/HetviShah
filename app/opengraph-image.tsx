import { ImageResponse } from "next/og";
export const alt =
  "Hetvi Shah — AI Engineer & Software Engineer. Building intelligent systems that turn AI into real products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 76px",
        background: "#f7f8fa",
        color: "#14121c",
        fontFamily: "sans-serif",
        backgroundImage:
          "radial-gradient(circle at 100% 0%, #e4d9ff, transparent 55%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 700 }}>Hetvi Shah.</span>
        <span style={{ fontSize: 17, color: "#6b4cc0" }}>
          AI ENGINEER × PRODUCT THINKER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 74,
          letterSpacing: -4,
          lineHeight: 1.13,
          fontWeight: 700,
        }}
      >
        <span>Building intelligent systems</span>
        <span>that turn AI into</span>
        <span style={{ color: "#7950d1" }}>real products.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#65616e",
        }}
      >
        <span>Agentic AI · LangGraph · LLMs · Backend Engineering</span>
        <span>Gujarat, India ↗</span>
      </div>
    </div>,
    size,
  );
}
