"use client";

import { Printer } from "lucide-react";

export function PrintCv() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Print résumé"
      title="Print / save as PDF"
      className="ml-2 inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[0.65rem] text-muted transition-colors duration-200 hover:border-acid hover:text-acid"
    >
      <Printer className="h-3 w-3" /> print
    </button>
  );
}