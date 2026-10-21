"use client";

import { Check, ExternalLink, Link2, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CaseActions({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const share = async () => {
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        return;
      }
    } catch {}
    await copy();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
      >
        {copied ? <Check className="h-3 w-3" /> : <Link2 className="h-3 w-3" />}
        {copied ? "copied" : "copy link"}
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
      >
        <Share2 className="h-3 w-3" /> share
      </button>
      <a
        href={`/#case/${url.split("/").pop() ?? ""}`}
        className="inline-flex items-center gap-1.5 border border-acid bg-acid px-3 py-2 font-mono text-[0.68rem] font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5"
      >
        <ExternalLink className="h-3 w-3" /> open in site
      </a>
    </div>
  );
}
