"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";

const mediaQuery = "(pointer: fine)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(mediaQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function finePointer() {
  return window.matchMedia(mediaQuery).matches;
}
function serverSnapshot() {
  return false;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, finePointer, serverSnapshot);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const hover = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 });

  useEffect(() => {
    document.body.classList.toggle("has-cursor", enabled);
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, textarea, select, [role=button]");
      hover.set(interactive ? 1 : 0);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, hover, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-6 w-6 rounded-full border border-acid"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-acid/20"
          style={{ scale: hover }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1 w-1 bg-acid"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}