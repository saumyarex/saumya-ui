# Saumya UI — Codebase Guide

A plain-language walkthrough of how this project works, so you can understand it
and change it confidently. Read top to bottom once; after that, jump to the
"Recipes" section whenever you want to add or change something.

---

## 1. What this project is

Saumya UI is an **open-source UI library website**. People can browse:

- **Components** — small pieces (button, badge, dialog…)
- **Blocks** — full page sections (hero, pricing, FAQ…)
- **Templates** — whole pages (a complete SaaS landing page)

For every item, a visitor can either **copy-paste** the code, or **install it
with one terminal command** using the shadcn CLI:

```bash
npx shadcn@latest add https://labs.saumyarex.xyz/r/button.json
```

That command drops the real source files straight into their own project.

---

## 2. The one big idea (read this twice)

**Every item is defined once, and that single definition produces everything.**

You write a component (or block/template) one time and add one entry to a list.
From that, the site automatically gives you:

1. A **live preview** on the website
2. A **copy-paste code box** (with syntax highlighting)
3. An **install file** at `/r/<name>.json` that the shadcn CLI understands

You never write the same thing twice. The "demo" you see and the "code" people
install are literally the same file.

The "list" that drives all of this is **`src/registry/registry.ts`**. It is the
heart of the project. If you understand that file, you understand 80% of the app.

---

## 3. Tech stack (what each tool does)

| Tool | Why it's here |
|------|---------------|
| **Next.js 16** (App Router) | The website framework — pages, routing, server rendering |
| **React 19** | The UI library everything is built with |
| **TypeScript** | Typed JavaScript — catches mistakes before they run |
| **Tailwind CSS v4** | Styling via utility classes (`flex`, `p-4`, `text-muted`) |
| **Radix UI** | Accessible building blocks for dialog, switch (keyboard, ARIA) |
| **Shiki** | Turns code into colored HTML for the code boxes |
| **next-mdx-remote** | Renders the `.mdx` doc files into styled prose |
| **shadcn registry format** | The JSON shape the `npx shadcn add` command reads |

> **Important about Next.js 16:** it has breaking changes from older versions.
> Two you'll meet a lot: route `params` is now a **Promise** (you must `await`
> it), and dynamic data utilities are async. See `AGENTS.md`.

---

## 4. How to run it

```bash
npm install        # once, to get dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run build      # production build (also runs checks)
npm run lint       # check code style/rules
npm run registry   # manually re-generate the source snapshot (see §7)
```

`dev` and `build` automatically run the snapshot step first (via the `predev` and
`prebuild` scripts in `package.json`), so you normally don't run `registry`
yourself.

---

## 5. Folder map

