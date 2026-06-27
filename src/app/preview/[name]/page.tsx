import { notFound } from "next/navigation";

import { registry, getEntry, tierOf } from "@/registry/registry";
import { demos } from "@/registry/demos";

/**
 * Isolated render of a single demo — no nav, no footer — so it can be embedded
 * in an <iframe> at arbitrary viewport widths (see BlockPreview). Blocks render
 * full-bleed; components are centered on a canvas.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return registry.map((entry) => ({ name: entry.name }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const entry = getEntry(name);
  const Demo = entry ? demos[entry.name] : undefined;
  if (!entry || !Demo) notFound();

  if (tierOf(entry) === "component") {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-8">
        <Demo />
      </div>
    );
  }

  return <Demo />;
}
