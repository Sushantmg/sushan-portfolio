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
  // Keep the sitemap deterministic — using `new Date()` here made every
  // deploy look like a content change to crawlers and polluted diffs.
  // The exact clock time is pinned from the latest note date string so the
  // serialized timestamp doesn't shift across Node/runtime timezones.
  const stable = latest ? new Date(`${latest}T00:00:00.000Z`) : new Date("2026-01-01T00:00:00.000Z");

  return [
    {
      url: siteUrl("/"),
      lastModified: stable,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/journal"),
      lastModified: stable,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: siteUrl("/cv"),
      lastModified: stable,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: siteUrl("/feed.xml"),
      lastModified: stable,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...projects.map((p) => ({
      url: siteUrl(`/case/${projectSlug(p.name)}`),
      lastModified: stable,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...notes.map((n) => {
      const d = new Date(`${n.date}T00:00:00.000Z`);
      return {
        url: siteUrl(`/journal/${noteSlug(n.title)}`),
        lastModified: Number.isNaN(d.getTime()) ? stable : d,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  ];
}
