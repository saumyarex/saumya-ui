import { type Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getByTier } from "@/registry/registry";
import { Button } from "@/registry/ui/button";
import { TemplateCard } from "@/components/site/template-card";
import { PageHeader } from "@/components/site/section-heading";

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
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader
        eyebrow={`${templates.length} template${templates.length === 1 ? "" : "s"}`}
        title={
          <>
            Full pages,
            <br />
            <span className="text-muted">production</span>-ready.
          </>
        }
        lede="Complete pages assembled from the blocks. Install one and every block and component it uses comes with it — then make it yours."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {templates.map((entry) => (
          <div key={entry.name} className="reveal">
            <TemplateCard entry={entry} />
          </div>
        ))}
      </div>

      {/* Pro / All-Access scaffolding — everything is free today. Inverted
          for depth and to set it apart as a forward-looking note. */}
      <section className="theme-invert grain reveal relative mt-16 overflow-hidden rounded-3xl">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center font-mono text-xs uppercase tracking-tight text-muted">
              All-Access · coming soon
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              More templates on the way
            </h2>
            <p className="mt-3 text-sm text-muted">
              Every template is free today. Premium, full-stack templates
              ({upcoming.join(", ")}) will land under an optional All-Access
              plan — the open components and blocks stay free forever.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/blocks">
              Browse blocks <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
