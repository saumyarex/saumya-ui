import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* soft halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-background/20 blur-3xl"
        />
        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-background sm:text-4xl">
            Ready to build something great?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-background/70">
            Join thousands of teams shipping faster with our platform. Get started
            in minutes — no credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-background text-foreground hover:opacity-90"
            >
              Get started free <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-background hover:bg-background/10"
            >
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
