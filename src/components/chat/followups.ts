import { projects } from "@/lib/data";

const base = [
  "What are your skills?",
  "Show me your projects",
  "Where are you based?",
  "What certs do you have?",
  "Tell me about ARLY",
  "How do I contact him?",
];

export function followupsFor(botText: string, botCount: number): string[] {
  const names = projects.map((p) => p.name);
  const idx = names.findIndex((n) => botText.startsWith(n));

  if (idx >= 0) {
    const a = names[(idx + 1) % names.length];
    const b = names[(idx + 2) % names.length];
    return [`Tell me about ${a}`, `Tell me about ${b}`, "How do I contact him?"];
  }

  return [0, 1, 2].map((k) => base[(botCount + k) % base.length]);
}

export type Jump = { label: string; href: string };

export function jumpsFor(botText: string): Jump[] {
  const out: Jump[] = [];

  if (projects.some((p) => botText.startsWith(p.name))) {
    out.push({ label: "四 projects", href: "#projects" });
  }
  if (/skill|stack|technolog|tool/i.test(botText)) {
    out.push({ label: "三 skills", href: "#skills" });
  }
  if (/email|contact|reach|hire|freelance/i.test(botText)) {
    out.push({ label: "七 contact", href: "#contact" });
  }
  if (/cert|degree|education|college|university/i.test(botText)) {
    out.push({ label: "五 education", href: "#education" });
  }
  if (/experience|intern|role|company|worked/i.test(botText)) {
    out.push({ label: "二 experience", href: "#experience" });
  }

  return out.slice(0, 2);
}