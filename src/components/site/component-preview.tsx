import { cn } from "@/lib/utils";

/** A neutral, grid-backed canvas that centers a live component demo. */
export function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-h-[360px] place-items-center overflow-hidden rounded-base border border-border bg-surface bg-grid p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
