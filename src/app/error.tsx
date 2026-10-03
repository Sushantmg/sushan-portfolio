"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-carbon px-5 py-24">
      <div className="w-full max-w-lg border border-line bg-carbon-2 p-8 text-center">
        <span className="kanji border border-vermilion/60 px-2 py-0.5 text-sm text-vermilion">
          崩
        </span>
        <h1 className="font-display mt-5 text-4xl font-semibold text-ink">
          Something{" "}
          <em className="font-light italic text-acid">broke.</em>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          An unexpected error hit this page — the seal broke. Try again, and if
          it keeps happening, email{" "}
          <a
            href="mailto:sushantmg2004@gmail.com"
            className="text-acid underline decoration-acid/40 underline-offset-2 hover:decoration-acid"
          >
            sushantmg2004@gmail.com
          </a>
          .
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[0.65rem] text-muted/60">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-acid px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-carbon transition-transform duration-200 hover:-translate-y-0.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> try again
          </button>
          <Link
            href="/"
            className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-acid hover:text-acid"
          >
            back home
          </Link>
        </div>
      </div>
    </main>
  );
}