```
labs-saumya/
├── scripts/
│   └── build-registry.mjs        # snapshots source files into one JSON (see §7)
├── src/
│   ├── app/                      # all pages + routes (Next.js App Router)
│   │   ├── layout.tsx            # the root HTML shell (fonts, theme script)
│   │   ├── globals.css           # the design system: colors, theme, utilities
│   │   ├── (site)/               # everything WITH the nav + footer
│   │   │   ├── layout.tsx        # adds the nav + footer around its pages
│   │   │   ├── page.tsx          # the homepage
│   │   │   ├── opengraph-image.tsx# social share image for the homepage
│   │   │   ├── components/        # /components list + /components/[slug] detail
│   │   │   ├── blocks/            # /blocks list + /blocks/[slug] detail
│   │   │   ├── templates/         # /templates list + /templates/[slug] detail
│   │   │   └── changelog/         # /changelog page
│   │   ├── preview/[name]/        # bare render of one item (for the iframe, §9)
│   │   ├── r/[name]/              # the install files: /r/button.json etc. (§6)
│   │   ├── registry.json/         # a list of ALL items in one file
│   │   ├── sitemap.ts             # /sitemap.xml for SEO
│   │   └── robots.ts              # /robots.txt for SEO
│   ├── registry/                 # THE LIBRARY ITSELF (the products)
│   │   ├── registry.ts           # ⭐ the master list of every item
│   │   ├── demos.ts              # maps each item name -> its preview component
│   │   ├── ui/                    # the 6 components' source code
│   │   ├── blocks/                # the 11 blocks' source code
│   │   ├── templates/             # the template(s) source code
│   │   ├── demos/                 # small demo wrappers for components
│   │   ├── docs/                  # optional .mdx long-form docs per item
│   │   └── __generated__/         # auto-made snapshot (do not edit; git-ignored)
│   ├── components/site/           # the WEBSITE's own UI (not for sale)
│   │   ├── nav.tsx, footer.tsx    # site chrome
│   │   ├── code-block.tsx         # the highlighted code box
│   │   ├── block-preview.tsx      # the iframe preview with device toggle
│   │   ├── command-menu.tsx       # the ⌘K search
│   │   ├── *-card.tsx             # gallery cards
│   │   └── …                      # tabs, copy button, theme toggle, mdx, etc.
│   └── lib/                       # shared helpers
│       ├── site.ts               # site name, URL, social links (edit me!)
│       ├── registry-source.ts    # builds the install JSON + reads source code
│       ├── highlight.ts          # Shiki setup
│       ├── og.tsx                # the social-share image template
│       └── utils.ts              # the `cn()` class-name helper
```

**The key mental split:**
- `src/registry/` = **the products** (what people install).
- `src/components/site/` = **the shop** (the website that displays the products).
- `src/app/` = **the pages/URLs**.
- `src/lib/` = **the machinery** that connects them.

---

## 6. The registry — the heart of everything

### 6.1 An "entry"

Open `src/registry/registry.ts`. It exports one big array called `registry`.
Each item in the array is an **entry** — an object describing one product:

```ts
{
  name: "button",              // URL slug + install name (must be unique)
  title: "Button",             // shown to humans
  description: "A polymorphic button…",
  category: "Buttons",         // groups items in the gallery
  tier: "component",           // "component" | "block" | "template"
  dependencies: ["clsx", …],   // npm packages the user must install
  registryDependencies: [],    // OTHER items this one needs (by name)
  files: [                     // the actual source file(s) to ship
    { source: "src/registry/ui/button.tsx",
      target: "components/ui/button.tsx",   // where it lands in the user's repo
      type: "registry:ui" },
  ],
  props: [ … ],                // optional: rows for the Props table
  date: "2026-06-27",
}
```

The helper functions at the bottom of that file are how the rest of the app reads
this list:

- `getByTier("block")` → all blocks
- `getEntry("button")` → one entry by name
- `getEntryInTier("button", "component")` → one entry, but only if it's that tier
- `hrefFor(entry)` → the correct URL (`/components/…`, `/blocks/…`, `/templates/…`)
- `tierOf(entry)` → the tier, defaulting to `"component"`

### 6.2 Tiers

`tier` decides three things: which gallery the item shows in, which URL it gets,
and how it previews (components get a centered canvas; blocks/templates get the
full-width iframe). If you leave `tier` off, it defaults to `"component"`.

### 6.3 `registryDependencies` (the clever part)

A block like `pricing-three-tier` is built **from** the `button` and `badge`
components. So its entry lists `registryDependencies: ["button", "badge"]`.

When someone installs the block, those names are automatically turned into full
URLs (e.g. `https://labs.saumyarex.xyz/r/button.json`) so the shadcn CLI fetches
the block **and** its components in one go. A template lists all its blocks the
same way, so installing a template pulls the whole tree: template → blocks →
components. (That name-to-URL magic happens in `buildRegistryItem`, see §7.)

### 6.4 The shared `cn` helper file

Almost every component imports `cn` from `@/lib/utils`. So entries that need it
include a shared `UTILS_FILE` in their `files`, which ships `lib/utils.ts` to the
user too. That's why installs are self-contained.

---

## 7. How an item becomes installable (the pipeline)

