"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.ComponentProps<"div"> {
  /** Spotlight radius in pixels. */
  radius?: number;
  /** Spotlight color (any CSS color). Defaults to the emerald accent. */
  color?: string;
}

/**
 * A surface that reveals a soft radial spotlight following the cursor.
 * Pure CSS variables — no animation library, no re-render per mouse move.
 */
export function SpotlightCard({
  children,
  className,
  radius = 350,
  color = "color-mix(in oklch, var(--accent) 22%, transparent)",
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  const onMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      data-slot="spotlight-card"
      className={cn(
        "group relative overflow-hidden rounded-base border border-border bg-surface p-6",
        className,
      )}
      style={
        {
          "--spotlight-size": `${radius}px`,
          "--spotlight-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(var(--spotlight-size) circle at var(--x) var(--y), var(--spotlight-color), transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
