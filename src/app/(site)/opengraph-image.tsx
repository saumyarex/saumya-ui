import { ImageResponse } from "next/og";

import { registry } from "@/registry/registry";
import { SITE } from "@/lib/site";

export const alt = "Saumya UI — components, blocks & templates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#09090b";
const FG = "#fafafa";
const MUTED = "#a1a1aa";
const ACCENT = "#fafafa";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: INK,
          backgroundImage:
            "radial-gradient(900px circle at 100% 0%, rgba(255,255,255,0.08), transparent 55%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: ACCENT,
            }}
          >
            {/* the "/" of a self-closing tag */}
            <div
              style={{
                display: "flex",
                width: 5,
                height: 26,
                borderRadius: 3,
                background: INK,
                transform: "rotate(28deg)",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 28, color: FG, fontWeight: 600 }}>
            <span style={{ color: MUTED }}>&lt;</span>
            <span style={{ marginLeft: 2 }}>Saumya</span>
            <span style={{ color: MUTED, marginLeft: 8 }}>ui</span>
            <span style={{ color: MUTED, marginLeft: 8 }}>/&gt;</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: FG, lineHeight: 1.05 }}>
          Components worth
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: ACCENT }}>
          copying.
        </div>

        <div style={{ display: "flex", fontSize: 30, color: MUTED, marginTop: 28 }}>
          {registry.length} accessible React components · copy-paste or{" "}
          npx shadcn add · {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
