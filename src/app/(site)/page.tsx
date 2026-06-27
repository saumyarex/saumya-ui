import Link from "next/link";
import { ArrowRight, Boxes, Check, Copy, Sparkles } from "lucide-react";

import { getByTier } from "@/registry/registry";
import { Button } from "@/registry/ui/button";
import { Badge } from "@/registry/ui/badge";
import { Switch } from "@/registry/ui/switch";
import { SpotlightCard } from "@/registry/ui/spotlight-card";
import { ShimmerButton } from "@/registry/ui/shimmer-button";
import { ComponentCard } from "@/components/site/component-card";
import { BlockCard } from "@/components/site/block-card";
import { CodeBlock } from "@/components/site/code-block";

export default function HomePage() {
  const components = getByTier("component");
  const blocks = getByTier("block");
  const featured = components.filter((e) => e.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="bg-grid relative -mx-4 px-4 py-16 sm:-mx-6 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <Sparkles className="size-3.5 text-accent" />
              Open-source UI library
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              UI worth <span className="text-muted">copying</span>.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base text-muted sm:text-lg">
              Accessible, beautifully-crafted React components, blocks, and
              templates. Copy-paste the source, or install with the shadcn CLI —
              the code lands in your repo, fully yours to edit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/components">
                  Browse components <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#install">How it works</a>
              </Button>
            </div>
          </div>

          {/* Live showcase — real components, interactive */}
          <SpotlightCard radius={420} className="p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <Badge variant="accent">
                <Check /> Live preview
              </Badge>
              <span className="font-mono text-xs text-muted">
                {components.length} components · {blocks.length} blocks
              </span>
            </div>

            <p className="mt-6 text-sm text-muted">Hover anywhere on this card →</p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ShimmerButton>
                <Sparkles /> Shimmer
              </ShimmerButton>
              <Button variant="secondary">Secondary</Button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-base border border-border bg-background/40 px-4 py-3">
              <span className="text-sm font-medium">Enable notifications</span>
              <Switch defaultChecked />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="solid">Radix</Badge>
              <Badge variant="soft">Tailwind v4</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Featured */}
      <section className="py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
            <p className="mt-1 text-sm text-muted">Hand-picked components to start with.</p>
          </div>
          <Link
            href="/components"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <ComponentCard key={entry.name} entry={entry} />
          ))}
        </div>
      </section>

      {/* Blocks */}
      <section className="py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Blocks</h2>
            <p className="mt-1 text-sm text-muted">
              Full sections — install one and its components come with it.
            </p>
          </div>
          <Link
            href="/blocks"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {blocks.map((entry) => (
            <BlockCard key={entry.name} entry={entry} />
          ))}
        </div>
      </section>

      {/* Install */}
      <section id="install" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Two ways to use it</h2>
          <p className="mt-2 text-muted">No lock-in. The code becomes yours.</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-base border border-border bg-surface p-5">
            <Boxes className="size-5 text-accent" />
            <h3 className="mt-3 font-medium">Install with the CLI</h3>
            <p className="mt-1 text-sm text-muted">
              One command drops the component and its dependencies into your
              project via the shadcn registry.
            </p>
          </div>
          <div className="rounded-base border border-border bg-surface p-5">
            <Copy className="size-5 text-accent" />
            <h3 className="mt-3 font-medium">Or just copy-paste</h3>
            <p className="mt-1 text-sm text-muted">
              Every component page shows the full, dependency-light source with a
              one-click copy button.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          <CodeBlock
            lang="bash"
            fileName="Terminal"
            code="npx shadcn@latest add https://labs.saumyarex.xyz/r/spotlight-card.json"
          />
        </div>
      </section>
    </div>
  );
}
