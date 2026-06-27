/**
 * Single source of truth for every published component.
 *
 * Each entry drives three things from one definition:
 *   1. the docs page (preview + metadata)
 *   2. the copy-paste code block (source files read from disk)
 *   3. the shadcn-compatible install JSON served at /r/<name>.json
 *
 * Keep this file free of React / Node imports so it can be read anywhere.
 */

export type RegistryFileType = "registry:ui" | "registry:lib" | "registry:block";

/** The three tiers of the library, in increasing order of value/effort. */
export type Tier = "component" | "block" | "template";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface RegistryFile {
  /** Path to the source file, relative to the project root. */
  source: string;
  /** Where the shadcn CLI should write it in the consumer's project. */
  target: string;
  type: RegistryFileType;
}

export interface RegistryEntry {
  /** URL slug + shadcn item name. */
  name: string;
  title: string;
  description: string;
  category: string;
  /** Which tier this belongs to. Defaults to "component" when omitted. */
  tier?: Tier;
  /** npm packages the consumer must install. */
  dependencies: string[];
  /** Other registry items this one depends on (by name). */
  registryDependencies: string[];
  files: RegistryFile[];
  /** Optional raw CSS shipped with the item (e.g. @keyframes / custom utilities). */
  css?: string;
  /** Props reference, rendered as a table on the docs page. */
  props?: PropDef[];
  /** ISO date, used for sorting "new" badges. */
  date: string;
  featured?: boolean;
}

/** The `cn` helper every component imports — bundled so installs are self-contained. */
const UTILS_FILE: RegistryFile = {
  source: "src/lib/utils.ts",
  target: "lib/utils.ts",
  type: "registry:lib",
};

