import { type ComponentType } from "react";

import ButtonDemo from "./demos/button-demo";
import SpotlightCardDemo from "./demos/spotlight-card-demo";
import DialogDemo from "./demos/dialog-demo";
import BadgeDemo from "./demos/badge-demo";
import SwitchDemo from "./demos/switch-demo";
import ShimmerButtonDemo from "./demos/shimmer-button-demo";

import { HeroCentered } from "./blocks/hero-centered";
import { PricingThreeTier } from "./blocks/pricing-three-tier";
import { CtaBanner } from "./blocks/cta-banner";

/** Live preview component for each registry entry, keyed by slug. */
export const demos: Record<string, ComponentType> = {
  // Components — a focused demo per component.
  button: ButtonDemo,
  "spotlight-card": SpotlightCardDemo,
  dialog: DialogDemo,
  badge: BadgeDemo,
  switch: SwitchDemo,
  "shimmer-button": ShimmerButtonDemo,
  // Blocks — the block itself is the preview.
  "hero-centered": HeroCentered,
  "pricing-three-tier": PricingThreeTier,
  "cta-banner": CtaBanner,
};
