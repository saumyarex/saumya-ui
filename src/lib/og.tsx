import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#09090b";
const FG = "#fafafa";
const MUTED = "#a1a1aa";
const ACCENT = "#fafafa";
const BORDER = "#27272a";

/** Branded OG card shared by every component / block / template page. */
export function ogImage({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
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
          backgroundImage:
            "radial-gradient(900px circle at 0% 0%, rgba(255,255,255,0.08), transparent 55%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 11,
              background: ACCENT,
            }}
          >
            <div style={{ position: "relative", display: "flex", width: 24, height: 24 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  border: `3px solid ${INK}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 5,
                  top: 5,
                  width: 19,
                  height: 19,
                  borderRadius: 5,
                  background: ACCENT,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 7,
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  background: INK,
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: FG, fontWeight: 600 }}>
            Saumya <span style={{ color: MUTED, marginLeft: 8 }}>UI</span>
          </div>
        </div>

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
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: FG }}>
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: MUTED,
              marginTop: 24,
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            {description.length > 130 ? description.slice(0, 127) + "…" : description}
          </div>
        </div>

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
    { ...OG_SIZE },
  );
}
