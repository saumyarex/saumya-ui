/** Canonical site config. Update the URL here if the domain ever changes. */
export const SITE = {
  name: "Saumya UI",
  url: "https://ui.saumyarex.xyz",
  author: "Saumya",
  authorUrl: "https://saumyarex.xyz",
  studioUrl: "https://studio.saumyarex.xyz",
  /** Social links. `github` is null until the repo is public. */
  github: "https://github.com/saumyarex/saumya-ui" as string | null,
  x: "https://x.com/saumyarex",
} as const;

/** The shadcn install URL for a given component slug. */
export function registryUrl(name: string): string {
  return `${SITE.url}/r/${name}.json`;
}
