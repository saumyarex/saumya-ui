import { type Metadata } from "next";

import { getByTier, getCategories } from "@/registry/registry";
import { BlockCard } from "@/components/site/block-card";
import { PageHeader, CategoryLabel } from "@/components/site/section-heading";
import { InstallCommand } from "@/components/site/install-command";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Full, responsive sections — heroes, pricing, CTAs — composed from the components. Copy-paste or install a whole section with one command.",
};

export default function BlocksPage() {
  const blocks = getByTier("block");
  const categories = getCategories("block");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader
        eyebrow={`${blocks.length} blocks`}
        title={
          <>
            Whole sections,
            <br />
            <span className="text-muted">drop-in</span> ready.
          </>
        }
        lede="Heroes, pricing tables, CTAs — full responsive sections built from the components. Install one and its component dependencies come with it."
      >
        <div className="max-w-md">
          <InstallCommand command="npx shadcn@latest add ui.saumyarex.xyz/r/pricing-three-tier.json" />
        </div>
      </PageHeader>

      <div className="mt-16 space-y-16">
        {categories.map((category, i) => {
          const items = blocks.filter((e) => e.category === category);
          return (
            <section key={category}>
              <CategoryLabel
                index={String(i + 1).padStart(2, "0")}
                label={category}
                count={items.length}
              />
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {items.map((entry) => (
                  <div key={entry.name} className="reveal">
                    <BlockCard entry={entry} />
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
