"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24 lg:pt-0 lg:pl-16"
    >
      <motion.span
        aria-hidden
        className="font-display pointer-events-none absolute -right-10 top-6 select-none text-[20rem] font-black italic leading-none text-carbon-2 lg:text-[26rem]"
        style={{ transform: yText }}
      >
        st
      </motion.span>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 sm:px-8 lg:px-14"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="label mb-7 flex items-center gap-3"
        >
          <span className="inline-block h-2 w-2 bg-acid" />
          Portfolio · 2023 → 2027
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-4xl text-[2.9rem] font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ y: yText }}
        >
          Sushan{" "}
          <em className="font-light italic text-acid">Tamang.</em>
          <br />
          <span className="text-muted">I build</span> software{" "}
          <em className="font-light italic text-ink">with a brain.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Full-stack developer engineering production-grade AI applications —
          RAG pipelines, MCP agents, real-time web systems — from Pokhara,
          Nepal. I turn messy problems into{" "}
          <span className="text-ink">fast, intuitive, deployable</span> software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-acid px-6 py-3 text-sm font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5"
          >
            View work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-line bg-carbon-2 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-acid hover:text-acid"
          >
            Get in touch
          </a>
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
          className="mt-12 hidden items-center gap-8 font-mono text-xs text-muted sm:flex"
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
        </motion.div>

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
            {Array.from({ length: 3 }).flatMap(() =>
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
                  key={`${item}-${i}`}
                  className="font-mono flex items-center gap-8 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-muted"
                >
                  {item}
                  <span className="text-acid">/</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}