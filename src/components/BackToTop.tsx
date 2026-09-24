"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
  });

  return (
    <motion.a
      href="#top"
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center border border-line bg-carbon-2 text-muted transition-colors duration-200 hover:border-acid hover:text-acid"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.a>
  );
}