import { notes } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Journal — field notes and build logs by Sushan Tamang";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  return ogCard({
    eyebrow: "journal / build log",
    title: "Field notes from the build log.",
    subtitle:
      "What actually broke, what I changed, and what I would do differently — written while shipping.",
    tags: tags.slice(0, 4),
    footer: `${notes.length} entries / rss`,
  });
}
