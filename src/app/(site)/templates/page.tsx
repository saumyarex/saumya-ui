import { type Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getByTier } from "@/registry/registry";
import { Button } from "@/registry/ui/button";
import { TemplateCard } from "@/components/site/template-card";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full, production-ready page templates assembled from Saumya UI blocks and components. Install a whole page with one command.",
};

const upcoming = [
  "Waitlist / coming soon",
  "Startup pricing page",
  "Admin dashboard shell",
  "Docs site",
];

export default function TemplatesPage() {
  const templates = getByTier("template");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Complete, production-ready pages assembled from the blocks. Install one
          and every block and component it uses comes with it — then make it yours.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {templates.map((entry) => (
          <TemplateCard key={entry.name} entry={entry} />
        ))}
      </div>

      {/* Pro / All-Access scaffolding — everything is free today. */}
      <section className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted">
              All-Access · coming soon
            </span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              More templates on the way
            </h2>
            <p className="mt-2 text-sm text-muted">
              Every template is free today. Premium, full-stack templates
              ({upcoming.join(", ")}) will land under an optional All-Access plan —
              the open components and blocks stay free forever.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blocks">
              Browse blocks <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
