import { type Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { getByTier, getEntryInTier, getEntry, getAuthor } from "@/registry/registry";
import { registryUrl } from "@/lib/site";
import { readPrimarySource } from "@/lib/registry-source";
import { CodeBlock } from "@/components/site/code-block";
import { BlockPreview } from "@/components/site/block-preview";
import { Tabbed } from "@/components/site/tabbed";
import { AuthorByline } from "@/components/site/author-byline";
import { cn, previewTransitionName } from "@/lib/utils";

export function generateStaticParams() {
  return getByTier("template").map((entry) => ({ slug: entry.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "template");
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "template");
  if (!entry) notFound();

  const primarySource = readPrimarySource(entry);
  const installUrl = registryUrl(entry.name);
  const includedBlocks = entry.registryDependencies
    .map((name) => getEntry(name))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/templates"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All templates
      </Link>

      <header className="mt-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{entry.title}</h1>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              entry.pro ? "bg-accent text-accent-fg" : "border border-border text-muted",
            )}
          >
            {entry.pro ? "Pro" : "Free"}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-pretty text-muted">{entry.description}</p>
        <AuthorByline author={getAuthor(entry)} className="mt-4" />
      </header>

      <Tabbed
        tabs={[
          {
            value: "preview",
            label: "Preview",
            content: (
              <ViewTransition name={previewTransitionName(entry.name)} share="morph">
                <BlockPreview name={entry.name} title={entry.title} />
              </ViewTransition>
            ),
          },
          {
            value: "code",
            label: "Code",
            content: (
              <CodeBlock code={primarySource} fileName={entry.files[0].target} />
            ),
          },
        ]}
      />

      {/* Installation */}
      <section className="mt-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock
          lang="bash"
          fileName="Terminal"
          code={`npx shadcn@latest add ${installUrl}`}
        />
        <p className="mt-2 text-sm text-muted">
          One command installs the page plus every block and component it uses.
        </p>
      </section>

      {/* What's included */}
      {includedBlocks.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            What&apos;s included
          </h2>
          <p className="mb-4 text-sm text-muted">
            {includedBlocks.length} blocks, composed top to bottom. Each is its own
            installable piece you can reorder or swap.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {includedBlocks.map((block) => (
              <li key={block.name}>
                <Link
                  href={`/blocks/${block.name}`}
                  className="flex items-center gap-2.5 rounded-base border border-border bg-surface px-4 py-2.5 text-sm transition-colors hover:bg-surface-2"
                >
                  <Check className="size-4 shrink-0 text-foreground" />
                  <span className="font-medium">{block.title}</span>
                  <span className="ml-auto text-xs text-muted">{block.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
