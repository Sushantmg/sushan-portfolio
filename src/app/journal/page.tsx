import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Kamon } from "@/components/Kamon";
import { notes, noteReadTime, noteSlug } from "@/lib/data";
import { RSS_ALTERNATE, siteUrl } from "@/lib/site";

const ordered = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));

const tagCounts = ordered
  .flatMap((note) => note.tags)
  .reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] ?? 0) + 1;
    return acc;
  }, {});

const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

const totalWords = ordered.reduce(
  (sum, note) => sum + note.body.join(" ").trim().split(/\s+/).length,
  0,
);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T09:00:00Z`));

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes and build logs from Sushan Tamang — shipping LLM pipelines, MCP tooling, retrieval systems, and production web platforms.",
  alternates: { canonical: "/journal", ...RSS_ALTERNATE },
  openGraph: {
    title: "Journal · Sushan Tamang",
    description:
      "Field notes and build logs — what actually broke, what I changed, and what I would do differently.",
    url: "/journal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal · Sushan Tamang",
    description:
      "Field notes and build logs — what actually broke, what I changed, and what I would do differently.",
  },
};

export default function JournalIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": siteUrl("/journal#blog"),
        name: "Journal · Sushan Tamang",
        description:
          "Field notes and build logs on AI systems, retrieval, and full-stack engineering.",
        url: siteUrl("/journal"),
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: "Sushan Tamang",
          url: siteUrl("/"),
        },
        blogPost: ordered.map((note) => ({
          "@type": "BlogPosting",
          headline: note.title,
          description: note.excerpt,
          url: siteUrl(`/journal/${noteSlug(note.title)}`),
          datePublished: note.date,
          keywords: note.tags.join(", "),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: siteUrl("/journal"),
          },
        ],
      },
    ],
  };

  return (
    <main className="grain relative min-h-screen">
      <div aria-hidden className="seigaiha fixed inset-0 z-0 opacity-[0.045]" />
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#c7f542_1px,transparent_1px),linear-gradient(to_bottom,#c7f542_1px,transparent_1px)] bg-[size:5rem_1rem] opacity-[0.03]"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative z-10 border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Kamon className="h-8 w-8 text-acid" />
            <span className="font-display text-xl font-bold italic text-ink">
              sushan<span className="text-acid">.</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
          >
            <ArrowLeft className="h-3 w-3" /> back home
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-muted">
          <Link href="/" className="transition-colors hover:text-acid">
            home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-acid">journal</span>
        </nav>

        <h1 className="font-display mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Field notes &{" "}
          <em className="font-light italic text-acid">build logs.</em>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          What actually broke, what I changed, and what I would do differently.
          Written while shipping — not after the fact.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] text-muted">
          <span>
            <span className="text-acid">{ordered.length}</span> entries
          </span>
          <span aria-hidden className="text-line">
            /
          </span>
          <span>
            <span className="text-acid">~{Math.round(totalWords / 1000)}k</span>{" "}
            words
          </span>
          <span aria-hidden className="text-line">
            /
          </span>
          <a
            href="/feed.xml"
            type="application/rss+xml"
            className="text-acid underline underline-offset-2 transition-colors hover:text-ink"
          >
            rss
          </a>
        </div>

        {tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
            {tags.map(([tag, count]) => (
              <li
                key={tag}
                className="border border-line bg-carbon-2 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
              >
                {tag.toLowerCase()}{" "}
                <span className="text-acid">{count}</span>
              </li>
            ))}
          </ul>
        )}

        <ol className="mt-12 space-y-4">
          {ordered.map((note, i) => {
            const slug = noteSlug(note.title);
            return (
              <li key={slug}>
                <Link
                  href={`/journal/${slug}`}
                  className="group flex flex-col gap-3 border border-line bg-carbon p-5 transition-colors duration-300 hover:border-acid sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.65rem] text-muted">
                    <span className="text-acid">
                      {String(ordered.length - i).padStart(2, "0")}
                    </span>
                    <time dateTime={note.date}>{formatDate(note.date)}</time>
                    <span aria-hidden>/</span>
                    <span>{noteReadTime(note)} min read</span>
                  </div>

                  <h2 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-acid sm:text-2xl">
                    {note.title}
                  </h2>

                  <p className="max-w-2xl text-sm leading-relaxed text-muted">
                    {note.excerpt}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                    <span className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.62rem] uppercase tracking-wider text-muted transition-colors group-hover:text-acid"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-muted transition-colors group-hover:text-ink">
                      read
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 border-t border-line pt-6 font-mono text-[0.7rem] text-muted">
          <span className="text-acid">note:</span> the journal is also available
          as{" "}
          <Link
            href="/feed.xml"
            className="text-acid underline underline-offset-2 hover:text-ink"
          >
            RSS
          </Link>{" "}
          and as a{" "}
          <Link
            href="/#journal"
            className="text-acid underline underline-offset-2 hover:text-ink"
          >
            section on the homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
