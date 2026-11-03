import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "#10120f",
          color: "#c7f542",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontFamily: "monospace",
          border: "2px solid #c7f542",
        }}
      >
        山
      </div>
    ),
    {
      ...size,
    },
  );
}
