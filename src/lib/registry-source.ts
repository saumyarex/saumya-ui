import { type RegistryEntry, registry, tierOf, type Tier } from "@/registry/registry";
import { SITE, registryUrl } from "@/lib/site";
import sources from "@/registry/__generated__/sources.json";

const sourceMap = sources as Record<string, string>;

/** shadcn item type for each tier. */
const ITEM_TYPE: Record<Tier, string> = {
  component: "registry:ui",
  block: "registry:block",
  template: "registry:block",
};

/**
 * Theme tokens every shipped component relies on. Attached to each registry
 * item so `npx shadcn add` writes them into the consumer's globals.css — the
 * components then render correctly out of the box, light or dark.
 */
const BASE_CSS_VARS = {
  theme: {
    "--radius-base": "0.65rem",
    "--color-background": "var(--background)",
    "--color-surface": "var(--surface)",
    "--color-surface-2": "var(--surface-2)",
    "--color-foreground": "var(--foreground)",
    "--color-muted": "var(--muted)",
    "--color-border": "var(--border)",
    "--color-accent": "var(--accent)",
    "--color-accent-fg": "var(--accent-fg)",
  },
  light: {
    "--background": "#fafafa",
    "--surface": "#ffffff",
    "--surface-2": "#f4f4f5",
    "--foreground": "#09090b",
    "--muted": "#71717a",
    "--border": "#e4e4e7",
    "--accent": "#09090b",
    "--accent-fg": "#fafafa",
  },
  dark: {
    "--background": "#09090b",
    "--surface": "#18181b",
    "--surface-2": "#27272a",
    "--foreground": "#fafafa",
    "--muted": "#a1a1aa",
    "--border": "#27272a",
    "--accent": "#fafafa",
    "--accent-fg": "#09090b",
  },
} as const;

function read(sourcePath: string): string {
  const content = sourceMap[sourcePath];
  if (content === undefined) {
    throw new Error(
      `Missing source for "${sourcePath}". Run \`node scripts/build-registry.mjs\` (it runs automatically on dev/build).`,
    );
  }
  return content;
}

/** Read the raw source of every file in an entry, in declared order. */
export function readEntrySources(
  entry: RegistryEntry,
): { source: string; target: string; content: string; lang: string }[] {
  return entry.files.map((file) => ({
    source: file.source,
    target: file.target,
    content: read(file.source),
    lang: file.source.endsWith(".css") ? "css" : "tsx",
  }));
}

/** The primary source file (the component/block itself, not the lib helper). */
export function readPrimarySource(entry: RegistryEntry): string {
  const primary = entry.files.find((f) => f.type !== "registry:lib") ?? entry.files[0];
  return read(primary.source);
}

/** The long-form MDX doc for a component, if one exists. */
export function getDoc(name: string): string | undefined {
  return sourceMap[`src/registry/docs/${name}.mdx`];
}

/**
 * The one-time theme item. Installing it once writes the design tokens and the
 * dotted-grid utility into the consumer's globals.css, so every component, block,
 * and template renders correctly without each item re-shipping the tokens.
 */
export function buildThemeItem() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "theme",
    type: "registry:theme",
    title: "Saumya UI theme",
    description:
      "Monochrome design tokens (ink accent, surfaces, radius) plus the dotted-grid utility. Install once; everything else builds on it.",
    cssVars: BASE_CSS_VARS,
    css: {
      ".bg-grid": {
        "background-image":
          "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--foreground) 9%, transparent) 1px, transparent 0)",
        "background-size": "24px 24px",
      },
    },
  };
}

/**
 * Build the registry index — a discoverable listing of every item, with the
 * install URL for each. Served at /registry.json. See
 * https://ui.shadcn.com/schema/registry.json
 */
export function buildRegistryIndex() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "saumya-labs",
    homepage: SITE.url,
    items: registry.map((entry) => ({
      name: entry.name,
      type: ITEM_TYPE[tierOf(entry)],
      title: entry.title,
      description: entry.description,
      categories: [entry.category],
      dependencies: entry.dependencies,
      registryDependencies: entry.registryDependencies,
      files: entry.files.map((f) => ({
        path: f.source,
        type: f.type,
        target: f.target,
      })),
      url: registryUrl(entry.name),
    })),
  };
}

/**
 * Build a shadcn-compatible registry-item object that `npx shadcn add <url>`
 * can consume directly. See https://ui.shadcn.com/schema/registry-item.json
 */
export function buildRegistryItem(entry: RegistryEntry) {
  // A block can depend on our own components (e.g. "button"). Expand those
  // local names to full registry URLs so the shadcn CLI resolves them.
  const registryDependencies = entry.registryDependencies.map((dep) =>
    registry.some((e) => e.name === dep) ? registryUrl(dep) : dep,
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.name,
    type: ITEM_TYPE[tierOf(entry)],
    title: entry.title,
    description: entry.description,
    dependencies: entry.dependencies,
    registryDependencies,
    files: entry.files.map((file) => ({
      path: file.source,
      type: file.type,
      target: file.target,
      content: read(file.source),
    })),
    cssVars: BASE_CSS_VARS,
    ...(entry.css ? { css: entry.css } : {}),
  };
}
