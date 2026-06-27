import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in Saumya UI — components, blocks, and templates.",
};

const releases = [
  {
    version: "1.2.0",
    date: "June 28, 2026",
    title: "Templates",
    changes: [
      "New SaaS Landing Page template — a full page assembled from 11 blocks, installable with one command.",
      "Added the Footer block.",
      "Pro / All-Access scaffolding: a `pro` flag and Free/Pro badges (everything is free today).",
      "Added this changelog.",
    ],
  },
  {
    version: "1.1.0",
    date: "June 28, 2026",
    title: "Landing-page blocks",
    changes: [
      "Seven new blocks: navbar, feature grid, bento features, testimonials, stats, logo cloud, and an accessible FAQ.",
      "Blocks gallery recategorized into Heroes, Pricing, Features, Social Proof, and more.",
    ],
  },
  {
    version: "1.0.0",
    date: "June 27, 2026",
    title: "Initial release",
    changes: [
      "Six accessible, Radix-based components with copy-paste + shadcn CLI install.",
      "Three marketing blocks with isolated, device-width iframe previews.",
      "Monochrome design system, ⌘K command palette, MDX docs, props tables, and dynamic OG images.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Changelog</h1>
        <p className="mt-2 text-muted">
          New components, blocks, and templates — and the occasional fix. Because
          the code lives in your repo, you upgrade only when you choose to.
        </p>
      </header>

      <div className="space-y-12">
        {releases.map((release) => (
          <section
            key={release.version}
            className="relative border-l border-border pl-6 sm:pl-8"
          >
            <span className="absolute -left-1.5 top-1.5 size-3 rounded-full border-2 border-background bg-foreground" />
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                v{release.version}
              </h2>
              <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                {release.title}
              </span>
              <span className="text-sm text-muted">{release.date}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {release.changes.map((change) => (
                <li key={change} className="flex gap-2.5">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-border" />
                  {change}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
