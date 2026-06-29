import { ViewTransition } from "react";
import Link from "next/link";

import { type RegistryEntry, hrefFor } from "@/registry/registry";
import { demos } from "@/registry/demos";
import { cn, previewTransitionName } from "@/lib/utils";

/** Gallery card for a full template — scaled full-page thumbnail + Free/Pro tag. */
export function TemplateCard({ entry }: { entry: RegistryEntry }) {
  const Demo = demos[entry.name];

  return (
    <div className="group relative overflow-hidden rounded-base border border-border bg-surface transition-colors hover:border-ink-400/60">
      <ViewTransition name={previewTransitionName(entry.name)} share="morph">
        <div className="relative h-80 overflow-hidden border-b border-border bg-background">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 origin-top-left scale-[0.34]"
            style={{ width: "294%" }}
          >
            {Demo ? <Demo /> : null}
          </div>
        </div>
      </ViewTransition>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-medium tracking-tight text-foreground">{entry.title}</h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted">{entry.description}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
            entry.pro
              ? "bg-accent text-accent-fg"
              : "border border-border text-muted",
          )}
        >
          {entry.pro ? "Pro" : "Free"}
        </span>
      </div>

      <Link
        href={hrefFor(entry)}
        className="absolute inset-0 rounded-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-label={entry.title}
      >
        <span className="sr-only">{entry.title}</span>
      </Link>
    </div>
  );
}
