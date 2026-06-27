import { ImageResponse } from "next/og";

// iOS home-screen icon. iOS masks to a rounded square, so we use a full-bleed
// opaque background and center the copy mark.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#0a0a0f";
const FG = "#fafafa";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        <div style={{ position: "relative", display: "flex", width: 96, height: 96 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 58,
              height: 58,
              borderRadius: 16,
              border: `12px solid ${FG}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 22,
              width: 74,
              height: 74,
              borderRadius: 18,
              background: INK,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 30,
              width: 60,
              height: 60,
              borderRadius: 16,
              background: FG,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
