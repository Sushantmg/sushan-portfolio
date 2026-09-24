"use client";

import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";

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
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
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

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  watermark,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  watermark?: string;
}) {
  const n = parseInt(index, 10);
  const kanji = KANJI[(n || 1) - 1] ?? index;

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
            <span className="font-mono text-[0.6rem] text-muted">
              /{index}
            </span>
            <span className="label text-muted">{eyebrow}</span>
            <span className="h-px flex-1 bg-line" />
            <span aria-hidden className="kanji text-[0.7rem] text-vermilion/70">
              ◯
            </span>
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