import { ImageResponse } from "next/og";
import { notes, profile, projects } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const counts = [
    `${projects.length} shipped projects`,
    `${notes.length} journal entries`,
    profile.location,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10120f",
          padding: 72,
          borderTop: "14px solid #c7f542",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#c7f542",
              textTransform: "uppercase",
            }}
          >
            portfolio / 2026
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 92,
              fontWeight: 700,
              color: "#ECE9DE",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 40,
              color: "#c7f542",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 24,
              color: "#8d9184",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            AI systems, RAG pipelines, MCP tooling, and full-stack platforms
            built end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8d9184",
          }}
        >
          <div style={{ display: "flex" }}>{counts.join("   ·   ")}</div>
          <div style={{ display: "flex", color: "#c7f542" }}>sushan.</div>
        </div>
      </div>
    ),
    size,
  );
}