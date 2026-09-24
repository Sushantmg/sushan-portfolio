"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "> init portfolio…",
  "> importing next.js · typescript · tailwind",
  "> mounting: hero · about · projects · contact",
  "> sushan@dev:~$",
];

export function Preloader() {
  const [lines, setLines] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLines((l) => (l >= bootLines.length ? l : l + 1));
    }, 230);
    const exitTimer = setTimeout(() => setShow(false), 1650);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-center gap-3 bg-carbon px-8 sm:px-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-bold italic text-acid sm:text-6xl"
          >
            s.
          </motion.p>
          <div className="font-mono text-xs leading-6 text-muted sm:text-sm">
            {bootLines.slice(0, lines).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.p>
            ))}
            <p className="text-acid">
              sushan@dev:~$ <span className="caret font-bold">▍</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}