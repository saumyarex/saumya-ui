"use client";

import { Sparkles } from "lucide-react";

import { SpotlightCard } from "@/registry/ui/spotlight-card";

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="max-w-sm">
      <Sparkles className="mb-4 size-5 text-accent" />
      <h3 className="text-base font-semibold text-foreground">Move your cursor</h3>
      <p className="mt-1.5 text-sm text-muted">
        A soft emerald spotlight tracks the pointer across the surface — driven
        entirely by CSS variables, so it never re-renders React.
      </p>
    </SpotlightCard>
  );
}
