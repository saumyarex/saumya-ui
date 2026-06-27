"use client";

import * as React from "react";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";

import { cn } from "@/lib/utils";

// Logical viewport widths — the iframe always renders at these, then scales
// down to fit the available space. So "Desktop" truly triggers desktop
// breakpoints (e.g. lg:) even inside a narrow column.
const DEVICES = [
  { id: "desktop", label: "Desktop", width: 1280, Icon: Monitor },
  { id: "tablet", label: "Tablet", width: 820, Icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, Icon: Smartphone },
] as const;

const FRAME_HEIGHT = 640;

/** Renders a block in an isolated iframe at real device widths, scaled to fit. */
export function BlockPreview({ name, title }: { name: string; title: string }) {
  const [active, setActive] = React.useState<(typeof DEVICES)[number]["id"]>("desktop");
  const [containerWidth, setContainerWidth] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const src = `/preview/${name}`;

  // Track the available width via a ResizeObserver (a subscription, not effect state).
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const device = DEVICES.find((d) => d.id === active)!;
  const scale =
    containerWidth > 0 && device.width > containerWidth
      ? containerWidth / device.width
      : 1;

  return (
    <div className="overflow-hidden rounded-base border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              aria-label={`${d.label} (${d.width}px)`}
              aria-pressed={active === d.id}
              title={`${d.label} · ${d.width}px`}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded transition-colors",
                active === d.id
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-foreground",
              )}
            >
              <d.Icon className="size-4" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs text-muted sm:inline">
            {device.width}px
          </span>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            Open <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <div ref={containerRef} className="flex justify-center overflow-hidden bg-grid p-3 sm:p-4">
        {/* Footprint after scaling, so the frame stays centered and the box
            shrinks to the scaled size. */}
        <div
          style={{ width: device.width * scale, height: FRAME_HEIGHT * scale }}
          className="relative"
        >
          <iframe
            title={`${title} preview`}
            src={src}
            loading="lazy"
            style={{
              width: device.width,
              height: FRAME_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className="absolute left-0 top-0 rounded-md border border-border bg-background"
          />
        </div>
      </div>
    </div>
  );
}
