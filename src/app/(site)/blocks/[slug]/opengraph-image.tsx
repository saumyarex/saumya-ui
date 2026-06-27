import { getByTier, getEntryInTier } from "@/registry/registry";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Saumya UI block";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getByTier("block").map((entry) => ({ slug: entry.name }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntryInTier(slug, "block");
  return ogImage({
    title: entry?.title ?? "Block",
    eyebrow: entry ? `${entry.category} block` : "Block",
    description: entry?.description ?? "Full sections, copy-paste or shadcn install.",
  });
}
