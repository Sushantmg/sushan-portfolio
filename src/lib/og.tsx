import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgCard = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  footer?: string;
};

/**
 * Shared visual for the generated social cards. Satori only understands a
 * subset of CSS, so everything is flexbox and inline styles; no Tailwind.
 */
export function ogCard({ eyebrow, title, subtitle, tags = [], footer }: OgCard) {
  const titleSize = title.length > 48 ? 54 : title.length > 30 ? 66 : 80;
  const shortSubtitle = subtitle
    ? subtitle.length > 120
      ? `${subtitle.slice(0, 117).trimEnd()}…`
      : subtitle
    : undefined;

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
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: titleSize,
              fontWeight: 700,
              color: "#ECE9DE",
              lineHeight: 1.06,
              maxWidth: 1010,
            }}
          >
            {title}
          </div>
          {shortSubtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                color: "#8f9385",
                lineHeight: 1.4,
                maxWidth: 940,
              }}
            >
              {shortSubtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  marginRight: 10,
                  padding: "8px 14px",
                  border: "1px solid #2a2e26",
                  fontSize: 19,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#8f9385",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#8f9385" }}>
            {footer ?? "Portfolio / 2026"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 26,
            paddingTop: 18,
            borderTop: "1px solid #2a2e26",
            fontSize: 24,
            color: "#8f9385",
          }}
        >
          <div style={{ display: "flex" }}>Sushan Tamang — Full-Stack &amp; AI Developer</div>
          <div style={{ display: "flex", color: "#c7f542" }}>sushan.</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
