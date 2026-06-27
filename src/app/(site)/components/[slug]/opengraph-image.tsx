import { ImageResponse } from "next/og";

import { getByTier, getEntry } from "@/registry/registry";
import { SITE } from "@/lib/site";

export const alt = "Saumya UI component";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getByTier("component").map((entry) => ({ slug: entry.name }));
}

const INK = "#09090b";
const FG = "#fafafa";
const MUTED = "#a1a1aa";
const ACCENT = "#fafafa";
const BORDER = "#27272a";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  const title = entry?.title ?? "Component";
  const category = entry?.category ?? "UI";
  const description =
    entry?.description ?? "Copy-paste React components by Saumya.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: `radial-gradient(900px circle at 0% 0%, rgba(255,255,255,0.08), transparent 55%)`,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              background: ACCENT,
              color: INK,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 26, color: FG, fontWeight: 600 }}>
            Saumya{" "}
            <span style={{ color: MUTED, marginLeft: 8 }}> UI</span>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "8px 18px",
              color: MUTED,
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 28,
            }}
          >
            {category}
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: FG }}>
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: MUTED,
              marginTop: 24,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {description.length > 130 ? description.slice(0, 127) + "…" : description}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{SITE.url.replace("https://", "")}</div>
          <div style={{ display: "flex" }}>npx shadcn add</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
