import { experience, projectsForCompany, slugify } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-line bg-carbon-2 py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          watermark="行"
          sectionId="experience"
          title={
            <>
              Shipped work,{" "}
              <em className="font-light italic text-acid">not theory.</em>
            </>
          }
        />

        <div className="border-t border-line">
          {experience.map((item, i) => {
            const cases = projectsForCompany(item.company);
            return (
            <Reveal key={item.company} delay={0.04 * i}>
              <div className="group grid gap-2 border-b border-line py-8 transition-colors duration-300 hover:bg-carbon/60 sm:grid-cols-12 sm:gap-6 sm:px-4">
                <div className="font-mono text-xs text-acid sm:col-span-1 sm:pt-1.5">
                  0{i + 1}
                </div>
                <div className="sm:col-span-5 sm:pt-1.5">
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {item.company}
                  </h3>
                  <p className="label mt-1 text-muted">{item.role}</p>
                  {"current" in item && item.current && (
                    <span className="mt-2 inline-flex items-center gap-2 font-mono text-[0.62rem] text-acid">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
                      </span>
                      current — 2026
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 bg-acid" />
                        <span className="transition-colors duration-300 group-hover:text-ink">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono border border-line bg-carbon px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {cases.map((c) => (
                      <a
                        key={c.name}
                        href={`#case/${slugify(c.name)}`}
                        className="font-mono inline-flex items-center gap-1 border border-acid/40 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-acid transition-colors duration-200 hover:bg-acid hover:text-carbon"
                      >
                        {c.name} case
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}