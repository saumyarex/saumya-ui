import { getEntry, registry } from "@/registry/registry";
import { buildRegistryItem } from "@/lib/registry-source";

/**
 * shadcn-compatible registry endpoint.
 *
 *   npx shadcn@latest add https://labs.saumyarex.xyz/r/button.json
 *
 * The `.json` suffix is optional and stripped. Pre-rendered for every entry.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return registry.map((entry) => ({ name: `${entry.name}.json` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const slug = name.replace(/\.json$/, "");
  const entry = getEntry(slug);

  if (!entry) {
    return Response.json({ error: `Unknown component: ${slug}` }, { status: 404 });
  }

  const item = buildRegistryItem(entry);
  return Response.json(item, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
