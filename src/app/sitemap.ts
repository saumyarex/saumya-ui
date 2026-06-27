import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { registry, hrefFor } from "@/registry/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes = ["", "/components", "/blocks", "/templates", "/changelog"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const entryRoutes = registry.map((entry) => ({
    url: `${base}${hrefFor(entry)}`,
    lastModified: new Date(entry.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...entryRoutes];
}
