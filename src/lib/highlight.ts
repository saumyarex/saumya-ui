import "server-only";

import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

/** Cache a single highlighter instance across requests (it is expensive to create). */
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "ts", "bash", "css", "json"],
    });
  }
  return highlighterPromise;
}

/**
 * Highlight code into dual-theme HTML. Colors are emitted as CSS variables
 * (`--shiki-light` / `--shiki-dark`) so the theme follows the site toggle.
 */
export async function highlight(code: string, lang: BundledLanguage = "tsx") {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
