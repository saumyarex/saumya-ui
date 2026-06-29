import Link from "next/link";
import { ArrowRight, Boxes, Copy } from "lucide-react";

import { getByTier } from "@/registry/registry";
import { Button } from "@/registry/ui/button";
import { Badge } from "@/registry/ui/badge";
import { Switch } from "@/registry/ui/switch";
import { SpotlightCard } from "@/registry/ui/spotlight-card";
import { ShimmerButton } from "@/registry/ui/shimmer-button";
import { ComponentCard } from "@/components/site/component-card";
import { BlockCard } from "@/components/site/block-card";
import { TemplateCard } from "@/components/site/template-card";
import { CodeBlock } from "@/components/site/code-block";
import { SectionHeading } from "@/components/site/section-heading";
import { InstallCommand } from "@/components/site/install-command";

export default function HomePage() {
  const components = getByTier("component");
  const blocks = getByTier("block");
  const templates = getByTier("template");
  const featured = components.filter((e) => e.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="reveal flex items-center gap-2.5 font-mono text-xs tracking-tight text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-500" />
          </span>
          <span className="uppercase">Open source</span>
          <span className="text-foreground/30">/</span>
          <span>MIT</span>
          <span className="text-foreground/30">/</span>
          <span>Tailwind v4</span>
        </div>

        <h1 className="reveal mt-6 max-w-[14ch] text-5xl font-extrabold leading-[0.95] tracking-tighter text-balance sm:text-7xl lg:text-8xl">
          UI worth <span className="text-muted">copying.</span>
        </h1>

        <p className="reveal mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          Accessible, beautifully-crafted React components, blocks, and
          templates. Copy the source or install with the shadcn CLI — the code
          lands in your repo,{" "}
          <span className="text-foreground">fully yours to edit.</span>
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/components">
              Browse components <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#install">How it works</a>
          </Button>
        </div>

        <div className="reveal mt-8 max-w-md">
          <InstallCommand command="npx shadcn@latest add ui.saumyarex.xyz/r/spotlight-card.json" />
          <p className="mt-2.5 font-mono text-xs text-muted">
            {components.length} components · {blocks.length} blocks ·{" "}
            {templates.length} template{templates.length === 1 ? "" : "s"}
          </p>
        </div>
      </section>

      {/* ── Live performance band (inverted, depth rhythm) ──────── */}
      <section className="reveal pb-16 sm:pb-24">
        <SpotlightCard
          radius={520}
          className="theme-invert grain rounded-3xl border-transparent p-8 sm:p-12"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-tight text-muted">
                Everything&apos;s live
              </span>
              <span className="font-mono text-xs text-muted">
                hover · toggle · click
              </span>
            </div>

            <p className="mt-5 max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Not screenshots. Real components, running right here.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShimmerButton>Shimmer</ShimmerButton>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Badge variant="outline">Radix</Badge>
              <Badge variant="soft">TypeScript</Badge>
            </div>

            <div className="mt-6 flex max-w-sm items-center justify-between rounded-base border border-border bg-surface/50 px-4 py-3">
              <span className="text-sm font-medium">Enable notifications</span>
              <Switch defaultChecked />
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <SectionHeading
          index="01"
          eyebrow="Featured"
          title="Hand-picked to start with"
          lede="The components most people reach for first — fully accessible, dependency-light."
          link={{ href: "/components", label: "All components" }}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <div key={entry.name} className="reveal">
              <ComponentCard entry={entry} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Blocks ───────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <SectionHeading
          index="02"
          eyebrow="Blocks"
          title="Whole sections, ready to drop in"
          lede="Install one and its component dependencies come with it."
          link={{ href: "/blocks", label: "All blocks" }}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blocks.slice(0, 4).map((entry) => (
            <div key={entry.name} className="reveal">
              <BlockCard entry={entry} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Templates ────────────────────────────────────────── */}
      {templates.length > 0 && (
        <section className="py-12 sm:py-16">
          <SectionHeading
            index="03"
            eyebrow="Templates"
            title="Full pages, assembled"
            lede="Production-ready pages built from the blocks — install everything at once."
            link={{ href: "/templates", label: "All templates" }}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {templates.map((entry) => (
              <div key={entry.name} className="reveal">
                <TemplateCard entry={entry} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Install ──────────────────────────────────────────── */}
      <section id="install" className="scroll-mt-20 py-16 sm:py-24">
        <SectionHeading
          index="04"
          eyebrow="How it works"
          title="No lock-in. The code becomes yours."
          lede="Run the theme once, then add any component, block, or template — by CLI or copy-paste."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="reveal rounded-base border border-border bg-surface p-6">
            <Boxes className="size-5" />
            <h3 className="mt-4 font-semibold tracking-tight">
              Install with the CLI
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              One command drops the component and its dependencies into your
              project via the shadcn registry.
            </p>
          </div>
          <div className="reveal rounded-base border border-border bg-surface p-6">
            <Copy className="size-5" />
            <h3 className="mt-4 font-semibold tracking-tight">
              Or just copy-paste
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              Every component page shows the full, dependency-light source with
              a one-click copy button.
            </p>
          </div>
        </div>

        <div className="reveal mt-5">
          <CodeBlock
            lang="bash"
            fileName="Terminal"
            code={`# 1. one-time: install the theme tokens\nnpx shadcn@latest add https://ui.saumyarex.xyz/r/theme.json\n\n# 2. add anything — components, blocks, or a whole template\nnpx shadcn@latest add https://ui.saumyarex.xyz/r/spotlight-card.json`}
          />
        </div>
      </section>
    </div>
  );
}
