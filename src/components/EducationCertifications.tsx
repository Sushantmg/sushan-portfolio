import { ExternalLink } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { Reveal, SectionHeading, StaggerGroup, StaggerItem } from "./Reveal";

export function EducationCertifications() {
  return (
    <section id="education" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="05"
          eyebrow="Education & Certifications"
          title={
            <>
              The paperwork behind the{" "}
              <em className="font-light italic text-acid">hustle.</em>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="label mb-5 text-acid">/ education</h3>
            </Reveal>
            <StaggerGroup className="space-y-3">
              {education.map((edu, i) => (
                <StaggerItem key={edu.degree}>
                  <div className="group flex items-start justify-between gap-4 border border-line bg-carbon-2 p-5 transition-colors duration-300 hover:border-acid">
                    <span className="font-mono pt-0.5 text-xs text-muted">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-semibold text-ink">
                        {edu.degree}
                      </h4>
                      <p className="mt-1 text-sm text-muted">{edu.school}</p>
                    </div>
                    <span className="font-mono whitespace-nowrap text-xs text-acid">
                      {edu.period}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div>
            <Reveal>
              <h3 className="label mb-5 text-acid">/ certifications</h3>
            </Reveal>
            <StaggerGroup className="space-y-3">
              {certifications.map((cert, i) => (
                <StaggerItem key={cert.title}>
                  <div className="group flex items-center gap-4 border border-line bg-carbon-2 p-5 transition-colors duration-300 hover:border-acid">
                    <span className="font-mono grid h-8 w-8 shrink-0 place-items-center border border-line text-xs text-acid">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-ink">{cert.title}</h4>
                      <p className="mt-0.5 font-mono text-xs text-muted">
                        {cert.issuer}
                      </p>
                    </div>
                    {cert.verify && (
                      <a
                        href={cert.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${cert.title}`}
                        className="grid h-8 w-8 shrink-0 place-items-center border border-line text-muted transition-colors duration-300 group-hover:border-acid group-hover:text-acid"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}