"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, roles } from "@/lib/data";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Kamon } from "./Kamon";
import { DayProgress } from "./DayProgress";
import { LiveClock } from "./LiveClock";
import { Magnetic } from "./Magnetic";
import { SkillIcon } from "./SkillIcon";
import { TiltCard } from "./TiltCard";

const responseLine =
  "sushan — full-stack & AI dev. RAG, MCP, MERN, Next.js. Open to work.";

function TerminalCard() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const commandDone = command === "whoami";

  useEffect(() => {
    const interval = setInterval(() => {
      setCommand((prev) =>
        prev.length < "whoami".length ? "whoami".slice(0, prev.length + 1) : prev,
      );
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!commandDone) return;
    const interval = setInterval(() => {
      setResponse((prev) =>
        prev.length < responseLine.length
          ? responseLine.slice(0, prev.length + 1)
          : prev,
      );
    }, 18);
    return () => clearInterval(interval);
  }, [commandDone]);

  return (
    <div className="hard-shadow border border-line bg-carbon-2 text-left">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-vermilion" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f4c95d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-acid" />
        </div>
        <span className="label text-muted">sushan@dev: ~/portfolio</span>
        <span className="label text-muted">zsh</span>
      </div>
      <div className="min-h-[148px] px-4 py-4 font-mono text-sm leading-8">
        <p className="text-muted">
          <span className="text-acid">sushan@dev</span>:~$ {command}
          <span className="caret ml-0.5 text-acid">▍</span>
        </p>
        {commandDone && (
          <p className="text-muted">
            <span className="text-acid">sushan@dev</span>:~${" "}
            <span className="text-ink">{response}</span>
            {response.length === responseLine.length && (
              <span className="caret ml-0.5 text-acid">▍</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.35em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Line({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <span className="-mt-[0.1em] block overflow-hidden pb-[0.12em]">
      <motion.span
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const [photoOpen, setPhotoOpen] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  useFocusTrap(photoOpen, photoRef);

  useEffect(() => {
    if (!photoOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhotoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [photoOpen]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden pt-16 lg:pt-0 lg:pl-16"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-12 sm:px-8 lg:px-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-24 h-80 w-80 rounded-full bg-acid/10 blur-[110px]"
        />
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5"
            >
              <Kamon className="h-11 w-11 text-acid/75" />
            </motion.div>
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display mb-8 flex max-w-xl items-start gap-3 border-l-2 border-acid pl-4 text-lg font-light italic leading-snug text-muted"
            >
              <span aria-hidden className="font-display -mt-1 text-4xl font-bold not-italic text-acid">
                “
              </span>
              <span>
                The best way to predict the future is to invent it.
                <footer className="label mt-2 not-italic text-muted">
                  — Alan Kay
                </footer>
              </span>
            </motion.blockquote>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display max-w-3xl text-[2.9rem] font-semibold leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-8xl"
              style={{ y: yText }}
            >
              <Line delay={0.1}>
                Sushan <em className="font-light italic text-acid">Tamang.</em>
              </Line>
              <Line delay={0.22}>
                <span className="text-muted">I build</span> software{" "}
                <em className="font-light italic text-ink">with a brain.</em>
              </Line>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              <p>
              Full-stack developer engineering production-grade AI
              applications — RAG pipelines, MCP agents, real-time web
              systems — from Pokhara, Nepal. I turn messy problems into{" "}
              <span className="text-ink">fast, intuitive, deployable</span>{" "}
              software.
              </p>
              <p className="mt-5 flex items-center gap-3 font-mono text-[0.65rem] text-muted">
                <span className="hanko h-8 w-8 rotate-[-5deg] text-sm">
                  山
                </span>
                <span className="tategaki kanji text-[0.9rem] text-vermilion">
                  一期一会
                </span>
                <span className="text-muted">
                  every meeting, one chance — let&apos;s make it count
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 font-mono text-sm text-ink sm:text-base"
            >
              <span className="text-acid">❯</span>{" "}
              <span className="text-muted">currently</span>{" "}
              <RoleRotator />{" "}
              <span className="caret font-bold text-acid">▍</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[0.65rem]"
            >
              <span className="inline-flex items-center gap-1.5 border border-line bg-carbon-2 px-2.5 py-1.5 text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
                open to work · 2026
              </span>
              <span className="text-muted">
                合 pokhara, nepal <span className="text-acid">/</span> npt
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-acid px-6 py-3 text-sm font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5"
              >
                View work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-line bg-carbon-2 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-acid hover:text-acid"
              >
                Get in touch
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 border border-line bg-carbon-2 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-acid hover:text-acid"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="ml-1 hidden items-center gap-3 sm:flex">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-14 max-w-md"
            >
              <TerminalCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 hidden flex-wrap items-center gap-x-8 gap-y-2 font-mono text-xs text-muted lg:flex"
            >
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 bg-acid" />
                B.Sc. Software Engineering · GCES, Pokhara
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 bg-acid" />
                RAG · MCP · MERN · LangChain
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 bg-acid" />
                Open to internships & freelance
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 animate-pulse bg-acid" />
                <LiveClock timeZone="Asia/Kathmandu" />
                <span className="text-muted">:: NPT</span>
              </span>
              <DayProgress />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="mx-auto w-full max-w-[340px] lg:max-w-[380px]">
              <TiltCard className="group relative rotate-2 transition-transform duration-500 hover:rotate-0">
                <div className="pointer-events-none absolute -inset-2 -z-10 border border-acid/60" />
                <button
                  type="button"
                  onClick={() => setPhotoOpen(true)}
                  aria-label="View full photo"
                  className="relative block aspect-[9/16] w-full cursor-zoom-in overflow-hidden border border-line bg-carbon-2"
                >
                  <Image
                    src="/images/drone.jpg"
                    alt="Aerial shot of Sushan from above, captured with a DJI drone"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 340px"
                    className="object-cover grayscale contrast-105 transition-all duration-700 group-hover:grayscale-0"
                  />
                  <span className="absolute bottom-3 right-3 grid place-items-center border border-acid bg-carbon/90 px-2 py-1 font-mono text-[0.6rem] text-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    view full
                  </span>
                </button>
              </TiltCard>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-6 left-8 hidden lg:block"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted"
          >
            <span className="label">scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </motion.div>

      <div className="relative z-10 border-t border-line bg-carbon-2 py-3.5">
        <div className="flex overflow-hidden">
          <div className="ticker flex shrink-0 items-center gap-8 pr-8">
            {Array.from({ length: 3 }).flatMap((_, copy) =>
              [
                "TypeScript",
                "React",
                "Next.js",
                "RAG",
                "MCP",
                "LangChain",
                "Node.js",
                "Python",
                "MongoDB",
                "Prisma",
                "Docker",
                "AWS",
              ].map((item, i) => (
                <span
                  key={`${copy}-${item}-${i}`}
                  className="font-mono flex items-center gap-8 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-muted"
                >
                  <span className="flex items-center gap-2">
                    <SkillIcon skill={item} className="h-3.5 w-3.5 text-acid" />
                    {item}
                  </span>
                  <span>/</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {photoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-carbon/95 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setPhotoOpen(false)}
          >
            <motion.figure
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              ref={photoRef}
              role="dialog"
              aria-modal="true"
              aria-label="Full-size photo"
            >
              <div className="relative aspect-[9/16] overflow-hidden border border-line">
                <Image
                  src="/images/drone.jpg"
                  alt="Full-size aerial shot of Sushan from above, captured with a DJI drone"
                  fill
                  sizes="(min-width: 768px) 28vw, 90vw"
                  className="object-cover"
                />
                <span aria-hidden className="kanji pointer-events-none absolute right-3 top-3 text-2xl text-acid/40">
                  飛
                </span>
              </div>
              <figcaption className="flex items-center justify-between border-x border-b border-line bg-carbon-2 px-3 py-2 font-mono text-[0.65rem] text-muted">
                <span className="text-acid">pokhara · 2026</span>
                <span className="flex items-center gap-3">
                  <span className="text-acid">esc</span> close
                </span>
              </figcaption>
              <button
                onClick={() => setPhotoOpen(false)}
                aria-label="Close photo"
                className="absolute -top-3 -right-3 grid h-8 w-8 place-items-center border border-line bg-carbon text-muted transition-colors hover:border-acid hover:text-acid"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}