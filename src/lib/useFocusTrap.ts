"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  active: boolean,
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;

    const previous = document.activeElement as HTMLElement | null;
    const first = root.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === firstEl || !root.contains(current))) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && current === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [active, ref]);
}