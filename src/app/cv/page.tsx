import type { Metadata } from "next";
import {
  certifications,
  education,
  experience,
  languages,
  profile,
  projects,
  skillGroups,
} from "@/lib/data";
import { CvToolbar } from "./CvToolbar";

export const metadata: Metadata = {
  title: "CV",
  description: `${profile.name} — ${profile.role} based in ${profile.location}. Experience, projects, skills, education, and certifications in a print-ready résumé.`,
  alternates: { canonical: "/cv" },
};

const INK = "#171a14";

function Block({
  kanji,
  title,
  children,
}: {
  kanji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cv-block mt-7 break-inside-avoid">
      <div className="mb-3 flex items-center gap-3 border-b border-[#dedcd0] pb-2">
        <span className="kanji border border-[#d94f43]/50 px-1.5 py-0.5 text-[0.62rem] text-[#d94f43]">
          {kanji}
        </span>
        <h2 className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#3d4136]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function CvPage() {
  const contact = [
    profile.email,
    profile.phone,
    profile.location,
    "github.com/Sushantmg",
    "linkedin.com/in/sushan-tamang-9406712b1",
  ];

  return (
    <main className="cv-main min-h-screen bg-[#eceadf] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-[860px]">
        <CvToolbar />

        <article className="cv-sheet border border-[#dedcd0] bg-[#fbfaf6] p-6 shadow-2xl sm:p-11">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-[2.6rem]">
                {profile.name}
              </h1>
              <p className="mt-1 font-mono text-sm font-medium uppercase tracking-[0.18em] text-[#4f8a1f]">
                {profile.role}
              </p>
            </div>
            <span className="hanko grid h-12 w-12 rotate-[-6deg] place-items-center border-2 border-[#d94f43] text-lg text-[#d94f43]">
              履
            </span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.72rem] text-[#5d6154]">
            {contact.map((item) => (
              <li key={item} className="after:ml-5 after:text-[#c9c7ba] last:after:content-['']">
                {item}
              </li>
            ))}
          </ul>

          <Block kanji="要" title="Profile">
            <p className="text-[0.92rem] leading-relaxed text-[#31352b]">
              {profile.summary}
            </p>
          </Block>

          <Block kanji="行" title="Experience">
            <ol className="space-y-5">
              {experience.map((item, i) => (
                <li key={item.company} className="grid gap-2 sm:grid-cols-12">
                  <div className="font-mono text-[0.68rem] text-[#5d6154] sm:col-span-3">
                    <span className="text-[#d94f43]">0{i + 1}</span>
                    {"current" in item && item.current && (
                      <span className="ml-2 border border-[#4f8a1f]/40 px-1 py-0.5 text-[0.6rem] uppercase tracking-wider text-[#4f8a1f]">
                        current
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-9">
                    <p className="font-display text-[1.02rem] font-semibold leading-tight">
                      {item.company}
                    </p>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#5d6154]">
                      {item.role}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-[0.85rem] leading-relaxed text-[#31352b]"
                        >
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 bg-[#4f8a1f]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#dedcd0] bg-[#f2f0e7] px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-[#5d6154]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block kanji="作" title={`Selected work — ${projects.length} projects`}>
            <ul className="divide-y divide-[#eae8dd]">
              {projects.map((p) => (
                <li key={p.name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-2">
                  <span className="font-display text-[0.95rem] font-semibold">
                    {p.name}
                    <span className="ml-2 font-sans text-[0.8rem] font-normal text-[#5d6154]">
                      — {p.tagline}
                    </span>
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-wider text-[#7b7f6f]">
                    {p.tags.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <div className="grid gap-6 sm:grid-cols-2">
            <Block kanji="技" title="Skills">
              <dl className="space-y-2">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <dt className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#4f8a1f]">
                      {group.label}
                    </dt>
                    <dd className="text-[0.85rem] leading-relaxed text-[#31352b]">
                      {group.skills.join(", ")}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#4f8a1f]">
                    Languages
                  </dt>
                  <dd className="text-[0.85rem] leading-relaxed text-[#31352b]">
                    {languages.join(", ")}
                  </dd>
                </div>
              </dl>
            </Block>

            <div>
              <Block kanji="学" title="Education">
                <ul className="space-y-2">
                  {education.map((e) => (
                    <li key={e.degree} className="text-[0.85rem] leading-relaxed text-[#31352b]">
                      <span className="font-semibold">{e.degree}</span>
                      <span className="block font-mono text-[0.68rem] text-[#5d6154]">
                        {e.school} · {e.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block kanji="証" title={`Certifications — ${certifications.length}`}>
                <ul className="space-y-1.5">
                  {certifications.map((c) => (
                    <li
                      key={c.title}
                      className="flex items-baseline justify-between gap-3 text-[0.82rem] text-[#31352b]"
                    >
                      <span>
                        {c.title}
                        <span className="text-[#7b7f6f]"> — {c.issuer}</span>
                      </span>
                      {c.verify && (
                        <span className="shrink-0 font-mono text-[0.58rem] uppercase tracking-wider text-[#4f8a1f]">
                          verified
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#dedcd0] pt-3 font-mono text-[0.62rem] text-[#7b7f6f]">
            <span>Project case files &amp; full write-ups available in the portfolio</span>
            <span style={{ color: INK }}>
              {profile.name} · {profile.role}
            </span>
          </footer>
        </article>
      </div>
    </main>
  );
}