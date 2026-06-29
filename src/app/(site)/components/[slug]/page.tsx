import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getByTier, getEntryInTier, getAuthor } from "@/registry/registry";
import { registryUrl } from "@/lib/site";
import { readPrimarySource, readEntrySources, getDoc } from "@/lib/registry-source";
import { demos } from "@/registry/demos";
import { CodeBlock } from "@/components/site/code-block";
import { ComponentPreview } from "@/components/site/component-preview";
import { Tabbed } from "@/components/site/tabbed";
import { Mdx } from "@/components/site/mdx";
import { PropsTable } from "@/components/site/props-table";
import { AuthorByline } from "@/components/site/author-byline";

export function generateStaticParams() {
  return getByTier("component").map((entry) => ({ slug: entry.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "component");
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "component");
  if (!entry) notFound();

  const Demo = demos[entry.name];
  const primarySource = readPrimarySource(entry);
  const sources = readEntrySources(entry);
  const installUrl = registryUrl(entry.name);
  const doc = getDoc(entry.name);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/components"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All components
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
            content: <ComponentPreview>{Demo ? <Demo /> : null}</ComponentPreview>,
          },
          {
            value: "code",
            label: "Code",
            content: (
              <CodeBlock
                code={primarySource}
                fileName={entry.files[0].target}
              />
            ),
          },
        ]}
      />

      {/* Long-form docs */}
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
                <CodeBlock
                  lang="bash"
                  fileName="Terminal"
                  code={`npx shadcn@latest add ${installUrl}`}
                />
              ),
            },
            {
              value: "manual",
              label: "Manual",
              content: (
                <div className="space-y-6">
                  {entry.dependencies.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm text-muted">
                        1. Install dependencies
                      </p>
                      <CodeBlock
                        lang="bash"
                        fileName="Terminal"
                        code={`npm install ${entry.dependencies.join(" ")}`}
                      />
                    </div>
                  )}
                  <div>
                    <p className="mb-2 text-sm text-muted">
                      {entry.dependencies.length > 0 ? "2." : "1."} Copy the source
                      into your project
                    </p>
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

      {/* API reference */}
      {entry.props && entry.props.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Props</h2>
          <PropsTable props={entry.props} />
        </section>
      )}

      {/* Dependencies */}
      {entry.dependencies.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Dependencies</h2>
          <div className="flex flex-wrap gap-2">
            {entry.dependencies.map((dep) => (
              <span
                key={dep}
                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
              >
                {dep}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
