"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  { kanji: "一", label: "About", href: "#about" },
  { kanji: "三", label: "Skills", href: "#skills" },
  { kanji: "四", label: "Projects", href: "#projects" },
  { kanji: "六", label: "Contact", href: "#contact" },
];

export function MobileDock() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 140 && y > last + 8) setHidden(true);
      else if (y < last - 8) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = items.map((i) => i.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      style={{ x: "-50%" }}
      initial={false}
      animate={{ y: hidden ? "6rem" : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 lg:hidden"
      aria-label="Quick navigation"
    >
      <div className="flex items-center gap-1 border border-line bg-carbon-2/95 p-1.5 backdrop-blur">
        {items.map((item) => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              title={item.label}
              className={`grid w-12 place-items-center py-2.5 font-mono text-sm transition-colors duration-200 ${
                isActive
                  ? "text-acid"
                  : "text-muted hover:text-acid"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center border transition-colors duration-200 ${
                  isActive
                    ? "border-acid bg-acid/10"
                    : "border-transparent"
                }`}
              >
                <span className="kanji">{item.kanji}</span>
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}