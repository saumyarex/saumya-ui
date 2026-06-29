import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Top-of-page hero header — the larger sibling of SectionHeading. Mono
 * eyebrow, oversized tight title, muted lede. Used on the listing pages so
 * they share the homepage's editorial voice.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-border pb-10">
      <div className="reveal flex items-center gap-2.5 font-mono text-xs uppercase tracking-tight text-muted">
        <span className="h-px w-6 bg-current opacity-30" />
        {eyebrow}
      </div>
      <h1 className="reveal mt-5 max-w-[16ch] text-5xl font-extrabold leading-[0.95] tracking-tighter text-balance sm:text-6xl">
        {title}
      </h1>
      {lede && (
        <p className="reveal mt-5 max-w-2xl text-pretty text-lg text-muted">
          {lede}
        </p>
      )}
      {children && <div className="reveal mt-7">{children}</div>}
    </header>
  );
}

/**
 * Editorial section header used across the site: a mono eyebrow with an
 * index tick (the recurring technical motif), a tight display title, an
 * optional lede, and an optional trailing link. Animates in on scroll.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  link,
  className,
}: {
  /** Zero-padded section index, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-2.5 font-mono text-xs tracking-tight text-muted">
          {index && (
            <span className="tabular-nums text-foreground/40">{index}</span>
          )}
          <span className="h-px w-6 bg-current opacity-30" />
          <span className="uppercase">{eyebrow}</span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {lede && (
          <p className="mt-3 text-pretty text-base text-muted">{lede}</p>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-foreground"
        >
          {link.label}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}

/** Compact mono category label with an index tick and count. */
export function CategoryLabel({
  index,
  label,
  count,
}: {
  index: string;
  label: string;
  count?: number;
}) {
  return (
    <div className="reveal flex items-center gap-3 font-mono text-xs tracking-tight text-muted">
      <span className="tabular-nums text-foreground/40">{index}</span>
      <span className="uppercase text-foreground">{label}</span>
      <span className="h-px flex-1 bg-current opacity-15" />
      {count != null && <span className="tabular-nums">{count}</span>}
    </div>
  );
}
