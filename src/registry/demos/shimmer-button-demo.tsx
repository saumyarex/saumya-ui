"use client";

import { Sparkles } from "lucide-react";

import { ShimmerButton } from "@/registry/ui/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <ShimmerButton>
      <Sparkles /> Hover me
    </ShimmerButton>
  );
}
