import { type Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";

import { Button } from "@/registry/ui/button";
import { Badge } from "@/registry/ui/badge";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full, production-ready page templates — landing pages, waitlists, and dashboards — assembled from Saumya UI blocks and components.",
};

const planned = [
  { name: "SaaS landing page", note: "Hero → features → pricing → FAQ → CTA" },
  { name: "Waitlist / coming soon", note: "Email capture + social proof" },
  { name: "Startup pricing page", note: "Plans, comparison, FAQ" },
  { name: "Admin dashboard shell", note: "Sidebar, topbar, data views" },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto grid size-12 place-items-center rounded-base border border-border bg-surface">
        <LayoutTemplate className="size-6 text-foreground" />
      </div>
      <Badge variant="soft" className="mt-6">
        Coming soon
      </Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Full page templates
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
        Production-ready pages assembled from the blocks and components — clone a
        whole landing page or dashboard and make it yours. The first templates
        land here soon.
      </p>

      <ul className="mx-auto mt-10 grid max-w-md gap-3 text-left">
        {planned.map((t) => (
          <li
            key={t.name}
            className="flex items-center justify-between gap-3 rounded-base border border-border bg-surface px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted">{t.note}</p>
            </div>
            <span className="text-xs text-muted">Planned</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/blocks">
            Browse blocks <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href="https://studio.saumyarex.xyz" target="_blank" rel="noreferrer">
            Need it built? Saumya Studio
          </a>
        </Button>
      </div>
    </div>
  );
}
