import { projectsUsingSkill, skillGroups, slugify } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { SkillIcon } from "./SkillIcon";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          watermark="道"
          sectionId="skills"
          title={
            <>
              The toolkit I{" "}
              <em className="font-light italic text-acid">actually use.</em>
            </>
          }
          description="Languages, frameworks, and infrastructure — everything I reach for when a build starts."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const proof = Array.from(
              new Map(
                group.skills
                  .flatMap((skill) => projectsUsingSkill(skill))
                  .map((p) => [p.name, p]),
              ).values(),
            );
            return (
            <Reveal key={group.label} delay={0.05 * i}>
              <div className="group flex h-full flex-col border border-line bg-carbon-2 p-6 transition-colors duration-300 hover:border-acid">
                <div className="flex items-baseline justify-between">
                  <h3 className="label text-acid">{group.label}</h3>
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 border border-line bg-carbon px-2.5 py-1.5 text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-acid hover:text-acid"
                    >
                      <SkillIcon skill={skill} className="h-4 w-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-acid" />
                      {skill}
                    </span>
                  ))}
                </div>
                {proof.length > 0 && (
                  <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-3 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                    <span>in the wild</span>
                    {proof.map((p) => (
                      <a
                        key={p.name}
                        href={`#case/${slugify(p.name)}`}
                        className="inline-flex items-center gap-0.5 text-acid transition-colors hover:text-ink"
                      >
                        {p.name}
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </a>
                    ))}
                  </p>
                )}
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}