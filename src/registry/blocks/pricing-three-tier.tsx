import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Everything you need to get going.",
    features: ["1 project", "Community support", "1 GB storage", "Basic analytics"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For growing teams that ship often.",
    features: [
      "Unlimited projects",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
      "Custom domains",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Security and scale for large orgs.",
    features: ["SSO & SAML", "Dedicated support", "Unlimited storage", "Audit logs", "SLA"],
    cta: "Contact sales",
    featured: false,
  },
];

export function PricingThreeTier() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-muted">
          Start free. Upgrade when you grow. Cancel anytime.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col rounded-2xl border p-7",
              tier.featured
                ? "border-foreground/20 bg-surface shadow-lg ring-1 ring-foreground/10"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              {tier.featured && <Badge variant="solid">Most popular</Badge>}
            </div>
            <p className="mt-2 text-sm text-muted">{tier.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
              <span className="text-muted">{tier.period}</span>
            </div>
            <Button
              variant={tier.featured ? "primary" : "outline"}
              className="mt-6 w-full"
            >
              {tier.cta}
            </Button>
            <ul className="mt-7 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <Check className="size-4 shrink-0 text-foreground" />
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
