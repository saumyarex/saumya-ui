import { ImageResponse } from "next/og";

// iOS home-screen icon. iOS masks to a rounded square, so we use a full-bleed
// opaque background and center the mark — the "/" of a self-closing tag.
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
        <div
          style={{
            display: "flex",
            width: 18,
            height: 96,
            borderRadius: 9,
            background: FG,
            transform: "rotate(28deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
