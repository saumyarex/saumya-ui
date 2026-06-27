"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
  label = "Copy",
}: {
  value: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-accent" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
