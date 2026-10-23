"use client";

import { motion, useInView } from "framer-motion";
import { Link2 } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(6px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

const KANJI = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const KANJI_READING = ["いち", "に", "さん", "よん", "ご", "ろく", "しち", "はち", "きゅう", "じゅう"];

function CopyAnchor({ target }: { target: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${target}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <button
      onClick={copy}
      aria-label={`Copy link to ${target}`}
      title="Copy section link"
      className={`ml-auto inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.6rem] transition-colors duration-200 ${
        copied
          ? "border-acid bg-acid text-carbon"
          : "border-line text-muted hover:border-acid hover:text-acid"
      }`}
    >
      <Link2 className="h-3 w-3" />
      {copied ? "copied" : "link"}
    </button>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  watermark,
  sectionId,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  watermark?: string;
  sectionId?: string;
}) {
  const n = parseInt(index, 10);
  const kanji = KANJI[(n || 1) - 1] ?? index;
  const reading = KANJI_READING[(n || 1) - 1];

  return (
    <div className="relative mb-16 sm:mb-24">
      {watermark && (
        <span aria-hidden className="watermark-kanji">
          {watermark}
        </span>
      )}
      <div className="relative z-10">
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="kanji label text-acid">{kanji}</span>
            <span className="font-mono text-[0.6rem] text-acid/60">
              {reading}
            </span>
            <span className="font-mono text-[0.6rem] text-muted">
              /{index}
            </span>
            <span className="label text-muted">{eyebrow}</span>
            <span className="h-px flex-1 bg-line" />
            <span aria-hidden className="kanji text-[0.7rem] text-vermilion">
              ◯
            </span>
            {sectionId && <CopyAnchor target={sectionId} />}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}