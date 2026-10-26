import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Kamon } from "@/components/Kamon";
import {
  projects,
  projectBySlug,
  projectSlug,
  slugify,
  type Project,
} from "@/lib/data";
import { siteUrl, RSS_ALTERNATE } from "@/lib/site";
import { CaseActions } from "./CaseActions";

const LANGUAGES = new Set(["TypeScript", "Python", "JavaScript"]);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Case not found" };

  const title = `${project.name} — ${project.tagline}`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/case/${slug}`, ...RSS_ALTERNATE },
    openGraph: {
      title: `${project.name} · Sushan Tamang`,
      description,
      url: `/case/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · Sushan Tamang`,
      description,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.name === project.name);
  const related = projects
    .filter((p) => p.name !== project.name)
    .map((p) => ({
      p,
      score: p.tags.filter((t) => project.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);

  const url = siteUrl(`/case/${slug}`);
  const programmingLanguage = project.tags.filter((tag) => LANGUAGES.has(tag));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: project.name,
        headline: project.tagline,
        description: project.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url,
        keywords: project.tags.join(", "),
        author: {
          "@type": "Person",
          name: "Sushan Tamang",
          url: siteUrl("/"),
        },
        ...(programmingLanguage.length > 0 ? { programmingLanguage } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: siteUrl("/#projects"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="grain relative min-h-screen">
      <div aria-hidden className="seigaiha fixed inset-0 z-0 opacity-[0.045]" />
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#c7f542_1px,transparent_1px),linear-gradient(to_bottom,#c7f542_1px,transparent_1px)] bg-[size:5rem_1rem] opacity-[0.03]"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative z-10 border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Kamon className="h-8 w-8 text-acid" />
            <span className="font-display text-xl font-bold italic text-ink">
              sushan<span className="text-acid">.</span>
            </span>
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
          >
            <ArrowLeft className="h-3 w-3" /> all projects
          </Link>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-muted">
          <Link href="/" className="transition-colors hover:text-acid">
            home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#projects" className="transition-colors hover:text-acid">
            projects
          </Link>
          <span aria-hidden>/</span>
          <span className="text-acid">{project.name}</span>
        </nav>

        <div className="mt-8 flex items-center gap-3">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          {"featured" in project && project.featured && (
            <span className="kanji rotate-[-2deg] border border-vermilion/60 px-1.5 py-0.5 text-[0.6rem] text-vermilion">
              注目
            </span>
          )}
        </div>

        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {project.name}
        </h1>
        <p className="label mt-3 text-muted">{project.tagline}</p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink">
          {project.description}
        </p>

        <div className="mt-8">
          <CaseActions
            title={`${project.name} · case file`}
            text={project.tagline}
            url={url}
          />
        </div>

        <section className="mt-14">
          <div className="flex items-center gap-3">
            <span className="label text-acid">/ scope</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="mt-3 font-mono text-sm leading-relaxed text-ink">
            <span className="text-acid">&gt;</span> {project.scope}
          </p>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <span className="label text-acid">/ highlights</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink"
              >
                <span className="mt-1.5 text-acid">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <span className="label text-acid">/ stack</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3">
              <span className="label text-acid">/ related work</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((p) => (
                <li key={p.name}>
                  <Link
                    href={`/case/${slugify(p.name)}`}
                    className="group flex h-full flex-col border border-line bg-carbon-2 p-4 transition-colors duration-300 hover:border-acid"
                  >
                    <span className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-acid">
                      {p.name}
                    </span>
                    <span className="label mt-1 text-muted">{p.tagline}</span>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[0.62rem] text-muted transition-colors group-hover:text-acid">
                      open case <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {(project.liveUrl || (project as Project & { demoUrl?: string }).demoUrl) && (
            <a
              href={(project.liveUrl || (project as Project & { demoUrl?: string }).demoUrl) as string}
              target="_blank"
              rel="noopener noreferrer"
              className="hard-shadow-sm border border-line bg-carbon-2 px-4 py-2 font-mono text-xs text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:text-acid"
            >
              live demo
            </a>
          )}
          {(project.repoUrl || project.github || (project as Project & { repo?: string }).repo) && (
            <a
              href={(project.repoUrl || project.github || (project as Project & { repo?: string }).repo) as string}
              target="_blank"
              rel="noopener noreferrer"
              className="hard-shadow-sm border border-line bg-carbon-2 px-4 py-2 font-mono text-xs text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:text-acid"
            >
              github
            </a>
          )}
        </div>

        <nav
          aria-label="Case navigation"
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
        >
          <Link
            href={`/case/${projectSlug(projects[(index - 1 + projects.length) % projects.length].name)}`}
            aria-label={`Previous case: ${projects[(index - 1 + projects.length) % projects.length].name}`}
            className="group inline-flex max-w-[45%] items-center gap-2 font-mono text-[0.7rem] text-muted transition-colors hover:text-acid"
          >
            <ArrowLeft className="h-3 w-3 shrink-0" />
            <span className="truncate">
              <span className="text-muted/70">prev / </span>
              {projects[(index - 1 + projects.length) % projects.length].name}
            </span>
          </Link>
          <Link
            href={`/case/${projectSlug(projects[(index + 1) % projects.length].name)}`}
            aria-label={`Next case: ${projects[(index + 1) % projects.length].name}`}
            className="group inline-flex max-w-[45%] items-center gap-2 text-right font-mono text-[0.7rem] text-muted transition-colors hover:text-acid"
          >
            <span className="truncate">
              <span className="text-muted/70">{projects[(index + 1) % projects.length].name} / </span>
              next
            </span>
            <ArrowUpRight className="h-3 w-3 shrink-0" />
          </Link>
        </nav>
      </article>
    </main>
  );
}
