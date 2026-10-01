"use client";

import { Fragment, type ReactNode } from "react";

const INLINE =
  /(\*\*[^*]+\*\*|`[^`]+`|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?:https?:\/\/)?(?:www\.|github\.com\/|linkedin\.com\/)[^\s)]+)/gi;

const LABEL = /^(scope|highlights|stack|commands|jump points.*|sections|projects)$/i;

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, at)}</Fragment>);
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="border border-line bg-carbon px-1 py-px text-[0.78em] text-acid"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.includes("@")) {
      nodes.push(
        <a
          key={key++}
          href={`mailto:${token}`}
          className="text-acid underline decoration-acid/40 underline-offset-2 hover:decoration-acid"
        >
          {token}
        </a>,
      );
    } else {
      const href = token.startsWith("http") ? token : `https://${token}`;
      nodes.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-acid underline decoration-acid/40 underline-offset-2 hover:decoration-acid"
        >
          {token}
        </a>,
      );
    }
    last = at + token.length;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }
  return nodes;
}

function Line({ line, first }: { line: string; first: boolean }) {
  const t = line.trim();

  if (!t) return <div className="h-2" />;
  if (t === "---") return <hr className="my-1 border-line" />;

  if (t.startsWith("//")) {
    return (
      <p className="font-mono text-[0.76rem] italic text-acid/85">
        {inline(t.replace(/^\/\/\s*/, ""))}
      </p>
    );
  }

  if (/^[›•]/.test(t)) {
    return (
      <p className="flex gap-2">
        <span aria-hidden className="text-acid">
          ›
        </span>
        <span className="min-w-0 flex-1">{inline(t.replace(/^[›•]\s*/, ""))}</span>
      </p>
    );
  }

  const bracket = t.match(/^\[\s*(.+?)\s*\]\s*(.*)$/);
  if (bracket) {
    return (
      <p className="flex flex-wrap gap-x-2">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-acid/80">
          {bracket[1]}
        </span>
        <span className="min-w-0 flex-1">{inline(bracket[2])}</span>
      </p>
    );
  }

  if (LABEL.test(t.replace(/:$/, ""))) {
    return (
      <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted/70">
        {t.replace(/:$/, "")}
      </p>
    );
  }

  if (t.startsWith("✓")) {
    return <p className="text-acid/90">{inline(t)}</p>;
  }

  if (/^\d+[.)]\s/.test(t)) {
    return <p className="tabular-nums text-ink/90">{inline(t)}</p>;
  }

  if (first) {
    const featured = t.includes("★");
    const cleaned = t.replace(/\s*·\s*★\s*featured\s*$/, "");
    const [head, ...rest] = cleaned.split(" — ");
    return (
      <p className="font-mono text-[0.8rem] leading-snug">
        <span className="font-semibold text-acid">{inline(head)}</span>
        {featured && (
          <span className="ml-2 border border-acid/50 px-1 py-px align-middle text-[0.52rem] uppercase tracking-[0.18em] text-acid/80">
            featured
          </span>
        )}
        {rest.length > 0 && (
          <span className="text-muted"> — {inline(rest.join(" — "))}</span>
        )}
      </p>
    );
  }

  return <p className="text-ink/90">{inline(t)}</p>;
}

export function MessageText({ text }: { text: string }) {
  return (
    <div className="space-y-1">
      {text.split("\n").map((line, i) => (
        <Line key={i} line={line} first={i === 0} />
      ))}
    </div>
  );
}
