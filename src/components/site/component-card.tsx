import Link from "next/link";

import { type RegistryEntry, hrefFor } from "@/registry/registry";
import { demos } from "@/registry/demos";

export function ComponentCard({ entry }: { entry: RegistryEntry }) {
  const Demo = demos[entry.name];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-base border border-border bg-surface transition-colors hover:border-ink-400/60">
      {/* Non-interactive preview — demos may contain buttons, so keep them out
          of the card's anchor (the stretched link below handles navigation). */}
      <div className="pointer-events-none grid min-h-50 flex-1 place-items-center overflow-hidden border-b border-border bg-grid p-8">
        {Demo ? <Demo /> : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium tracking-tight text-foreground">{entry.title}</h3>
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
            {entry.category}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{entry.description}</p>
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
