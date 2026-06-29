// Scaffold a new component / block / template.
//
//   npm run new:component my-thing
//   npm run new:block     my-section
//   npm run new:template  my-page
//
// Creates the source file (+ demo for components), registers it in demos.ts,
// and inserts a starter entry in registry.ts. Then run `npm run dev`.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const [, , type, rawName] = process.argv;

const TYPES = ["component", "block", "template"];
if (!TYPES.includes(type) || !rawName) {
  console.error("Usage: npm run new:component|new:block|new:template <kebab-name>");
  process.exit(1);
}

const name = rawName.trim().toLowerCase();
if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(`Invalid name "${rawName}". Use kebab-case, e.g. "fancy-button".`);
  process.exit(1);
}

// my-thing -> MyThing / "My Thing"
const Pascal = name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const Title = name.replace(/(^|-)([a-z0-9])/g, (_, p, c) => (p ? " " : "") + c.toUpperCase());
const today = new Date().toISOString().slice(0, 10);

async function write(rel, contents) {
  const abs = path.join(ROOT, rel);
  try {
    await fs.access(abs);
    console.error(`✋ ${rel} already exists — aborting (nothing was changed).`);
    process.exit(1);
  } catch {
    /* doesn't exist — good */
  }
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, contents);
  console.log(`  created ${rel}`);
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Insert `text` on its own line(s) immediately before the marker line. */
async function insertBefore(rel, marker, text) {
  const abs = path.join(ROOT, rel);
  const src = await fs.readFile(abs, "utf8");
  const re = new RegExp(`^[ \\t]*${escapeRe(marker)}.*$`, "m");
  const match = src.match(re);
  if (!match) {
    console.error(`Could not find marker "${marker}" in ${rel}. Skipped.`);
    return;
  }
  // Keep the marker's original line; prepend our already-indented text above it.
  await fs.writeFile(abs, src.replace(re, `${text}\n${match[0]}`));
  console.log(`  updated ${rel}`);
}

const SOURCE = {
  component: `"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function ${Pascal}({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-base border border-border bg-surface p-4", className)}
      {...props}
    >
      ${Title} — edit src/registry/ui/${name}.tsx
    </div>
  );
}
`,
  block: `export function ${Pascal}() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">${Title}</h2>
        <p className="mt-3 text-muted">Edit src/registry/blocks/${name}.tsx</p>
      </div>
    </section>
  );
}
`,
  template: `// Import blocks via "@/components/blocks/<name>" and compose them.

export function ${Pascal}() {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">${Title}</h1>
        <p className="mt-3 text-muted">Edit src/registry/templates/${name}.tsx</p>
      </section>
    </div>
  );
}
`,
};

const DIR = { component: "ui", block: "blocks", template: "templates" };
const sourceRel = `src/registry/${DIR[type]}/${name}.tsx`;

const ENTRY = {
  component: `  {
    name: "${name}",
    title: "${Title}",
    description: "TODO: describe ${name}.",
    category: "Uncategorized",
    tier: "component",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      { source: "${sourceRel}", target: "components/ui/${name}.tsx", type: "registry:ui" },
      UTILS_FILE,
    ],
    date: "${today}",
  },`,
  block: `  {
    name: "${name}",
    title: "${Title}",
    description: "TODO: describe ${name}.",
    category: "Marketing",
    tier: "block",
    dependencies: [],
    registryDependencies: [],
    files: [
      { source: "${sourceRel}", target: "components/blocks/${name}.tsx", type: "registry:block" },
    ],
    date: "${today}",
  },`,
  template: `  {
    name: "${name}",
    title: "${Title}",
    description: "TODO: describe ${name}.",
    category: "Marketing",
    tier: "template",
    pro: false,
    dependencies: [],
    registryDependencies: [],
    files: [
      { source: "${sourceRel}", target: "components/templates/${name}.tsx", type: "registry:block" },
    ],
    date: "${today}",
  },`,
};

// Demo wiring is lazy (next/dynamic): components use a separate demo file with a
// default export; blocks/templates are their own preview (a named export).
const demoEntry =
  type === "component"
    ? `  "${name}": dynamic(() => import("./demos/${name}-demo")),`
    : `  "${name}": dynamic(() => import("./${DIR[type]}/${name}").then((m) => m.${Pascal})),`;

// --- do the work ---
console.log(`\nScaffolding ${type}: ${name}\n`);

await write(sourceRel, SOURCE[type]);

if (type === "component") {
  await write(
    `src/registry/demos/${name}-demo.tsx`,
    `"use client";

import { ${Pascal} } from "@/registry/ui/${name}";

export default function ${Pascal}Demo() {
  return <${Pascal} />;
}
`,
  );
}

await insertBefore("src/registry/demos.ts", "// @new-demo", demoEntry);
await insertBefore("src/registry/registry.ts", "// @new-entry", ENTRY[type]);

console.log(`
✅ Done. Next:
   1. Fill in the source in ${sourceRel}
   2. Edit the new entry in src/registry/registry.ts (description, category${
     type === "block" || type === "template" ? ", registryDependencies" : ", props"
   })
   3. npm run dev  →  visit /${DIR[type] === "ui" ? "components" : DIR[type]}/${name}
`);
