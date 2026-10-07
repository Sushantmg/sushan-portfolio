"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { projects, slugify } from "@/lib/data";
import { useFocusTrap } from "@/lib/useFocusTrap";

const groups: { kanji: string; label: string; items: [string, string][] }[] = [
  {
    kanji: "全",
    label: "global",
    items: [
      ["⌘K", "command palette — jump anywhere"],
      ["⌘J", "open chat"],
      ["?", "this cheatsheet"],
      ["esc", "close any overlay"],
    ],
  },
  {
    kanji: "話",
    label: "in chat",
    items: [
      ["↵", "send message"],
      ["⇧↵", "new line"],
      ["↑ ↓", "recall past questions"],
      ["/", "focus the input"],
      ["mic", "voice input (tap to talk)"],
    ],
  },
  {
    kanji: "案",
    label: "in case files",
    items: [
      ["1 – 7", "open case file 1–7 instantly"],
      ["← →", "previous / next project"],
      ["esc", "close the case"],
    ],
  },
  {
    kanji: "写",
    label: "copy anywhere",
    items: [
      ["copy link", "on a section heading — shares that section"],
      ["copy link", "inside a case — shares that project"],
      ["copy email", "in the command palette"],
    ],
  },
];

export function Shortcuts({ trigger }: { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (inField || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);

      if (/^[1-9]$/.test(e.key)) {
        const target = projects[Number(e.key) - 1];
        const overlayOpen =
          document.querySelector('[role="dialog"]') !== null ||
          document.querySelector("[data-chat-panel]") !== null;
        if (target && !overlayOpen) {
          e.preventDefault();
          window.location.hash = `#case/${slugify(target.name)}`;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {trigger && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Keyboard shortcuts"
          title="keyboard shortcuts (?)"
          className="font-mono grid h-6 w-6 place-items-center border border-line text-[0.6rem] text-muted transition-colors hover:border-acid hover:text-acid"
        >
          {trigger}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-carbon/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Keyboard shortcuts"
              className="w-full max-w-lg border border-line bg-carbon-2 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="kanji border border-acid px-2 py-0.5 text-sm text-acid">
                    鍵
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Keyboard shortcuts
                    </p>
                    <p className="font-mono text-[0.65rem] text-muted">
                      kbd · the site is faster with hands on keys
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close shortcuts"
                  className="grid h-8 w-8 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-6 px-5 py-5 sm:grid-cols-2">
                {groups.map((g) => (
                  <div key={g.label}>
                    <p className="label mb-3 flex items-center gap-2 text-muted">
                      <span className="kanji text-acid">{g.kanji}</span>
                      {g.label}
                    </p>
                    <ul className="space-y-2">
                      {g.items.map(([key, label]) => (
                        <li
                          key={key}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <kbd className="shrink-0 border border-line bg-carbon px-1.5 py-0.5 font-mono text-[0.65rem] text-ink">
                            {key}
                          </kbd>
                          <span className="text-right text-[0.78rem] text-muted">
                            {label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="border-t border-line px-5 py-3 font-mono text-[0.65rem] text-muted">
                esc or ? to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
