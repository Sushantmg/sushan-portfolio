"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { projects, slugify, type Project } from "@/lib/data";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";

const accents: Record<string, string> = {
  "from-violet-500 to-fuchsia-500": "bg-acid",
  "from-cyan-400 to-blue-600": "bg-sky",
  "from-amber-400 to-orange-600": "bg-vermilion",
  "from-emerald-400 to-teal-600": "bg-acid",
  "from-rose-400 to-red-600": "bg-vermilion",
  "from-lime-400 to-green-600": "bg-sky",
  "from-orange-500 to-red-500": "bg-vermilion",
};

const caseHash = (slug: string) => `#case/${slug}`;

function readHash(): string | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/^#case\/([\w-]+)$/);
  return match ? match[1] : null;
}

function writeHash(slug: string | null, replace: boolean) {
  const url = `${window.location.pathname}${window.location.search}${
    slug ? caseHash(slug) : ""
  }`;
  if (replace) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const tagCounts = projects
    .flatMap((p) => p.tags)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {});
  const topTags = Object.entries(tagCounts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );

  const visible = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  useEffect(() => {
    const slug = readHash();
    if (!slug) return;
    const found = projects.find((p) => slugify(p.name) === slug);
    if (!found) return;
    const id = setTimeout(() => {
      setActive(found);
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const sync = () => {
      const slug = readHash();
      const found = slug
        ? (projects.find((p) => slugify(p.name) === slug) ?? null)
        : null;
      setActive(found);
      // A `#case/<slug>` fragment matches no element id, so the browser scrolls
      // to the top before the modal opens. Pull the viewport back to the
      // projects grid so closing the modal doesn't dump the reader at the top.
      if (found) {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const open = (project: Project) => {
    setActive(project);
    writeHash(slugify(project.name), false);
  };

  const close = () => {
    setActive(null);
    writeHash(null, true);
  };

  const step = (dir: -1 | 1) => {
    if (!active) return;
    const i = projects.findIndex((p) => p.name === active.name);
    const next =
      projects[(i + dir + projects.length) % projects.length];
    setActive(next);
    writeHash(slugify(next.name), true);
  };

  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-line bg-carbon-2 py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          watermark="作"
          sectionId="projects"
          title={
            <>
              Things I&apos;ve{" "}
              <em className="font-light italic text-acid">shipped.</em>
            </>
          }
          description="Production platforms and experiments across AI, e-commerce, and infrastructure."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by tag">
          <button
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`border px-3 py-1.5 font-mono text-[0.68rem] transition-colors duration-200 ${
              tag === null
                ? "border-acid bg-acid text-carbon"
                : "border-line text-muted hover:border-acid hover:text-acid"
            }`}
          >
            all · {projects.length}
          </button>
          {topTags.map(([t, count]) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              aria-pressed={tag === t}
              className={`border px-3 py-1.5 font-mono text-[0.68rem] transition-colors duration-200 ${
                tag === t
                  ? "border-acid bg-acid text-carbon"
                  : "border-line text-muted hover:border-acid hover:text-acid"
              }`}
            >
              {t.toLowerCase()} · {count}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mb-6 font-mono text-[0.68rem] text-muted">
          showing {visible.length} of {projects.length} builds
          {tag ? ` tagged “${tag}”` : ""}
        </p>

        <StaggerGroup
          key={tag ?? "all"}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project) => {
            const i = projects.findIndex((p) => p.name === project.name);
            return (
            <StaggerItem key={project.name}>
              <TiltCard intensity={6} className="h-full">
                <button
                  type="button"
                  onClick={() => open(project)}
                  className="shine group relative flex h-full w-full cursor-pointer flex-col border border-line bg-carbon text-left transition-all duration-300 hover:-translate-y-1 hover:hard-shadow-sm hover:border-transparent"
                >
                  <span className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-transparent border-t-vermilion/90 transition-colors duration-300 group-hover:border-t-vermilion" />
                  <div className={`h-1.5 ${accents[project.accent] ?? "bg-acid"} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted">
                          0{i + 1}
                        </span>
                        {"featured" in project && project.featured && (
                          <span className="kanji rotate-[-2deg] border border-vermilion/60 px-1.5 py-0.5 text-[0.6rem] text-vermilion">
                            注目
                          </span>
                        )}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acid" />
                    </div>

                    <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
                      {project.name}
                    </h3>
                    <p className="label mt-1 text-muted">{project.tagline}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-acid"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.65rem]">
                      <span className="text-transparent transition-colors duration-300 group-hover:text-acid">
                        詳細
                      </span>
                      <span className="text-muted transition-colors duration-300 group-hover:text-ink">
                        click to open case
                      </span>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </StaggerItem>
            );
          })}
        </StaggerGroup>

        {visible.length === 0 && (
          <p className="font-mono text-sm text-muted">
            nothing tagged “{tag}” yet.
          </p>
        )}
      </div>

      <ProjectModal
        project={active}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  );
}