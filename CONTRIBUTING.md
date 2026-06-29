# Contributing to Saumya UI

Thanks for wanting to add to the library! Every component, block, and template
is **credited to its author** with a byline that links wherever you choose — your
X, your site, your GitHub. Contributing here is a way to build your own
credibility as a design engineer, not just to help the project.

This guide gets you from clone to pull request.

---

## What you can contribute

| Tier | What it is | Examples |
| --- | --- | --- |
| **Component** | A small, reusable piece | button, badge, dialog |
| **Block** | A full page section | hero, pricing, FAQ |
| **Template** | A whole page | a complete SaaS landing |

Anything accessible, dependency-light, and genuinely reusable is welcome. If
you're unsure whether an idea fits, open an issue first and ask.

---

## The one big idea

**Every item is defined once and that single definition produces everything** —
the live preview, the copy-paste code box, and the shadcn install file at
`/r/<name>.json`. You write the source, add one entry to the registry, and the
site does the rest. (See [`GUIDE.md`](./GUIDE.md) for the full architecture.)

---

## Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<you>/saumya-ui.git
cd saumya-ui

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev   # http://localhost:3000
```

---

## Add your item (the fast path)

A scaffolder creates the source file, wires up the preview, and inserts a
starter registry entry for you:

```bash
npm run new:component my-thing
# or: npm run new:block my-section
# or: npm run new:template my-page
```

Then:

1. **Write the source** in the file it created
   (`src/registry/ui/…`, `…/blocks/…`, or `…/templates/…`).
2. **Edit the registry entry** in [`src/registry/registry.ts`](./src/registry/registry.ts):
   fill in `description`, `category`, dependencies, and `props` (for components).
3. **Set your byline** — update the `author` field on the entry (details below).
4. **Preview it** at `/components/my-thing` (or `/blocks/…`, `/templates/…`).

---

## Crediting yourself (the `author` field)

Each registry entry takes an optional `author`. This is what renders the byline
on your item's page:

```ts
{
  name: "my-thing",
  title: "My Thing",
  // …the rest of the entry…
  author: {
    name: "Ada Lovelace",
    url: "https://x.com/ada",        // optional — X, your site, GitHub, anything
    avatar: "https://…/ada.jpg",     // optional — square image; falls back to your initial
  },
},
```

- **`name`** is required. `url` and `avatar` are optional.
- Omit `author` entirely and the item falls back to the maintainer's byline.
- The link opens in a new tab. Point it wherever helps *your* credibility.

---

## Quality bar

Before opening a PR, please make sure your item is:

- **Accessible** — keyboard operable, correct roles/labels, visible focus states.
- **Themeable** — uses the semantic tokens (`bg-background`, `text-foreground`,
  `text-muted`, `border-border`, …), works in **light and dark** mode.
- **Monochrome** — the brand is neutral. No colored accents; let typography and
  spacing carry the design. (Color only for a genuine semantic signal, rarely.)
- **Self-contained** — list every npm package in `dependencies` and every other
  registry item in `registryDependencies` so installs work in a fresh project.
- **Responsive** — looks right from mobile to wide screens.

---

## Before you push

```bash
npm run lint          # eslint
npx tsc --noEmit      # type-check
npm run build         # must build clean (also regenerates the registry)
```

All three should pass.

---

## Open the pull request

1. Branch: `git checkout -b add-my-thing`
2. Commit with a clear message: `feat(component): add my-thing`
3. Push to your fork and open a PR against `main`.
4. In the PR description, include a screenshot or short clip of the preview and
   note which tier it is.

A maintainer will review for the quality bar above. Once merged, your item is
live with your byline on it. 🎉

---

## Code style

- TypeScript + React function components.
- Tailwind for styling, via the semantic tokens above.
- Match the conventions of the surrounding files (naming, structure, comments).
- Keep dependencies minimal — prefer a few lines of code over a new package.

Questions? Open an issue. Thanks for contributing!