There's one rule we follow: **the running website never reads files from disk.**
(Reading the filesystem at request time is fragile and slows the build tracer.)

So instead, a small script takes a **snapshot** of all the source files into a
single JSON file, and the website reads from that snapshot.

**Step 1 — snapshot (`scripts/build-registry.mjs`):**
It scans `src/registry/ui`, `src/registry/blocks`, `src/registry/templates`, and
`src/registry/docs`, plus `src/lib/utils.ts`, and writes every file's text into
`src/registry/__generated__/sources.json` as `{ "path": "file contents" }`.
This runs automatically before `dev` and `build`. **Never edit the generated
file**; it's rebuilt every time and is git-ignored.

**Step 2 — read + build (`src/lib/registry-source.ts`):**
This file imports that snapshot and offers:
- `readPrimarySource(entry)` → the main file's text (for the Code box)
- `readEntrySources(entry)` → all files' text (for the Manual install steps)
- `getDoc(name)` → the `.mdx` doc text, if any
- `buildRegistryItem(entry)` → the **install JSON** object (shadcn format),
  including `cssVars` (theme tokens) and the name→URL dependency conversion
- `buildRegistryIndex()` → the big list at `/registry.json`
- `buildThemeItem()` → the one-time theme install at `/r/theme.json`

**Step 3 — serve (`src/app/r/[name]/route.ts`):**
When someone requests `/r/button.json`, this route strips `.json`, finds the
entry, calls `buildRegistryItem`, and returns it as JSON. (`/r/theme.json` is
special-cased to return the theme item.) These are pre-built as static files at
build time, so they're fast and cacheable.

**So the flow is:** your `.tsx` file → snapshot JSON → `buildRegistryItem` →
`/r/<name>.json` → `npx shadcn add` → the user's project.

---

## 8. How the pages are organized

Next.js App Router turns folders under `src/app/` into URLs. A few conventions
used here:

- **`page.tsx`** = a visitable page. **`route.ts`** = an API-like endpoint
  (returns JSON/text, e.g. the install files).
- **`[slug]`** = a dynamic part of the URL. `/components/button` and
  `/components/badge` both use `components/[slug]/page.tsx`. Inside, you read
  which one via `const { slug } = await params`.
- **`(site)`** = a "route group." The parentheses mean the folder name is **not**
  part of the URL — it's just for grouping. We use it so everything inside shares
  the nav + footer (added by `(site)/layout.tsx`).
- The `preview/` route lives **outside** `(site)`, so it has **no** nav/footer —
  that's what makes it safe to embed in an iframe (see §9).
- **`generateStaticParams`** in a dynamic page tells Next which slugs to
  pre-build. We feed it `getByTier(...)` so only the right items build for each
  section.
- **`generateMetadata`** sets the page's `<title>` and description for SEO/social.
- **`opengraph-image.tsx`** in a folder makes the social-share image for those
  pages. They all call the shared template in `src/lib/og.tsx`.

The two detail pages to know:
- `(site)/components/[slug]/page.tsx` → Preview/Code tabs, MDX docs, install
  tabs, Props table.
- `(site)/blocks/[slug]/page.tsx` and `templates/[slug]/page.tsx` → the iframe
  preview + install.

---

## 9. How the previews work

There are **two kinds** of preview, and it helps to know the difference:

