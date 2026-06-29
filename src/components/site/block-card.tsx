import { ViewTransition } from "react";
import Link from "next/link";

import { type RegistryEntry, hrefFor } from "@/registry/registry";
import { demos } from "@/registry/demos";
import { previewTransitionName } from "@/lib/utils";

/** Gallery card showing a scaled, non-interactive thumbnail of a block. */
export function BlockCard({ entry }: { entry: RegistryEntry }) {
  const Demo = demos[entry.name];

  return (
    <div className="group relative overflow-hidden rounded-base border border-border bg-surface transition-colors hover:border-ink-400/60">
      <ViewTransition name={previewTransitionName(entry.name)} share="morph">
        <div className="relative h-64 overflow-hidden border-b border-border bg-background">
          {/* Non-interactive thumbnail. The demo may contain its own links/buttons,
              so it must NOT live inside the card's anchor — see the overlay below. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 origin-top-left scale-50"
            style={{ width: "200%" }}
          >
            {Demo ? <Demo /> : null}
          </div>
        </div>
      </ViewTransition>
      <div className="flex items-center justify-between gap-2 p-4">
        <h3 className="font-medium tracking-tight text-foreground">{entry.title}</h3>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
          {entry.category}
        </span>
      </div>

      {/* Stretched link — a sibling overlay, so no nested interactive elements. */}
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
