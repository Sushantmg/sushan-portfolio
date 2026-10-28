import { noteBySlug, noteReadTime, notes } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Journal entry — Sushan Tamang";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = noteBySlug(slug);

  if (!note) {
    return ogCard({
      eyebrow: "journal",
      title: "Entry not found",
      subtitle: "Field notes from the build log.",
    });
  }

  return ogCard({
    eyebrow: `journal / ${note.date}`,
    title: note.title,
    subtitle: note.excerpt,
    tags: note.tags,
    footer: `${noteReadTime(note)} min read`,
  });
}
