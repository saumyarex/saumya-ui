import Link from "next/link";

import { type RegistryEntry, hrefFor } from "@/registry/registry";
import { demos } from "@/registry/demos";

/** Gallery card showing a scaled, non-interactive thumbnail of a block. */
export function BlockCard({ entry }: { entry: RegistryEntry }) {
  const Demo = demos[entry.name];

  return (
    <Link
      href={hrefFor(entry)}
      className="group block overflow-hidden rounded-base border border-border bg-surface transition-colors hover:border-ink-400/60"
    >
      <div className="relative h-64 overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 origin-top-left scale-50"
          style={{ width: "200%" }}
        >
          {Demo ? <Demo /> : null}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <h3 className="font-medium tracking-tight text-foreground">{entry.title}</h3>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
          {entry.category}
        </span>
      </div>
    </Link>
  );
}
