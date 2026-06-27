import { type Metadata } from "next";

import { getByTier, getCategories } from "@/registry/registry";
import { ComponentCard } from "@/components/site/component-card";

export const metadata: Metadata = {
  title: "Components",
  description: "Accessible, copy-paste React components built on Radix.",
};

export default function ComponentsPage() {
  const components = getByTier("component");
  const categories = getCategories("component");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="mt-2 text-muted">
          {components.length} accessible building block
          {components.length === 1 ? "" : "s"} — copy-paste or install with the CLI.
        </p>
      </header>

      <div className="space-y-12">
        {categories.map((category) => {
          const items = components.filter((e) => e.category === category);
          return (
            <section key={category}>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
                {category}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((entry) => (
                  <ComponentCard key={entry.name} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