export const registry: RegistryEntry[] = [
  {
    name: "button",
    title: "Button",
    description:
      "A polymorphic button with five variants and four sizes, built on Radix Slot so it can render as any element via `asChild`.",
    category: "Buttons",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/button.tsx", target: "components/ui/button.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "outline" | "link"',
        default: '"primary"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "icon"',
        default: '"md"',
        description: "Control the height and padding.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Merge props onto the child element (e.g. a Next <Link>) instead of rendering a <button>.",
      },
      {
        name: "...props",
        type: "React.ComponentProps<\"button\">",
        description: "All native button attributes are forwarded.",
      },
    ],
    date: "2026-06-27",
    featured: true,
  },
  {
    name: "spotlight-card",
    title: "Spotlight Card",
    description:
      "A surface that reveals a soft radial spotlight tracking the cursor. Pure CSS variables — zero re-renders per mouse move, no animation library.",
    category: "Cards",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/spotlight-card.tsx", target: "components/ui/spotlight-card.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "radius",
        type: "number",
        default: "350",
        description: "Spotlight radius in pixels.",
      },
      {
        name: "color",
        type: "string",
        default: "emerald accent",
        description: "Any CSS color for the spotlight glow.",
      },
      {
        name: "...props",
        type: "React.ComponentProps<\"div\">",
        description: "All native div attributes are forwarded.",
      },
    ],
    date: "2026-06-27",
    featured: true,
  },
  {
    name: "dialog",
    title: "Dialog",
    description:
      "An accessible modal dialog on Radix primitives — focus trap, scroll lock, escape-to-close, and animated enter/exit out of the box.",
    category: "Overlays",
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "clsx", "tailwind-merge", "tw-animate-css"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/dialog.tsx", target: "components/ui/dialog.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "Dialog / DialogTrigger / DialogClose",
        type: "Radix primitives",
        description: "Root, trigger, and close. Re-exported from @radix-ui/react-dialog.",
      },
      {
        name: "DialogContent",
        type: "React.ComponentProps<typeof Dialog.Content>",
        description: "The animated panel — includes overlay, close button, focus trap, scroll lock.",
      },
      {
        name: "DialogHeader / Footer / Title / Description",
        type: "layout + a11y slots",
        description: "Composable building blocks; Title/Description wire up aria attributes.",
      },
    ],
    date: "2026-06-27",
    featured: false,
  },
  {
    name: "shimmer-button",
    title: "Shimmer Button",
    description:
      "A primary button with a light sheen that sweeps across on hover. Self-contained — the effect is a CSS pseudo-element, no keyframes or dependencies.",
    category: "Buttons",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/shimmer-button.tsx", target: "components/ui/shimmer-button.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "...props",
        type: "React.ComponentProps<\"button\">",
        description: "All native button attributes are forwarded; children render above the sheen.",
      },
    ],
    date: "2026-06-27",
    featured: true,
  },
  {
    name: "badge",
    title: "Badge",
    description:
      "A compact status label with solid, soft, outline, and accent variants. Drops an icon in cleanly.",
    category: "Data Display",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/badge.tsx", target: "components/ui/badge.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "variant",
        type: '"solid" | "soft" | "outline" | "accent"',
        default: '"soft"',
        description: "Visual style of the badge.",
      },
      {
        name: "...props",
        type: "React.ComponentProps<\"span\">",
        description: "All native span attributes are forwarded.",
      },
    ],
    date: "2026-06-27",
    featured: false,
  },
  {
    name: "switch",
    title: "Switch",
    description:
      "An accessible on/off toggle built on Radix Switch — keyboard operable, with a smooth animated thumb.",
    category: "Forms",
    dependencies: ["@radix-ui/react-switch", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "src/registry/ui/switch.tsx", target: "components/ui/switch.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    props: [
      {
        name: "checked / defaultChecked",
        type: "boolean",
        description: "Controlled / uncontrolled checked state (Radix Switch).",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Fires when the state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Prevents interaction.",
      },
    ],
    date: "2026-06-27",
    featured: false,
  },

  /* ----------------------------- Blocks ----------------------------- */
  {
    name: "hero-centered",
    title: "Centered Hero",
    description:
      "A centered marketing hero with a badge, headline, subtext, and dual CTAs over a masked dotted grid. Drops onto any landing page.",
    category: "Marketing",
    tier: "block",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [
      {
        source: "src/registry/blocks/hero-centered.tsx",
        target: "components/blocks/hero-centered.tsx",
        type: "registry:block",
      },
    ],
    date: "2026-06-27",
  },
  {
    name: "pricing-three-tier",
    title: "Three-Tier Pricing",
    description:
      "A responsive three-column pricing section with a highlighted 'most popular' plan, feature checklists, and per-tier CTAs.",
    category: "Marketing",
    tier: "block",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    registryDependencies: ["button", "badge"],
    files: [
      {
        source: "src/registry/blocks/pricing-three-tier.tsx",
        target: "components/blocks/pricing-three-tier.tsx",
        type: "registry:block",
      },
      UTILS_FILE,
    ],
    date: "2026-06-27",
  },
  {
    name: "cta-banner",
    title: "CTA Banner",
    description:
      "A high-contrast call-to-action band on an inverted surface with a soft halo and two actions. The closer for any landing page.",
    category: "Marketing",
    tier: "block",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        source: "src/registry/blocks/cta-banner.tsx",
        target: "components/blocks/cta-banner.tsx",
        type: "registry:block",
      },
    ],
    date: "2026-06-27",
  },
];

/** Tier of an entry, defaulting to "component". */
export function tierOf(entry: RegistryEntry): Tier {
  return entry.tier ?? "component";
}

const TIER_SEGMENT: Record<Tier, string> = {
  component: "components",
  block: "blocks",
  template: "templates",
};

/** The docs URL for an entry, routed by its tier. */
export function hrefFor(entry: RegistryEntry): string {
  return `/${TIER_SEGMENT[tierOf(entry)]}/${entry.name}`;
}

export function getEntry(name: string): RegistryEntry | undefined {
  return registry.find((e) => e.name === name);
}

/** All entries in a tier. */
export function getByTier(tier: Tier): RegistryEntry[] {
  return registry.filter((e) => tierOf(e) === tier);
}

/** An entry by name, but only if it belongs to the given tier (for scoped routes). */
export function getEntryInTier(name: string, tier: Tier): RegistryEntry | undefined {
  const entry = getEntry(name);
  return entry && tierOf(entry) === tier ? entry : undefined;
}

/** Distinct categories, optionally scoped to one tier. */
export function getCategories(tier?: Tier): string[] {
  const pool = tier ? getByTier(tier) : registry;
  return [...new Set(pool.map((e) => e.category))].sort();
}
