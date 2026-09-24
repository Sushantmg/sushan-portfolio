"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const links = [
  { label: "About", href: "#about", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Skills", href: "#skills", index: "03" },
  { label: "Projects", href: "#projects", index: "04" },
  { label: "Education", href: "#education", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

const KANJI = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const kanjiOf = (index: string) => KANJI[(parseInt(index, 10) || 1) - 1];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col items-center justify-between border-r border-line bg-carbon-2 py-6"
        >
          <motion.span
            className="absolute left-1 top-0 h-full w-[2px] origin-top bg-acid/70"
            style={{ scaleY: progress }}
          />

          <div className="relative flex flex-col items-center gap-3">
            <span className="hanko h-9 w-9 rotate-[-6deg] text-base">
              山
            </span>
            <svg viewBox="0 0 48 48" className="enso absolute -inset-1 h-12 w-12" aria-hidden>
              <path
                d="M24 44c-11-0.5-19.5-8.5-20-19.5S11.5 4.5 23 5s18.5 7.5 19.5 17C43.5 31 39 41 29.5 42.5"
                fill="none"
                stroke="#ff6a44"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <a
              href="#top"
              className="font-display grid h-10 w-10 place-items-center border border-line text-lg font-bold italic text-ink transition-colors hover:border-acid hover:text-acid"
              aria-label="Top"
            >
              s.
            </a>
          </div>

          <nav className="flex flex-col items-center gap-5">
            {links.map((link) => {
              const isActive = link.href === `#${active}`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative flex items-center"
                  aria-label={link.label}
                  title={`${link.index}. ${link.label}`}
                >
                  <span
                    className={`label absolute left-0 ml-[-6.5rem] flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "text-acid"
                        : "text-transparent group-hover:text-acid"
                    }`}
                  >
                    <span className="kanji text-acid">
                      {kanjiOf(link.index)}
                    </span>
                    <span className="font-mono text-[0.55rem] text-muted">
                      /{link.index}
                    </span>
                    {link.label}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 transition-all duration-200 group-hover:scale-150 group-hover:bg-acid ${
                      isActive ? "scale-150 bg-acid" : "bg-muted"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col items-center gap-3">
            <span className="select-none border border-line px-1.5 py-1 font-mono text-[0.6rem] text-muted">
              ⌘k
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-acid"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-acid"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <span className="h-10 w-px bg-line" />
          </div>
        </motion.aside>
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 lg:hidden"
      >
        <div
          className={`border-b border-line transition-colors duration-300 ${
            scrolled ? "bg-carbon/90 backdrop-blur" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-3.5">
            <a href="#top" className="font-display text-xl font-bold italic text-ink">
              sushan<span className="text-acid">.</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center border border-line text-ink"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          <motion.div
            className="h-[2px] origin-left bg-acid"
            style={{ scaleX: progress }}
          />

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-line"
              >
                <nav className="flex flex-col px-5 py-2">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 border-b border-line/60 py-3.5 last:border-0"
                    >
                      <span className="label text-acid">{kanjiOf(link.index)}</span>
                      <span className="text-sm font-medium text-ink">
                        {link.label}
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-muted" />
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}