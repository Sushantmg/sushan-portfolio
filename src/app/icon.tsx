import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#10120f",
          color: "#c7f542",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontFamily: "monospace",
          border: "1px solid #2a2e26",
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
