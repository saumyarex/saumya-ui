import { type BundledLanguage } from "shiki";

import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/site/copy-button";

interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
  /** Optional filename shown in the header bar. */
  fileName?: string;
  /** Hide the header + copy button (e.g. for a compact inline command). */
  bare?: boolean;
  className?: string;
}

/** Server component: syntax-highlights `code` and renders it with a copy button. */
export async function CodeBlock({
  code,
  lang = "tsx",
  fileName,
  bare = false,
  className,
}: CodeBlockProps) {
  const html = await highlight(code, lang);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-base border border-border bg-surface",
        className,
      )}
    >
      {!bare && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted">{fileName ?? lang}</span>
          <CopyButton value={code} />
        </div>
      )}
      <div
        className="max-h-[480px] overflow-auto p-4 text-[13px] leading-relaxed [&_pre]:bg-transparent! [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
