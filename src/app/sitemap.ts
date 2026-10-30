import type { MetadataRoute } from "next";
import {
  latestNoteDate,
  notes,
  noteSlug,
  projectSlug,
  projects,
} from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = latestNoteDate();
  const now = new Date();

  return [
    {
      url: siteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/journal"),
      lastModified: latest ? new Date(`${latest}T09:00:00Z`) : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: siteUrl("/cv"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: siteUrl("/feed.xml"),
      lastModified: latest ? new Date(`${latest}T09:00:00Z`) : now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...projects.map((p) => ({
      url: siteUrl(`/case/${projectSlug(p.name)}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...notes.map((n) => {
      const d = new Date(`${n.date}T09:00:00Z`);
      return {
        url: siteUrl(`/journal/${noteSlug(n.title)}`),
        lastModified: Number.isNaN(d.getTime()) ? now : d,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  ];
}
