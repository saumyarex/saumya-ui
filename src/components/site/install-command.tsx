"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The install command rendered as a tactile, copyable artifact — the
 * recurring "the code lands in your repo" gesture. Mono throughout, with a
 * blinking-prompt feel via the leading `$`.
 */
export function InstallCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className={cn(
        "group flex w-full items-center gap-3 rounded-base border border-border bg-surface px-4 py-3 text-left font-mono text-sm transition-colors hover:border-foreground/30",
        className,
      )}
    >
      <span className="select-none text-muted">$</span>
      <code className="min-w-0 flex-1 truncate text-foreground">{command}</code>
      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors group-hover:text-foreground">
        {copied ? (
          <Check className="size-4 text-accent" />
        ) : (
          <Copy className="size-4" />
        )}
      </span>
    </button>
  );
}
