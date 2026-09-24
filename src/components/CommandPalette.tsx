"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, NotebookPen, MessageSquareText } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Action = {
  id: string;
  label: string;
  hint: string;
  kind: "nav" | "ask";
  href?: string;
  query?: string;
};

const navActions: Action[] = [
  { id: "about", label: "About", hint: "who is sushan", kind: "nav", href: "#about" },
  { id: "experience", label: "Experience", hint: "what has he shipped", kind: "nav", href: "#experience" },
  { id: "skills", label: "Skills", hint: "the toolkit", kind: "nav", href: "#skills" },
  { id: "projects", label: "Projects", hint: "live work", kind: "nav", href: "#projects" },
  { id: "education", label: "Education", hint: "certs & degrees", kind: "nav", href: "#education" },
  { id: "contact", label: "Contact", hint: "hire / reach out", kind: "nav", href: "#contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) setIndex(0);
          return !v;
        });
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const navs = navActions.filter(
      (a) => !q || a.label.toLowerCase().includes(q) || a.hint.includes(q),
    );
    const asks: Action[] = q
      ? [
          {
            id: "ask",
            label: `ask the bot: "${query.trim()}"`,
            hint: "chat with ?sushan",
            kind: "ask",
            query: query.trim(),
          },
        ]
      : [];
    return [...navs, ...asks];
  }, [query]);

  const run = (action: Action) => {
    if (action.kind === "nav" && action.href) {
      document.querySelector(action.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (action.kind === "ask" && action.query) {
      window.dispatchEvent(
        new CustomEvent("sushan:ask", { detail: action.query }),
      );
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-carbon/80 p-4 pt-[16vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.97, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden border border-line bg-carbon-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="font-mono text-sm text-acid">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="navigate or ask sushan…"
                className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
                aria-label="Command palette"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) run(results[0]);
                  if (e.key === "ArrowDown") setIndex((i) => Math.min(i + 1, results.length - 1));
                  if (e.key === "ArrowUp") setIndex((i) => Math.max(i - 1, 0));
                }}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close palette"
                className="border border-line px-2 py-1 font-mono text-[0.65rem] text-muted transition-colors hover:border-acid hover:text-acid"
              >
                esc
              </button>
            </div>

            <div className="max-h-[40vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center font-mono text-sm text-muted">
                  no matches for “{query}”
                </p>
              )}
              {results.map((action) => {
                const active = action.id === results[index]?.id;
                return (
                  <button
                    key={action.id + action.label}
                    type="button"
                    onMouseEnter={() => setIndex(results.indexOf(action))}
                    onClick={() => run(action)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                      active ? "bg-acid/10" : ""
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {action.kind === "nav" ? (
                        <NotebookPen className="h-4 w-4 shrink-0 text-acid" />
                      ) : (
                        <MessageSquareText className="h-4 w-4 shrink-0 text-vermilion" />
                      )}
                      <span className="truncate text-sm text-ink">
                        {action.label}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="font-mono hidden text-[0.65rem] text-muted sm:block">
                        {action.hint}
                      </span>
                      {action.kind === "nav" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                      ) : (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[0.65rem] text-muted">
              <span>↑↓ navigate · ↵ run · esc close</span>
              <span className="text-acid">⌘k</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}