"use client";

import * as React from "react";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";

import { cn } from "@/lib/utils";

const SIZES = [
  { id: "desktop", label: "Desktop", width: "100%", Icon: Monitor },
  { id: "tablet", label: "Tablet", width: "768px", Icon: Tablet },
  { id: "mobile", label: "Mobile", width: "375px", Icon: Smartphone },
] as const;

/** Renders a block in an isolated iframe with a device-width toggle. */
export function BlockPreview({ name, title }: { name: string; title: string }) {
  const [active, setActive] = React.useState<(typeof SIZES)[number]["id"]>("desktop");
  const width = SIZES.find((s) => s.id === active)!.width;
  const src = `/preview/${name}`;

  return (
    <div className="overflow-hidden rounded-base border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-label={s.label}
              aria-pressed={active === s.id}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded transition-colors",
                active === s.id
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-foreground",
              )}
            >
              <s.Icon className="size-4" />
            </button>
          ))}
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
        >
          Open <ExternalLink className="size-3.5" />
        </a>
      </div>

      <div className="flex justify-center bg-grid p-3 sm:p-4">
        <iframe
          title={`${title} preview`}
          src={src}
          loading="lazy"
          className="h-[560px] w-full rounded-md border border-border bg-background transition-[max-width] duration-300"
          style={{ maxWidth: width }}
        />
      </div>
    </div>
  );
}
