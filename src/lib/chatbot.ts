import { certifications, experience, profile, projects, skillGroups, type Project } from "./data";

type Intent = {
  id: string;
  keywords: string[];
  reply: () => string;
};

const speaker =
  profile.email + " · ~/sushan · Pokhara, Nepal";

function list(items: string[]) {
  return items.map((i) => `› ${i}`).join("\n");
}

function projectDetails(p: Project) {
  return `${p.name} — ${p.tagline}${p.featured ? "  ·  ★ featured" : ""}\n\n${p.description}\n\nScope:\n${list([p.scope])}\n\nHighlights:\n${list(p.highlights)}\n\nStack: ${p.tags.join(", ")}`;
}

const projectNameKeys: Record<string, string[]> = {
  ARLY: ["arly"],
  Foodie: ["foodie"],
  "DocuMind AI": ["documind", "documind ai"],
  "MCP Chat & Sampling": ["mcp chat", "mcp"],
  "College Management System": ["college management system", "college management"],
  FitGurkha: ["fitgurkha"],
  "Hamro Mart": ["hamro mart"],
};

const projectAliases: Record<string, string[]> = {
  ARLY: ["product finder", "scraping", "scrape", "price compare", "marketplace"],
  Foodie: ["restaurant pos", "point of sale", "billing"],
  "DocuMind AI": ["rag", "retrieval", "vector search", "document ai", "documents"],
  "MCP Chat & Sampling": ["model context protocol", "sampling", "anthropic", "cli"],
  "College Management System": ["cms", "academic", "university system"],
  FitGurkha: ["fitness"],
  "Hamro Mart": ["ecommerce", "e-commerce", "storefront", "vercel"],
};

const projectIntents: Intent[] = projects.map((p) => ({
  id: `proj_${p.name}`,
  keywords: [
    ...(projectNameKeys[p.name] ?? [p.name.toLowerCase()]),
    ...(projectAliases[p.name] ?? []),
  ],
  reply: () => projectDetails(p),
}));

const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "yo", "namaste", "hai", "salaam", "sup", "good morning", "good evening"],
    reply: () =>
      `Hey! 👋 I'm the bot version of ${profile.name}.\n\nAsk me about his projects, skills, experience, or how to reach him. Type a question — or pick a shortcut below.`,
  },
  {
    id: "who",
    keywords: ["who are you", "who is sushan", "about you", "about him", "about yourself", "introduce", "yourself", "bio", "background", "who's sushan"],
    reply: () =>
      `${profile.name} is a software engineering student and full-stack developer from Pokhara, Nepal. He spends his time building AI-powered apps — RAG platforms, MCP agents, and real-time web systems with the MERN/Next.js stack.\n\nShort version: he makes software that has a brain. 🧠`,
  },
  {
    id: "build",
    keywords: ["what do you build", "what do you do", "what can you do", "specialize", "specialised", "specialized", "best at", "expertise", "focus", "stack", "technologies", "tech", "tools you", "what makes", "main thing", "core work"],
    reply: () =>
      `His specialty is production-grade AI applications:\n\n${list([
        "RAG pipelines — docs in, accurate answers out",
        "MCP (Model Context Protocol) tooling & agents",
        "Scalable MERN / Next.js platforms",
        "E-commerce intelligence & scraping systems",
        "Auth, sessions & security-hardened backends",
      ])}\n\nLanguages of choice: TypeScript & Python.`,
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "language", "languages", "frontend", "backend", "database", "devops", "framework", "frameworks", "libraries", "known tech", "knows"],
    reply: () => {
      const line = (label: string, s: string[]) => `[ ${label} ] ${s.join(" · ")}`;
      return skillGroups.map((g) => line(g.label, g.skills)).join("\n");
    },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "work", "portfolio", "built", "what has", "products", "apps", "case studies", "show me", "cool stuff"],
    reply: () =>
      `Here are ${projects.length} things he's shipped:\n\n${list(projects.map((p) => `${p.name} — ${p.tagline}`))}\n\nAsk about any one of them by name, e.g. "tell me about ARLY".`,
  },
  {
    id: "experience",
    keywords: ["experience", "worked", "intern", "internship", "job", "career", "role", "history", "where has"],
    reply: () =>
      `Experience highlights:\n\n${list(experience.map((e) => `${e.role} @ ${e.company}`))}\n\nWant details on a specific role? Ask about any project by name — ARLY, Foodie, DocuMind, or the others.`,
  },
  {
    id: "education",
    keywords: ["education", "study", "studied", "college", "degree", "university", "school", "bach", "computer science", "software engineering"],
    reply: () =>
      `Current: B.Sc. Software Engineering at Gandaki College of Engineering and Science (Pokhara University), 2023–2027.\n\nBefore that: +2 and schooling at Gandaki Boarding School, Lamachaur.`,
  },
  {
    id: "certifications",
    keywords: ["cert", "certification", "courses", "course", "diploma", "learned", "training", "verify"],
    reply: () =>
      `He holds ${certifications.length} certs & diplomas:\n\n${list(
        certifications.map((c) => `${c.title} — ${c.issuer}`),
      )}\n\nMost are verifiable — just ask "how do I verify a certificate".`,
  },
  {
    id: "verify",
    keywords: ["verify", "verification", "credential", "badge"],
    reply: () =>
      `Every anthropic + local cert links to an official verifier. Check the Education & Certifications section of this site, or hit him up for links directly.`,
  },
  {
    id: "contact",
    keywords: ["contact", "email", "mail", "phone", "call", "reach", "number", "whatsapp", "message", "get in touch", "hire", "freelance", "freelancing", "gig", "work with"],
    reply: () =>
      `Easy ways to reach him:\n\nEmail → ${profile.email}\nPhone → ${profile.phone}\nGitHub → ${profile.github}\nLinkedIn → ${profile.linkedin}\n\nHe's open to internships, freelance, and interesting collaborations.`,
  },
  {
    id: "socials",
    keywords: ["github", "linkedin", "social", "profile", "follow", "connect", "socials"],
    reply: () =>
      `GitHub → github.com/Sushantmg\nLinkedIn → linkedin.com/in/sushan-tamang-9406712b1\n\nBoth are active — many of his projects are public on GitHub.`,
  },
  {
    id: "location",
    keywords: ["location", "where", "from", "based", "pokhara", "nepal", "nepali", "kaski", "nayagaun", "timezone", "country"],
    reply: () =>
      `Based in Pokhara, Nayagaun-15, Kaski, Nepal 🏔 — GMT+5:45. Works remote-friendly hours.`,
  },
  {
    id: "availability",
    keywords: ["available", "availability", "open to", "looking for", "hiring", "recruit", "join", "hired", "opportunities"],
    reply: () =>
      `Yes — actively open to internships and freelance right now. Best outreach channel is email: ${profile.email}.`,
  },
  {
    id: "spoken_languages",
    keywords: ["language", "languages", "english", "nepali", "speak", "fluent", "bilingual"],
    reply: () =>
      `He speaks English and Nepali fluently — both for docs and for interviews. 😄`,
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "curriculum", "download", "pdf"],
    reply: () =>
      `He's got a printable resume — the fastest way to grab it is emailing ${profile.email}. I'd point you to a PDF if one were wired up here.`,
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thx", "awesome", "great", "cool", "nice", "perfect", "love it"],
    reply: () =>
      `Anytime! Anything else you want to know about ${profile.name}?`,
  },
  ...projectIntents,
];

