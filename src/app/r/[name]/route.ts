import { getEntry, registry } from "@/registry/registry";
import { buildRegistryItem, buildThemeItem } from "@/lib/registry-source";

/**
 * shadcn-compatible registry endpoint.
 *
 *   npx shadcn@latest add https://ui.saumyarex.xyz/r/button.json
 *   npx shadcn@latest add https://ui.saumyarex.xyz/r/theme.json   (one-time)
 *
 * The `.json` suffix is optional and stripped. Pre-rendered for every entry.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { name: "theme.json" },
    ...registry.map((entry) => ({ name: `${entry.name}.json` })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const slug = name.replace(/\.json$/, "");

  const item = slug === "theme" ? buildThemeItem() : null;
  if (item) {
    return Response.json(item, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    });
  }

  const entry = getEntry(slug);
  if (!entry) {
    return Response.json({ error: `Unknown item: ${slug}` }, { status: 404 });
  }

  return Response.json(buildRegistryItem(entry), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
