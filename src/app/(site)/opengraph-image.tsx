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
              color: INK,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 28, color: FG, fontWeight: 600 }}>
            Saumya <span style={{ color: MUTED, marginLeft: 8 }}>UI</span>
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
