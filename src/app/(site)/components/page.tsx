import { type Metadata } from "next";

import { getByTier, getCategories } from "@/registry/registry";
import { ComponentCard } from "@/components/site/component-card";
import { PageHeader, CategoryLabel } from "@/components/site/section-heading";
import { InstallCommand } from "@/components/site/install-command";

export const metadata: Metadata = {
  title: "Components",
  description: "Accessible, copy-paste React components built on Radix.",
};

export default function ComponentsPage() {
  const components = getByTier("component");
  const categories = getCategories("component");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader
        eyebrow={`${components.length} components`}
        title={
          <>
            Building blocks,
            <br />
            fully <span className="text-muted">yours.</span>
          </>
        }
        lede="Accessible, dependency-light React components. Copy the source or install with the shadcn CLI — then edit freely."
      >
        <div className="max-w-md">
          <InstallCommand command="npx shadcn@latest add ui.saumyarex.xyz/r/button.json" />
        </div>
      </PageHeader>

      <div className="mt-16 space-y-16">
        {categories.map((category, i) => {
          const items = components.filter((e) => e.category === category);
          return (
            <section key={category}>
              <CategoryLabel
                index={String(i + 1).padStart(2, "0")}
                label={category}
                count={items.length}
              />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((entry) => (
                  <div key={entry.name} className="reveal">
                    <ComponentCard entry={entry} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
