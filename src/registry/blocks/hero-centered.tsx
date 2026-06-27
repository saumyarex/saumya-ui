import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroCentered() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Badge variant="soft" className="mb-5">
          v1.0 is now available
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Ship your product{" "}
          <span className="text-muted">faster than ever</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted">
          The all-in-one platform that helps teams design, build, and launch —
          without the busywork. Start free, scale when you&apos;re ready.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            Start building <ArrowRight />
          </Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          No credit card required · Free 14-day trial
        </p>
      </div>
    </section>
  );
}
