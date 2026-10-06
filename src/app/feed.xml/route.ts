import { notes, profile } from "@/lib/data";

const SITE = "https://github.com/Sushantmg/sushan-portfolio";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = [...notes]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((note) => {
      const link = `${SITE}/#journal`;
      const categories = note.tags
        .map((t) => `<category>${escape(t)}</category>`)
        .join("");
      return `    <item>
      <title>${escape(note.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">journal-${note.date}</guid>
      <pubDate>${new Date(`${note.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(note.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Journal — ${escape(profile.name)}</title>
    <link>${SITE}/#journal</link>
    <description>Field notes from the build log of ${escape(profile.name)}, ${escape(profile.role)}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${notes[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}