1. **Gallery cards** (`block-card.tsx`, `component-card.tsx`, `template-card.tsx`)
   show a **shrunken live render** using a CSS `scale()` transform inside a small
   box. These are not interactive (they're `pointer-events-none`), and the whole
   card is a link.
   - *Note:* the link is a sibling overlay on top of the card (the "stretched
     link" pattern), **not** a wrapper around the demo. That's deliberate — a
     demo can contain its own `<a>`/`<button>`, and you can't legally put those
     inside another `<a>` (it breaks the page). Keep this pattern if you edit cards.

2. **The big detail preview** (`block-preview.tsx`) is a **real iframe** pointing
   at `/preview/<name>`. That route renders just the one item, with no site
   chrome. Because it's a separate document, the item's styles are fully isolated
   and **its responsive breakpoints actually work**.

### The device toggle (Desktop / Tablet / Mobile)

The toggle renders the iframe at a **true logical width** — Desktop 1280px,
Tablet 820px, Mobile 390px — and then visually **scales it down** to fit the
column using `transform: scale()`.

The important trick: **`transform: scale()` does not change the iframe's internal
width.** Inside the iframe the page still "thinks" it's 1280px wide, so
`lg:` breakpoints fire and you see the real desktop layout — just shrunk to fit.
A `ResizeObserver` measures the available width to compute the scale.

---

## 10. The design system (colors & theme)

All styling flows through **`src/app/globals.css`**. It defines:

- A **neutral ink scale** (`--color-ink-50` … `--color-ink-950`) and an unused
  emerald scale (kept around in case you ever want a colored accent again).
- **Semantic tokens** that the whole app uses by name:
  `--background`, `--surface`, `--foreground`, `--muted`, `--border`,
  `--accent`, `--accent-fg`. These are defined twice — once for light mode
  (`:root`) and once for dark mode (`.dark`).
- The site is **monochrome**: `--accent` is black in light mode and white in
  dark mode. To re-skin the whole site, you mostly change these token values in
  one place.
- A `@theme inline` block that maps tokens to Tailwind classes, so you can write
  `bg-surface`, `text-muted`, `border-border`, `rounded-base`, etc.
- The `.bg-grid` dotted-grid utility and Shiki's light/dark code colors.

**Dark/light mode:** a tiny script in `layout.tsx` runs before the page paints
and adds/removes the `dark` class on `<html>` based on `localStorage`. The
`theme-toggle.tsx` button flips it. Default is dark.

**Why this matters for installs:** the shipped components use these same token
names. So users need the tokens too — which is why every install JSON includes
`cssVars`, and there's a one-time `/r/theme.json` that sets them all up. The
token values live in `BASE_CSS_VARS` inside `registry-source.ts` and should be
kept **in sync** with `globals.css`.

---

## 11. Recipes (how to make changes)

### ⚡ Fastest way: the generator
Don't hand-create files. Run one command and it scaffolds the source file, the
demo, and wires both `demos.ts` and `registry.ts` for you:

```bash
npm run new:component fancy-button
npm run new:block     feature-split
npm run new:template  waitlist-page
```

Then just (1) fill in the design in the new source file and (2) tidy the starter
entry it added to `registry.ts` (description, category, dependencies). Run
`npm run dev` and it's live. The manual steps below are what the generator does
for you — useful to understand, rarely needed by hand.

> The generator finds `// @new-import`, `// @new-demo`, and `// @new-entry`
> marker comments and inserts above them. Don't delete those markers.

### ➕ Add a new component (manual)
1. Create the file: `src/registry/ui/my-thing.tsx`. Use `@/lib/utils` for `cn`.
2. Create a small demo: `src/registry/demos/my-thing-demo.tsx` (a default export
   that shows it off).
3. Register the demo in `src/registry/demos.ts` (import it, add `"my-thing":
   MyThingDemo` to the map).
4. Add an entry to the `registry` array in `src/registry/registry.ts`
   (`tier: "component"`, `dependencies`, `files` pointing at your file +
   `UTILS_FILE` if it uses `cn`, optional `props`).
5. (Optional) Add docs: `src/registry/docs/my-thing.mdx`.
6. Run `npm run dev`. Done — it appears in the gallery, has a page, and is
   installable at `/r/my-thing.json`.

### ➕ Add a new block
Same as above, but:
- Put the file in `src/registry/blocks/`.
- Import the components it uses via `@/components/ui/<name>` (a path alias maps
  that to `src/registry/ui/` — see §12). List those component names in
  `registryDependencies`.
- Set `tier: "block"`, set a `category`, and `target: "components/blocks/…"` with
  `type: "registry:block"`.
- Add it to `demos.ts` (the block itself is the preview).

### ➕ Add a new template
- Put the file in `src/registry/templates/`. Import blocks via
  `@/components/blocks/<name>`.
- Set `tier: "template"`, list **all** the blocks it uses in
  `registryDependencies`, set `pro: false` (or `true` later).
- Add it to `demos.ts`.

### 🎨 Change the accent color (e.g. add back a real color)
Edit `--accent` and `--accent-fg` in **both** `:root` and `.dark` in
`globals.css`. Then update the matching values in `BASE_CSS_VARS` in
`registry-source.ts` so installs match. That's it — buttons, links, focus rings
all follow.

### ✏️ Change the site name, URL, or social links
Everything is centralized in **`src/lib/site.ts`**. To re-enable GitHub later,
set `github` to your URL there and add the link back in `nav.tsx`/`footer.tsx`.

### 📝 Edit the changelog
It's plain data at the top of `src/app/(site)/changelog/page.tsx`. Add a new
object to the `releases` array.

### 💲 Turn a template into "Pro" later
Set `pro: true` on its entry. The Free/Pro badge updates automatically. (Actual
paywalling/gating isn't built yet — the flag and UI are the scaffolding for it.)

---

## 12. Gotchas & things to know

- **Path aliases.** `tsconfig.json` maps:
  - `@/*` → `src/*` (normal)
  - `@/components/ui/*` → `src/registry/ui/*`
  - `@/components/blocks/*` → `src/registry/blocks/*`
  The last two let blocks/templates import the *same way a user's project would*
  (`@/components/ui/button`) while still resolving on our site. Don't remove them.

- **Don't edit `src/registry/__generated__/sources.json`** — it's auto-built.

- **`"use client"`** at the top of a file means it runs in the browser (needed for
  anything interactive: state, clicks, effects). Files without it are server
  components (faster, but no interactivity). Demos with buttons/switches and the
  navbar block are client; most blocks are server.

- **OG image URLs look weird** (e.g. `/blocks/x/opengraph-image-1q1k9o?abc`).
  That hash is normal — Next adds it. The page's `<meta>` tag points to the right
  URL; a plain `/opengraph-image` path returning 404 is expected.

- **`params` is a Promise** in Next 16. Always `const { slug } = await params`.

- **Adding a brand-new source folder?** Add it to `SOURCE_DIRS` in
  `scripts/build-registry.mjs`, or its files won't be snapshotted (and the site
  will throw "Missing source for …").

- **Counts today:** 6 components, 11 blocks, 1 template = 18 installable items,
  shown by `/registry.json`.

---

## 13. Mini-glossary

- **Registry** — the catalog of installable items (`registry.ts`) and the format
  shadcn understands.
- **Entry** — one object in the registry describing one item.
- **Tier** — component / block / template.
- **Item / install JSON** — the `/r/<name>.json` file the CLI reads.
- **Codegen / snapshot** — the build step that copies source into one JSON.
- **Route group `(site)`** — folder grouping that doesn't change the URL.
- **Token** — a named CSS variable (`--accent`) used for theming.
- **Stretched link** — a card pattern where the link overlays the card instead of
  wrapping it.

---

### Where to look first when…
- *A color/spacing looks wrong* → `globals.css` (tokens) or the item's own classes.
- *An item is missing from a gallery* → its `tier`/`category` in `registry.ts`.
- *Install is broken* → `registry-source.ts` (`buildRegistryItem`) + the entry's
  `files`/`registryDependencies`.
- *Preview looks off* → `block-preview.tsx` (iframe) or `preview/[name]/page.tsx`.
- *Nav/footer/branding* → `components/site/nav.tsx`, `footer.tsx`, `lib/site.ts`.

Happy building. Change one thing at a time, run `npm run dev`, and let the
gallery + `/r/<name>.json` confirm it worked.
```
