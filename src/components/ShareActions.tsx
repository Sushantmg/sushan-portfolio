"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Copy-link + native-share buttons shared by case files and journal entries.
 * Falls back to copying when the Web Share API is unavailable or rejected.
 */
export function ShareActions({
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
    <>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
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
    </>
  );
}
