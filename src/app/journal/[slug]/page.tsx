import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Kamon } from "@/components/Kamon";
import { ReadingProgress } from "@/components/ReadingProgress";
import {
  notes,
  noteBySlug,
  noteReadTime,
  noteSlug,
  slugify,
} from "@/lib/data";
import { siteUrl, RSS_ALTERNATE } from "@/lib/site";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: noteSlug(n.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return { title: "Note not found" };

  return {
    title: note.title,
    description: note.excerpt,
    alternates: { canonical: `/journal/${slug}`, ...RSS_ALTERNATE },
    openGraph: {
      title: `${note.title} · Sushan Tamang`,
      description: note.excerpt,
      url: `/journal/${slug}`,
      type: "article",
      publishedTime: `${note.date}T09:00:00Z`,
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} · Sushan Tamang`,
      description: note.excerpt,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) notFound();

  const ordered = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));
  const position = ordered.findIndex((n) => n.title === note.title);
  // Chronological, so these must not wrap around: at the ends there is
  // simply nothing newer or nothing older.
  const newer = position > 0 ? ordered[position - 1] : undefined;
  const older =
    position < ordered.length - 1 ? ordered[position + 1] : undefined;

  const url = siteUrl(`/journal/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: note.title,
        description: note.excerpt,
        datePublished: note.date,
        dateModified: note.date,
        url,
        keywords: note.tags.join(", "),
        wordCount: note.body.join(" ").trim().split(/\s+/).length,
        author: {
          "@type": "Person",
          name: "Sushan Tamang",
          url: siteUrl("/"),
        },
        publisher: {
          "@type": "Person",
          name: "Sushan Tamang",
          url: siteUrl("/"),
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
          {
            "@type": "ListItem",
            position: 3,
            name: note.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="grain relative min-h-screen">
      <ReadingProgress />
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
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Kamon className="h-8 w-8 text-acid" />
            <span className="font-display text-xl font-bold italic text-ink">
              sushan<span className="text-acid">.</span>
            </span>
          </Link>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
          >
            <ArrowLeft className="h-3 w-3" /> all notes
          </Link>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-2 text-muted">
          <Link href="/" className="transition-colors hover:text-acid">
            home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/journal" className="transition-colors hover:text-acid">
            journal
          </Link>
        </nav>

        <time
          dateTime={note.date}
          className="mt-8 block font-mono text-xs text-acid"
        >
          {note.date}
        </time>

        <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {note.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {note.tags.map((t) => (
            <span
              key={t}
              className="border border-line bg-carbon-2 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
            >
              {t}
            </span>
          ))}
          <span className="font-mono text-[0.65rem] text-muted">
            {noteReadTime(note)} min read
          </span>
        </div>

        <p className="font-display mt-10 border-l-2 border-acid pl-5 text-xl font-light italic leading-snug text-muted">
          {note.excerpt}
        </p>

        <div className="mt-10 space-y-6">
          {note.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-[1.02rem] leading-[1.8] text-ink/90"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {(newer || older) && (
          <nav
            aria-label="Note navigation"
            className="mt-16 grid gap-4 border-t border-line pt-6 sm:grid-cols-2"
          >
            {newer ? (
              <Link
                href={`/journal/${slugify(newer.title)}`}
                className="group flex flex-col border border-line bg-carbon-2 p-4 transition-colors duration-300 hover:border-acid"
              >
                <span className="label text-muted">newer</span>
                <span className="font-display mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-acid">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link
                href={`/journal/${slugify(older.title)}`}
                className="group flex flex-col border border-line bg-carbon-2 p-4 transition-colors duration-300 hover:border-acid sm:text-right"
              >
                <span className="label text-muted">older</span>
                <span className="font-display mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-acid">
                  {older.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <p className="mt-10 font-mono text-[0.7rem] text-muted">
          <span className="text-acid">note:</span> part of the build log —{" "}
          <Link
            href="/feed.xml"
            className="text-acid underline underline-offset-2 hover:text-ink"
          >
            subscribe via RSS
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
