"use client";

import { Printer } from "lucide-react";
import Link from "next/link";

export function CvToolbar() {
  return (
    <div className="cv-toolbar mb-4 flex flex-wrap items-center justify-between gap-3">
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-[#d3d1c4] bg-[#fbfaf6] px-3 py-2 font-mono text-xs text-[#3d4136] transition-colors hover:border-[#171a14] hover:text-[#171a14]"
      >
        <span aria-hidden>←</span> back to site
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-[0.7rem] text-[#6b7060] sm:inline">
          want it on paper?
        </span>
        <button
          onClick={() => window.print()}
          aria-label="Print résumé"
          title="Print / save as PDF"
          className="inline-flex items-center gap-2 border border-[#171a14] bg-[#171a14] px-4 py-2 font-mono text-xs font-semibold text-[#c7f542] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Printer className="h-3.5 w-3.5" /> save as pdf
        </button>
      </div>
    </div>
  );
}