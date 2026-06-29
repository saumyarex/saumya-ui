import dynamic from "next/dynamic";
import { type ComponentType } from "react";

/**
 * Live preview component for each registry entry, keyed by slug.
 *
 * Each demo is lazy-loaded with next/dynamic, so a page only ships the JS for
 * the demos it actually renders — the total component count never bloats a page.
 * Component demos are default exports; blocks/templates are named exports.
 */
export const demos: Record<string, ComponentType> = {
  // Components — a focused demo per component.
  button: dynamic(() => import("./demos/button-demo")),
  "spotlight-card": dynamic(() => import("./demos/spotlight-card-demo")),
  dialog: dynamic(() => import("./demos/dialog-demo")),
  badge: dynamic(() => import("./demos/badge-demo")),
  switch: dynamic(() => import("./demos/switch-demo")),
  "shimmer-button": dynamic(() => import("./demos/shimmer-button-demo")),
  // Blocks — the block itself is the preview.
  "hero-centered": dynamic(() => import("./blocks/hero-centered").then((m) => m.HeroCentered)),
  "pricing-three-tier": dynamic(() =>
    import("./blocks/pricing-three-tier").then((m) => m.PricingThreeTier),
  ),
  "cta-banner": dynamic(() => import("./blocks/cta-banner").then((m) => m.CtaBanner)),
  navbar: dynamic(() => import("./blocks/navbar").then((m) => m.Navbar)),
  "feature-grid": dynamic(() => import("./blocks/feature-grid").then((m) => m.FeatureGrid)),
  "bento-features": dynamic(() => import("./blocks/bento-features").then((m) => m.BentoFeatures)),
  testimonials: dynamic(() => import("./blocks/testimonials").then((m) => m.Testimonials)),
  stats: dynamic(() => import("./blocks/stats").then((m) => m.Stats)),
  "logo-cloud": dynamic(() => import("./blocks/logo-cloud").then((m) => m.LogoCloud)),
  faq: dynamic(() => import("./blocks/faq").then((m) => m.Faq)),
  footer: dynamic(() => import("./blocks/footer").then((m) => m.Footer)),
  // Templates — a full page.
  "saas-landing": dynamic(() => import("./templates/saas-landing").then((m) => m.SaasLanding)),
  // @new-demo — `npm run new:*` inserts demo entries above this line
};
