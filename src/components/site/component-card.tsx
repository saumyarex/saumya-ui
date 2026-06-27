import Link from "next/link";

import { type RegistryEntry, hrefFor } from "@/registry/registry";
import { demos } from "@/registry/demos";

export function ComponentCard({ entry }: { entry: RegistryEntry }) {
  const Demo = demos[entry.name];

  return (
    <Link
      href={hrefFor(entry)}
      className="group flex flex-col overflow-hidden rounded-base border border-border bg-surface transition-colors hover:border-ink-400/60"
    >
      <div className="grid min-h-[200px] flex-1 place-items-center overflow-hidden border-b border-border bg-grid p-8">
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
    </Link>
  );
}
