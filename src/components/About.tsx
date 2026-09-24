import { profile } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

const stats = [
  { value: "10+", label: "marketplaces scraped" },
  { value: "07", label: "certs & diplomas" },
  { value: "06", label: "production projects" },
  { value: "03", label: "LLM integrations" },
];

const focuses = [
  { title: "AI & LLM engineering", desc: "RAG pipelines, MCP tooling, and agents shipped in real products." },
  { title: "Scalable web platforms", desc: "Multi-service MERN & Next.js architectures with clean system design." },
  { title: "Security-first systems", desc: "JWT auth, sessions, and strict file-boundary models by default." },
  { title: "Fast, human UI", desc: "Interfaces that feel obvious — backed by performance discipline." },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Software that has{" "}
              <em className="font-light italic text-acid">a brain</em>
              — that&apos;s the whole point.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-2xl text-lg leading-relaxed text-ink sm:text-2xl">
                {profile.summary}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 border-l-2 border-acid pl-5">
                <p className="label text-muted">languages</p>
                <p className="mt-2 font-mono text-sm text-ink">
                  English / Nepali — fluent in both, friendly in all.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1">
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <div className="border border-line bg-carbon-2 p-5">
                    <p className="font-display text-4xl font-semibold text-acid">
                      {stat.value}
                    </p>
                    <p className="label mt-2 text-muted">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="hidden flex-col gap-3 lg:flex">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <div className="flex items-center justify-between border border-line bg-carbon-2 px-5 py-4">
                    <p className="font-display text-5xl font-semibold text-acid">
                      {stat.value}
                    </p>
                    <p className="label text-muted">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {focuses.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full border border-line p-6 transition-colors duration-300 hover:bg-carbon-2">
                <p className="font-mono text-xs text-muted">0{i + 1}.</p>
                <h3 className="font-display mt-3 text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-acid">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}