import type { MetadataRoute } from "next";
import { notes, noteSlug, projectSlug, projects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNote = notes.reduce(
    (latest, n) => (n.date > latest ? n.date : latest),
    notes[0].date,
  );

  return [
    {
      url: siteUrl("/"),
      lastModified: new Date(`${latestNote}T09:00:00Z`),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/cv"),
      lastModified: new Date(`${latestNote}T09:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((p) => ({
      url: siteUrl(`/case/${projectSlug(p.name)}`),
      lastModified: new Date(`${latestNote}T09:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...notes.map((n) => ({
      url: siteUrl(`/journal/${noteSlug(n.title)}`),
      lastModified: new Date(`${n.date}T09:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
