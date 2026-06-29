# Saumya UI

An open-source UI library — accessible, beautifully-crafted React **components,
blocks, and templates**. Visitors can **copy-paste** the source or **install with
the shadcn CLI**; the code lands in their repo, fully theirs to edit. Free + MIT.

**Production:** https://ui.saumyarex.xyz (set in `src/lib/site.ts`).

Built with Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Radix
primitives · Shiki. Brand: monochrome / neutral (ink accent).

## Tiers

The library is three tiers, set by a `tier` field on each registry entry:

- **Components** (`registry:ui`) — atoms (button, dialog, switch …). Routed at `/components`.
- **Blocks** (`registry:block`) — full sections (hero, pricing, CTA) composed from
  components; installing one pulls its components in automatically (their names
  expand to full registry URLs in `buildRegistryItem`). Routed at `/blocks`, with
  an **isolated iframe preview** (`/preview/[name]`) and a device-width toggle.
- **Templates** — full pages, coming soon. Routed at `/templates`.

Blocks import `@/components/ui/*` (the consumer-facing path); a tsconfig alias maps
that to `src/registry/ui/*` so the same source resolves here and in a user's repo.

The site shell (nav/footer) lives in the `app/(site)` route group; `/preview/*`
renders bare (outside the group) so it embeds cleanly in an iframe.

## How it works

Every component is defined **once** in `src/registry/` and that single
definition drives three outputs:

1. **The docs page** — live preview + metadata
2. **The copy-paste code block** — Shiki-highlighted source
3. **The install JSON** — a shadcn-compatible registry item at `/r/<name>.json`

```
src/
├─ registry/
│  ├─ registry.ts          # source of truth: metadata for every component
│  ├─ ui/                  # the actual component source (shipped to users)
│  ├─ demos/               # live preview for each component
│  ├─ demos.ts             # slug → demo component map
│  └─ __generated__/       # codegen output (sources.json) — do not edit
├─ lib/
│  ├─ registry-source.ts   # reads generated sources, builds shadcn items
│  ├─ highlight.ts         # cached Shiki highlighter (dual light/dark theme)
│  └─ utils.ts             # cn() — also shipped with every component
├─ components/site/        # the site's own UI (nav, code block, tabs, …)
└─ app/
   ├─ page.tsx             # landing
   ├─ components/          # browse + [slug] detail
   └─ r/[name]/route.ts    # shadcn registry endpoint (static)

scripts/build-registry.mjs # snapshots ui/ + utils into __generated__/sources.json
```

The codegen step (run automatically via the `predev` / `prebuild` npm hooks)
snapshots component source into a static JSON map, so the app never reads the
filesystem at request time — `/r/*.json` and every docs page prerender as fully
static output.

## Install a component (consumer side)

```bash
npx shadcn@latest add https://ui.saumyarex.xyz/r/spotlight-card.json
```

…or open the component page and copy the source from the **Manual** tab.

## Adding a new component

The scaffolder wires up the source, demo, and a starter registry entry:

```bash
npm run new:component my-thing   # or new:block / new:template
```

Then:

1. Write the component source in the file it created (`src/registry/ui/<name>.tsx`).
2. Fill in the registry entry in `src/registry/registry.ts` (title, description,
   category, npm `dependencies`, `files`, and `props`).
3. Set the `author` field to credit yourself (or remove it to use the default).
4. `npm run dev` — codegen picks up the new source automatically.

Prefer to do it by hand? Drop the source in `src/registry/ui/<name>.tsx`, add a
demo in `src/registry/demos/<name>-demo.tsx` (registered in `demos.ts`), and add
the registry entry yourself.

## Contributing

Contributions are welcome — components, blocks, and templates. **Every item is
credited to its author** with a byline that links wherever you choose (X, your
site, GitHub), so contributing here builds your own credibility too. Only the
site's own branding is monochrome; contributed items can use any color.

Open PRs against the **`preview`** branch (not `main`). See
**[CONTRIBUTING.md](./CONTRIBUTING.md)** for the full fork-to-PR workflow, the
`author` field, and the quality bar.

## Scripts

| Script             | What it does                                       |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Codegen + dev server                               |
| `npm run build`    | Codegen + production build                         |
| `npm run registry` | Regenerate `__generated__/sources.json` on demand  |

## Theming

Every registry item ships a `cssVars` block (`theme` / `light` / `dark`) so
`npx shadcn add` writes the emerald + monochrome tokens into the consumer's
`globals.css` — components render correctly out of the box. The canonical token
values live in `BASE_CSS_VARS` in `src/lib/registry-source.ts` and mirror
`globals.css`; keep the two in sync if you re-skin the brand.

## Per-component docs

Each component page renders, in order: a live **Preview / Code** tab, long-form
**MDX docs**, **CLI / Manual** install tabs, a **Props** table, and a dependency
list. MDX lives in `src/registry/docs/<name>.mdx` (snapshotted by the codegen,
compiled with `next-mdx-remote/rsc`, styled via `src/components/site/mdx.tsx`).
Props come from the `props` array on each registry entry. Add an `.mdx` file +
`props` to document a new component — both are optional.

Every component page and the homepage emit a branded **OpenGraph image**
(`opengraph-image.tsx`), prerendered per component.

## Known follow-ups

- A `registry.json` index endpoint listing all items.
- A one-time `theme` registry item so consumers can install the brand once
  instead of carrying `cssVars` on every component.
- Live component embeds inside MDX prose (the components map in `mdx.tsx` is
  ready for it).
