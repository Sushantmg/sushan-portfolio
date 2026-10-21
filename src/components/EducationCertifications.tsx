"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { certifications, education } from "@/lib/data";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Reveal, SectionHeading, StaggerGroup, StaggerItem } from "./Reveal";
import { IssuerIcon } from "./SkillIcon";

type Cert = (typeof certifications)[number];

export function EducationCertifications() {
  const [active, setActive] = useState<Cert | null>(null);
  const [filter, setFilter] = useState<"all" | "anthropic" | "local">("all");
  const lightboxRef = useRef<HTMLDivElement>(null);

  useFocusTrap(active !== null, lightboxRef);

  const visibleCerts = useMemo(
    () =>
      certifications.filter(
        (c) =>
          filter === "all" ||
          (filter === "anthropic" ? c.issuerIcon === "anthropic" : c.issuerIcon !== "anthropic"),
      ),
    [filter],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = visibleCerts.findIndex((c) => c.title === active.title);
      if (i === -1) return;
      const step = e.key === "ArrowRight" ? 1 : -1;
      setActive(visibleCerts[(i + step + visibleCerts.length) % visibleCerts.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, visibleCerts]);

  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <section id="education" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="05"
          eyebrow="Education & Certifications"
          watermark="学"
          sectionId="education"
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

            <div
              className="mb-4 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter certifications by issuer"
            >
              {(["all", "anthropic", "local"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`label border px-3 py-1.5 transition-colors duration-200 ${
                    filter === f
                      ? "border-acid bg-acid text-carbon"
                      : "border-line text-muted hover:border-acid hover:text-acid"
                  }`}
                >
                  {f}
                </button>
              ))}
              <span className="label ml-auto self-center text-muted">
                {visibleCerts.length} / {certifications.length}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {visibleCerts.map((cert, i) => (
                <StaggerItem key={cert.title} className="sm:contents">
                  {cert.image ? (
                    <button
                      type="button"
                      onClick={() => setActive(cert)}
                      className="group relative flex flex-col overflow-hidden border border-line bg-carbon-2 text-left transition-all duration-300 hover:border-acid hover:hard-shadow-sm"
                      aria-label={`View ${cert.title} certificate`}
                    >
                      <div className="relative aspect-[16/11] w-full overflow-hidden">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-carbon/0 transition-colors duration-300 group-hover:bg-carbon/40">
                          <span className="flex items-center gap-2 border border-acid bg-carbon px-3 py-1.5 font-mono text-[0.7rem] text-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <ZoomIn className="h-3.5 w-3.5" /> view
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-3 p-4">
                        <div>
                          <h4 className="text-sm font-medium leading-snug text-ink">
                            {cert.title}
                          </h4>
                          <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
                            <IssuerIcon issuer={cert.issuerIcon ?? ""} className="h-3.5 w-3.5 text-acid" />
                            {cert.issuer}
                          </p>
                        </div>
                        {cert.verify && (
                          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-colors duration-300 group-hover:text-acid" />
                        )}
                      </div>
                    </button>
                  ) : (
                    <div className="group flex items-center gap-3 border border-line bg-carbon-2 p-4 transition-colors duration-300 hover:border-acid">
                      <span className="font-mono grid h-8 w-8 shrink-0 place-items-center border border-line text-xs text-acid">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium leading-snug text-ink">
                          {cert.title}
                        </h4>
                        <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
                          <IssuerIcon issuer={cert.issuerIcon ?? ""} className="h-3.5 w-3.5 text-acid" />
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
                  )}
                </StaggerItem>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-5 font-mono text-[0.7rem] text-muted">
                <span className="text-acid">tip:</span> click a certificate to
                view it full-size
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-carbon/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-3xl overflow-hidden border border-line bg-carbon-2"
              onClick={(e) => e.stopPropagation()}
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} certificate preview`}
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{active.title}</p>
                  <p className="font-mono text-xs text-muted">{active.issuer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mr-1 font-mono text-[0.65rem] text-muted">
                    {visibleCerts.findIndex((c) => c.title === active.title) + 1} /{" "}
                    {visibleCerts.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const i = visibleCerts.findIndex((c) => c.title === active.title);
                      setActive(visibleCerts[(i - 1 + visibleCerts.length) % visibleCerts.length]);
                    }}
                    aria-label="Previous certificate"
                    className="grid h-8 w-8 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const i = visibleCerts.findIndex((c) => c.title === active.title);
                      setActive(visibleCerts[(i + 1) % visibleCerts.length]);
                    }}
                    aria-label="Next certificate"
                    className="grid h-8 w-8 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {active.verify && (
                    <a
                      href={active.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-xs text-acid transition-colors hover:border-acid"
                    >
                      verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <button
                    onClick={() => setActive(null)}
                    aria-label="Close preview"
                    className="font-mono grid h-8 w-8 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-auto">
                {active.image && (
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={1600}
                    height={1131}
                    className="h-auto w-full"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}