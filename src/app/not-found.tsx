import type { Metadata } from "next";
import Link from "next/link";
import { Kamon } from "@/components/Kamon";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div
        aria-hidden
        className="fixed inset-0 bg-[linear-gradient(to_right,#c7f542_1px,transparent_1px),linear-gradient(to_bottom,#c7f542_1px,transparent_1px)] bg-[size:5rem_1rem] opacity-[0.03]"
      />
      <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-acid/10 blur-[110px]" />

      <Kamon className="h-20 w-20 text-acid/80" />
      <p className="label mt-8 text-acid">/ 404</p>
      <h1 className="font-display mt-4 text-5xl font-bold italic text-ink sm:text-7xl">
        道迷い<span className="text-acid">.</span>
      </h1>
      <span className="tategaki kanji mt-6 text-2xl text-vermilion">迷子</span>
      <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
        lost on the path —{" "}
        <span className="text-ink">michimayoi</span>. this page doesn&apos;t
        exist, but the way home is close.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-acid px-6 py-3 text-sm font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5"
        >
          帰る home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 border border-line bg-carbon-2 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-acid hover:text-acid"
        >
          see work
        </Link>
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 border border-line bg-carbon-2 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-acid hover:text-acid"
        >
          field notes
        </Link>
      </div>
    </main>
  );
}