const fallbacks = [
  `That one's outside my knowledge bank — try asking about skills, projects (ARLY, DocuMind, MCP), experience, or contact info.`,
  `Hmm, I couldn't find that in his data. I know about his projects, skills, education, and contact — ask me one of those.`,
  `Not in my training set 😅 — I only know what's on this portfolio. Try "skills", "projects", or "contact".`,
];

export function quickPrompts() {
  return [
    "What do you build?",
    "Tell me about ARLY",
    "What are your skills?",
    "How can I contact you?",
  ];
}

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchText(text: string, keyword: string): boolean {
  const words = normalize(keyword).split(" ");
  const tokens = text.split(" ");
  if (words.length === 1) return tokens.includes(words[0]);
  for (let i = 0; i + words.length <= tokens.length; i++) {
    let ok = true;
    for (let j = 0; j < words.length; j++) {
      if (tokens[i + j] !== words[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

const brandMap: Record<string, string> = Object.fromEntries(
  projects.flatMap((p) =>
    (projectNameKeys[p.name] ?? [p.name.toLowerCase()]).map((k) => [k, `proj_${p.name}`]),
  ),
);

const helpText = () =>
  `I can run a few commands, and answer anything about Sushan.\n\nCommands:\n${list([
    "/help — this list",
    "/sections — jump points on the page",
    "/who — about the bot",
    "/skills — full toolkit",
    "ping — is anyone home?",
    "sudo — try it, see what happens",
  ])}\n\nOtherwise just ask naturally: "tell me about ARLY", "what do you build?", "email".`;

const whoMadeText = () =>
  `I'm ?sushan — a small knowledge bot hand-built by ${profile.name}, living inside this portfolio. I only know what's in his data, and I'm terrible at everything else.`;

const sudoText = () =>
  `permission denied. ?sushan only talks — he doesn't execute. try "sudo whoami" for what that's worth.`;

const sectionsText = () =>
  `Jump points on this page:\n\n${list([
    "/about 一 — who he is",
    "/experience 二 — shipped work",
    "/skills 三 — the toolkit",
    "/projects 四 — case files",
    "/journal 六 — field notes",
    "/education 五 — certs & degrees",
    "/contact 七 — reach out",
  ])}`;

export function getReply(input: string): string {
  const text = normalize(input);
  if (!text) return fallbacks[0];

  const raw = input.trim().toLowerCase();
  if (/^(help|\/help|what can you do|what can you say)$/.test(raw)) {
    return helpText();
  }
  if (/^who (made|created|built|wrote) (you|this|you)$/.test(raw)) {
    return whoMadeText();
  }
  if (/^sudo/.test(raw)) {
    return sudoText();
  }
  if (/^(ping|\/ping)$/.test(raw)) {
    return `pong · round-trip felt instant`;
  }
  if (/\/sections|jump points|sections$/.test(raw)) {
    return sectionsText();
  }

  for (const [word, id] of Object.entries(brandMap)) {
    if (matchText(text, word)) {
      const intent = intents.find((i) => i.id === id);
      if (intent) return intent.reply();
    }
  }

  let best: { score: number; reply: string } | null = null;
  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const kw = normalize(keyword);
      if (matchText(text, keyword)) {
        score += kw.split(" ").length > 1 ? 3 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, reply: intent.reply() };
    }
  }

  if (best && best.score >= 1) return best.reply;
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export const botMeta = {
  name: "?sushan",
  status: "online · answers from his portfolio data",
  about: `Knowledge bot for ${speaker}.`,
};