import { type Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { previewTransitionName } from "@/lib/utils";
import { getByTier, getEntryInTier, getAuthor } from "@/registry/registry";
import { registryUrl } from "@/lib/site";
import { readPrimarySource, readEntrySources, getDoc } from "@/lib/registry-source";
import { CodeBlock } from "@/components/site/code-block";
import { BlockPreview } from "@/components/site/block-preview";
import { Tabbed } from "@/components/site/tabbed";
import { Mdx } from "@/components/site/mdx";
import { AuthorByline } from "@/components/site/author-byline";

export function generateStaticParams() {
  return getByTier("block").map((entry) => ({ slug: entry.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "block");
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "block");
  if (!entry) notFound();

  const primarySource = readPrimarySource(entry);
  const sources = readEntrySources(entry);
  const installUrl = registryUrl(entry.name);
  const doc = getDoc(entry.name);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/blocks"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All blocks
      </Link>

      <header className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{entry.title}</h1>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
            {entry.category}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-pretty text-muted">{entry.description}</p>
        <AuthorByline author={getAuthor(entry)} className="mt-4" />
      </header>

      {/* Preview / Code */}
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

      {doc && (
        <section className="mt-12">
          <Mdx source={doc} />
        </section>
      )}

      {/* Installation */}
      <section className="mt-14">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Installation</h2>
        <Tabbed
          tabs={[
            {
              value: "cli",
              label: "CLI",
              content: (
                <div className="space-y-2">
                  <CodeBlock
                    lang="bash"
                    fileName="Terminal"
                    code={`npx shadcn@latest add ${installUrl}`}
                  />
                  <p className="text-sm text-muted">
                    Installs the block and its component dependencies
                    {entry.registryDependencies.length > 0
                      ? ` (${entry.registryDependencies.join(", ")})`
                      : ""}{" "}
                    in one step.
                  </p>
                </div>
              ),
            },
            {
              value: "manual",
              label: "Manual",
              content: (
                <div className="space-y-6">
                  {entry.registryDependencies.length > 0 && (
                    <p className="text-sm text-muted">
                      This block uses the{" "}
                      {entry.registryDependencies.map((dep, i) => (
                        <span key={dep}>
                          {i > 0 && ", "}
                          <Link
                            href={`/components/${dep}`}
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                          >
                            {dep}
                          </Link>
                        </span>
                      ))}{" "}
                      component{entry.registryDependencies.length > 1 ? "s" : ""} — add{" "}
                      {entry.registryDependencies.length > 1 ? "them" : "it"} first.
                    </p>
                  )}
                  {entry.dependencies.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm text-muted">Install dependencies</p>
                      <CodeBlock
                        lang="bash"
                        fileName="Terminal"
                        code={`npm install ${entry.dependencies.join(" ")}`}
                      />
                    </div>
                  )}
                  <div>
                    <p className="mb-2 text-sm text-muted">Copy the source</p>
                    <div className="space-y-4">
                      {sources.map((file) => (
                        <CodeBlock
                          key={file.target}
                          code={file.content}
                          lang={file.lang === "css" ? "css" : "tsx"}
                          fileName={file.target}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>
    </article>
  );
}
