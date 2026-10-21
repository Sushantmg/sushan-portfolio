"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { noteReadTime, noteSlug, notes } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

export function Journal() {
  const [tag, setTag] = useState<string | null>(null);

  const tags = Array.from(new Set(notes.flatMap((n) => n.tags)));
  const visible = tag ? notes.filter((n) => n.tags.includes(tag)) : notes;

  return (
    <section id="journal" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="06"
          eyebrow="Journal"
          watermark="記"
          sectionId="journal"
          title={
            <>
              Field notes from the{" "}
              <em className="font-light italic text-acid">build log.</em>
            </>
          }
          description="Short entries written while shipping — what worked, what didn't, and why."
        />

        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter journal entries by tag"
        >
          <button
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`border px-3 py-1.5 font-mono text-[0.68rem] transition-colors duration-200 ${
              tag === null
                ? "border-acid bg-acid text-carbon"
                : "border-line text-muted hover:border-acid hover:text-acid"
            }`}
          >
            all · {notes.length}
          </button>
          {tags.map((t) => (
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
              {t.toLowerCase()}
            </button>
          ))}
        </div>

        <div className="border-t border-line">
          {visible.map((note, i) => (
            <Reveal key={note.title} delay={0.04 * i}>
              <article className="group grid gap-3 border-b border-line py-8 transition-colors duration-300 hover:bg-carbon/60 sm:grid-cols-12 sm:gap-6 sm:px-4">
                <div className="font-mono text-xs text-acid sm:col-span-2 sm:pt-1.5">
                  <time dateTime={note.date}>{note.date}</time>
                </div>
                <div className="sm:col-span-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-acid sm:text-2xl">
                      <Link
                        href={`/journal/${noteSlug(note.title)}`}
                        className="inline-flex items-start gap-2"
                      >
                        {note.title}
                        <ArrowUpRight
                          aria-hidden
                          className="mt-1 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acid"
                        />
                      </Link>
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink">
                    {note.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {note.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTag(t)}
                        className="font-mono border border-line bg-carbon px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-muted transition-colors hover:border-acid hover:text-acid"
                      >
                        {t}
                      </button>
                    ))}
                    <span className="font-mono text-[0.62rem] text-muted/60">
                      {noteReadTime(note)} min read
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[0.7rem] text-muted">
            <span className="text-acid">note:</span> more entries coming — this
            log is written between builds.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
