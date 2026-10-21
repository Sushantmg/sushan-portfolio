import { notes, noteSlug } from "@/lib/data";
import { siteUrl } from "@/lib/site";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const ordered = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = ordered
    .map((note) => {
      const link = siteUrl(`/journal/${noteSlug(note.title)}`);
      const categories = note.tags
        .map((t) => `<category>${escape(t)}</category>`)
        .join("");
      return `    <item>
      <title>${escape(note.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${note.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(note.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Journal — Sushan Tamang</title>
    <link>${siteUrl("/#journal")}</link>
    <description>Field notes from the build log of Sushan Tamang, full-stack &amp; AI developer.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${ordered[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
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
