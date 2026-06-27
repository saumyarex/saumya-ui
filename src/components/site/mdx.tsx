import * as React from "react";
import { compileMDX } from "next-mdx-remote/rsc";

import { cn } from "@/lib/utils";

/** Styled element map so MDX prose matches the site's design language. */
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 mb-3 text-xl font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-2 text-base font-semibold text-foreground" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 leading-relaxed text-muted" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mb-4 list-disc space-y-1.5 pl-5 text-muted marker:text-border" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-muted marker:text-border" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="font-medium text-accent underline-offset-4 hover:underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 rounded-r-base border-l-2 border-accent bg-accent/5 py-2 pl-4 text-sm text-muted [&>p]:mb-0"
      {...props}
    />
  ),
};

/** Server component that compiles + renders an MDX string with site styling. */
export async function Mdx({ source, className }: { source: string; className?: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: false },
  });
  return <div className={cn("text-sm", className)}>{content}</div>;
}
