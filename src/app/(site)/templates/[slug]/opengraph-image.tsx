import { getByTier, getEntryInTier } from "@/registry/registry";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Saumya UI template";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getByTier("template").map((entry) => ({ slug: entry.name }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "template");
  return ogImage({
    title: entry?.title ?? "Template",
    eyebrow: "Template",
    description: entry?.description ?? "Full pages, assembled from blocks.",
  });
}
