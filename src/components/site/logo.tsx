import { cn } from "@/lib/utils";

/**
 * Saumya UI brand — rooted in the personal-site logotype `<Saumya/>`.
 *
 * `Wordmark` is the primary lockup: the product expressed as a self-closing
 * JSX tag, `<Saumya ui />`, set in the mono typeface so the brackets read as
 * real code. `Logo` is the compact derivative — the tag's signature slash in a
 * chip — for favicons, avatars and other tight spaces.
 *
 * Strictly monochrome: both use currentColor / theme tokens, no accent.
 */

/** Compact mark — the self-closing-tag slash in a rounded chip. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* chip */}
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* the "/" of a self-closing tag */}
      <path
        d="M19 10 L13 22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Primary lockup — `<Saumya ui />` as a self-closing JSX tag. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mono font-semibold tracking-tight whitespace-nowrap",
        className,
      )}
      aria-label="Saumya UI"
    >
      <span className="text-muted">&lt;</span>
      <span className="text-foreground">Saumya</span>
      <span className="text-muted">&nbsp;ui&nbsp;</span>
      <span className="text-muted">/&gt;</span>
    </span>
  );
}
