import { projectBySlug, projects } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Project case file — Sushan Tamang";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return ogCard({
      eyebrow: "case file",
      title: "Project not found",
      subtitle: "Browse the case files in the portfolio.",
    });
  }

  const index = projects.findIndex((p) => p.name === project.name);

  return ogCard({
    eyebrow: `case file / 0${index + 1}`,
    title: project.name,
    subtitle: project.tagline,
    tags: project.tags,
    footer: `0${index + 1} / 0${projects.length}`,
  });
}
