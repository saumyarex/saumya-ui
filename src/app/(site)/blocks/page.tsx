import { type Metadata } from "next";

import { getByTier, getCategories } from "@/registry/registry";
import { BlockCard } from "@/components/site/block-card";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Full, responsive sections — heroes, pricing, CTAs — composed from the components. Copy-paste or install a whole section with one command.",
};

export default function BlocksPage() {
  const blocks = getByTier("block");
  const categories = getCategories("block");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Blocks</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Full, responsive sections built from the components — drop a whole hero,
          pricing table, or CTA into your project. Install one and its component
          dependencies come with it.
        </p>
      </header>

      <div className="space-y-12">
        {categories.map((category) => {
          const items = blocks.filter((e) => e.category === category);
          return (
            <section key={category}>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
                {category}
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {items.map((entry) => (
                  <BlockCard key={entry.name} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
