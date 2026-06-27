// Codegen: snapshot every registry source file into a static JSON map so the
// app never touches the filesystem at request time (keeps Turbopack's file
// tracer happy and makes /r/<name>.json fully static).
//
// Runs automatically via the `predev` / `prebuild` npm hooks.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Every file that any registry entry may ship, plus the per-component MDX docs.
const SOURCE_DIRS = ["src/registry/ui", "src/registry/blocks", "src/registry/docs"];
const EXTRA_FILES = ["src/lib/utils.ts"];

async function collect() {
  const files = [...EXTRA_FILES];
  for (const dir of SOURCE_DIRS) {
    let entries;
    try {
      entries = await fs.readdir(path.join(ROOT, dir));
    } catch {
      continue; // dir may not exist yet
    }
    for (const name of entries) {
      if (/\.(tsx?|css|mdx)$/.test(name)) files.push(`${dir}/${name}`);
    }
  }
  const map = {};
  for (const rel of files) {
    map[rel] = await fs.readFile(path.join(ROOT, rel), "utf8");
  }
  return map;
}

const map = await collect();
const outDir = path.join(ROOT, "src/registry/__generated__");
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(
  path.join(outDir, "sources.json"),
  JSON.stringify(map, null, 2) + "\n",
);

console.log(
  `[build-registry] wrote ${Object.keys(map).length} source files to src/registry/__generated__/sources.json`,
);
