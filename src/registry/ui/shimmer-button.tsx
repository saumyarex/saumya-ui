"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type ShimmerButtonProps = React.ComponentProps<"button">;

/**
 * A primary button with a light sheen that sweeps across on hover.
 * Self-contained: the effect is a `::before` pseudo-element, no keyframes.
 */
export function ShimmerButton({ className, children, ...props }: ShimmerButtonProps) {
  return (
    <button
      data-slot="shimmer-button"
      className={cn(
        "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-base bg-accent px-6 text-sm font-medium text-accent-fg shadow-sm outline-none transition-[transform,box-shadow] duration-150",
        "hover:shadow-md active:translate-y-px",
        "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
