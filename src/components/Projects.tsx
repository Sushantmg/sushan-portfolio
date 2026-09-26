import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";

const accents: Record<string, string> = {
  "from-violet-500 to-fuchsia-500": "bg-acid",
  "from-cyan-400 to-blue-600": "bg-sky",
  "from-amber-400 to-orange-600": "bg-vermilion",
  "from-emerald-400 to-teal-600": "bg-acid",
  "from-rose-400 to-red-600": "bg-vermilion",
  "from-lime-400 to-green-600": "bg-sky",
};

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-line bg-carbon-2 py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          watermark="作"
          title={
            <>
              Things I&apos;ve{" "}
              <em className="font-light italic text-acid">shipped.</em>
            </>
          }
          description="Production platforms and experiments across AI, e-commerce, and infrastructure."
        />

        <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <StaggerItem key={project.name}>
              <TiltCard intensity={6} className="shine group relative h-full border border-line bg-carbon transition-all duration-300 hover:-translate-y-1 hover:hard-shadow-sm hover:border-transparent">
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
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-acid"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}