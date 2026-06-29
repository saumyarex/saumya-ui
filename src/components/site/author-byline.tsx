import { type Author } from "@/registry/registry";
import { cn } from "@/lib/utils";

/**
 * "by <author>" credit shown on each item's docs page. Links to whatever the
 * contributor chose (X, site, GitHub). Strictly monochrome.
 */
export function AuthorByline({
  author,
  className,
}: {
  author: Author;
  className?: string;
}) {
  const initial = author.name.charAt(0).toUpperCase();

  const identity = (
    <span className="inline-flex items-center gap-1.5">
      {author.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatars are arbitrary external URLs
        <img
          src={author.avatar}
          alt=""
          className="size-5 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-5 items-center justify-center rounded-full bg-surface-2 text-[10px] font-medium text-muted"
        >
          {initial}
        </span>
      )}
      <span>{author.name}</span>
    </span>
  );

  return (
    <div className={cn("flex items-center gap-1.5 text-sm text-muted", className)}>
      <span>by</span>
      {author.url ? (
        <a
          href={author.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {identity}
        </a>
      ) : (
        <span className="font-medium text-foreground">{identity}</span>
      )}
    </div>
  );
}
