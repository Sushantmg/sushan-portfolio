"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Link2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { slugify, type Project } from "@/lib/data";

const accents: Record<string, string> = {
  "from-violet-500 to-fuchsia-500": "bg-acid",
  "from-cyan-400 to-blue-600": "bg-sky",
  "from-amber-400 to-orange-600": "bg-vermilion",
  "from-emerald-400 to-teal-600": "bg-acid",
  "from-rose-400 to-red-600": "bg-vermilion",
  "from-lime-400 to-green-600": "bg-sky",
  "from-orange-500 to-red-500": "bg-vermilion",
};

export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    scrollRef.current?.scrollTo({ top: 0 });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onPrev, onNext]);

  const copyLink = async () => {
    const slug = slugify(project?.name ?? "");
    const url = `${window.location.origin}${window.location.pathname}#case/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug((cur) => (cur === slug ? null : cur)), 1600);
    } catch {}
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-carbon/90 p-4 backdrop-blur-sm sm:items-center sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-full w-full max-w-2xl overflow-hidden border border-line bg-carbon-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-1.5 ${accents[project.accent] ?? "bg-acid"}`} />
            <div className="flex items-start justify-between border-b border-line px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  {"featured" in project && project.featured ? (
                    <span className="kanji rotate-[-2deg] border border-vermilion/60 px-1.5 py-0.5 text-[0.6rem] text-vermilion">
                      注目
                    </span>
                  ) : (
                    <span className="label text-muted">/ case</span>
                  )}
                </div>
                <h3 className="font-display mt-2 text-3xl font-semibold text-ink">
                  {project.name}
                </h3>
                <p className="label mt-1 text-muted">{project.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                {onPrev && (
                  <button
                    onClick={onPrev}
                    aria-label="Previous project"
                    className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={onNext}
                    aria-label="Next project"
                    className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close project details"
                  className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-6 py-5">
              <p className="text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="label text-acid">/ scope</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="mt-2 font-mono text-xs leading-relaxed text-ink">
                <span className="text-acid">&gt;</span> {project.scope}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="label text-acid">/ highlights</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-1 text-acid">▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2">
                <span className="label text-acid">/ stack</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line px-6 py-3 font-mono text-[0.65rem] text-muted">
              <span>
                {slugify(project.name)} · case file
              </span>
              <span className="flex items-center gap-3">
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-acid"
                >
                  <Link2 className="h-3 w-3" />
                  {copiedSlug === slugify(project.name) ? "copied" : "copy link"}
                </button>
                <span className="text-acid">
                  {onPrev || onNext ? "← → navigate · " : ""}esc close
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}