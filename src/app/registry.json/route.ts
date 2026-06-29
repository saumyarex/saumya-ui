import { buildRegistryIndex } from "@/lib/registry-source";

/**
 * Registry index — lists every component with its install URL.
 *
 *   curl https://ui.saumyarex.xyz/registry.json
 *
 * Useful for discovery, tooling, and a future "install everything" flow.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildRegistryIndex(), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
