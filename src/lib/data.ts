export const profile = {
  name: "Sushan Tamang",
  role: "Full-Stack & AI Developer",
  location: "Pokhara, Nepal",
  phone: "+977 9814149723",
  email: "sushantmg2004@gmail.com",
  github: "https://github.com/Sushantmg",
  linkedin: "https://www.linkedin.com/in/sushan-tamang-9406712b1/",
  summary:
    "Software engineering student and full-stack developer with hands-on experience building production-grade AI-powered applications, scalable web platforms, and multi-service architectures. Proficient in TypeScript, Python, and the MERN/Next.js stack, with demonstrated expertise in LLM integrations (RAG, MCP, AI agents), real-time web systems, and cloud-native deployments. Passionate about translating complex technical requirements into intuitive, high-performance solutions backed by strong system design thinking.",
};

export const roles = [
  "Full-Stack Developer",
  "AI Systems Developer",
  "MERN / Next.js Specialist",
  "LLM Integration Engineer",
  "Cloud-Native Builder",
];

export const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Auth"],
  },
  {
    label: "Databases",
    skills: [
      "MongoDB",
      "Atlas Vector Search",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
    ],
  },
  {
    label: "AI & ML",
    skills: [
      "LangChain",
      "OpenAI API",
      "RAG Pipelines",
      "MCP",
      "Vector Embeddings",
    ],
  },
  {
    label: "DevOps & Tools",
    skills: ["Docker", "AWS", "Vercel", "Git", "GitHub", "CI/CD"],
  },
];

export const experience = [
  {
    role: "Full-Stack & AI Developer",
    company: "ARLY — AI Product Finder",
    current: true,
    points: [
      "Architected a multi-service e-commerce intelligence platform that scrapes and compares product prices across 10+ Nepali retail marketplaces using LLM-powered extraction pipelines.",
      "Built a React 19 + TypeScript frontend with Vite, Tailwind CSS v4, and Supabase for authentication, role-based admin dashboards, and premium subscription management.",
      "Developed independent Express.js microservices for query scraping and product comparison, orchestrated via Vite proxy rules for seamless API routing.",
    ],
    tags: ["React 19", "TypeScript", "Supabase", "Express.js", "LLM"],
  },
  {
    role: "Full-Stack & AI Developer",
    company: "DocuMind AI",
    points: [
      "Architected a Retrieval-Augmented Generation (RAG) platform leveraging the MERN stack and TypeScript for intelligent document querying.",
      "Integrated MongoDB Atlas Vector Search and document vector embeddings to enable real-time, highly accurate AI responses.",
      "Engineered secure user sessions and data protection protocols utilizing JWT authentication.",
    ],
    tags: ["MERN", "RAG", "MongoDB Atlas", "JWT"],
  },
  {
    role: "AI Systems Developer",
    company: "MCP Chat & Sampling Workspace",
    points: [
      "Built a CLI-based AI chat application using Python, Anthropic API, and the Model Context Protocol (MCP) for document retrieval and command-based prompt execution.",
      "Designed an MCP sampling workspace demonstrating server-delegated LLM inference, logging, progress notifications, and root-based file security boundaries.",
    ],
    tags: ["Python", "Anthropic API", "MCP", "CLI"],
  },
  {
    role: "Backend Developer",
    company: "College Management System",
    points: [
      "Developed a full backend service using TypeScript and Prisma ORM for database schema management and efficient data operations.",
      "Integrated an AI-driven conversational module to automate academic platform workflows.",
    ],
    tags: ["TypeScript", "Prisma ORM", "AI Chat"],
  },
  {
    role: "Frontend Developer",
    company: "FitGurkha & Hamro Mart",
    points: [
      "Built and deployed a fitness platform (FitGurkha) and an e-commerce storefront (Hamro Mart) using Next.js, TypeScript, and Tailwind CSS, deployed on Vercel.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  scope: string;
  highlights: string[];
  tags: string[];
  accent: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  github?: string;
  demoUrl?: string;
};

export type Note = {
  date: string;
  title: string;
  excerpt: string;
  /** Full entry body, one string per paragraph. */
  body: string[];
  tags: string[];
};

export const notes: Note[] = [
  {
    date: "2026-08-14",
    title: "Shipping the ARLY price engine, end to end",
    excerpt:
      "Wired the marketplace scrapers into a normalized comparison service — dedup, currency handling, and an LLM extraction layer that reads messy product pages into structured data.",
    body: [
      "The hard part of ARLY was never scraping. It was making ten different marketplaces speak one language. Every store renders its product page differently — some bury price in a JSON blob, some split it across a sale-price and a struck-through original, and a few still serve prices as Nepali digits with a currency symbol in a different element entirely.",
      "So the pipeline runs in three stages. A per-marketplace adapter pulls raw HTML and keeps it untouched. A normalizer converts it into a common shape — title, seller, numeric price, currency, availability — using the store's own conventions where possible. Only when a page resists deterministic parsing does it fall through to the LLM extraction layer, which reads the messy markup and returns the same normalized shape as JSON.",
      "That fallback is the expensive path, so it runs last and it runs small. The prompt carries a strict schema and a handful of worked examples, and the output is validated against the schema before it is allowed anywhere near the database. A malformed extraction gets dropped rather than stored — a missing row is a much smaller problem than a price that is wrong by an order of magnitude.",
      "Currency and deduplication are unglamorous but they decide whether the comparison is honest. Prices are converted to a single base currency with the rate captured at ingest time, so a historical snapshot stays internally consistent. Deduplication keys on a normalized title plus a fuzzy match on brand and model, because the same phone is listed as \"Samsung Galaxy S24\" on one store and \"S24 (256GB, Black)\" on another.",
      "The last piece was scheduling. Scrapes run as background jobs against a queue rather than inline on request, so a slow or blocked marketplace degrades the freshness of the data instead of taking the endpoint down with it. Partial results still get served — a user comparing four of ten stores is better off than a user waiting for a spinner.",
      "What I would do differently: instrument the extraction layer from day one. Every field that comes back from the model should be traceable to the chunk of markup it came from, so when a price looks wrong you can see the source instead of guessing.",
    ],
    tags: ["ARLY", "Express.js", "LLM"],
  },
  {
    date: "2026-06-02",
    title: "Why MCP makes tooling composable",
    excerpt:
      "Notes from building an MCP sampling workspace — server-delegated inference, progress notifications, and root-based file boundaries. When tools speak one protocol, agents get boringly reliable.",
    body: [
      "MCP is easier to get excited about than it is to explain, so here is the version that stuck for me: it is a wire format for the tools an agent is allowed to touch. A server declares its tools and their schemas; a client discovers them and calls them. The interesting part is not the declaration — it is what the protocol makes possible once a contract exists.",
      "Server-delegated sampling is the piece that surprised me. Instead of the client always owning inference, a server can ask the client to run a model on its behalf. That flips the usual assumption: a tool that is itself a model can ask the host to reason on its behalf, and the host stays in control of which model answers and what it may see. The client decides; the server asks. Once I stopped treating the client as \"the thing with the API key\" and started treating it as \"the thing with the authority\", the design got much simpler.",
      "Progress notifications are the other half. Long-running tools do not return when they finish — they emit progress as they go, and the host renders it. This is the difference between an agent that appears frozen for forty seconds and one that visibly works. Small detail, large effect on whether people trust the thing.",
      "Roots are the security boundary, and this is where I had to be careful. A server declares the directories it is allowed to touch, and every file operation is checked against that boundary before it runs. The naive implementation — read whatever path the model asked for — is a prompt-injection foot-gun, because document content is attacker-controlled input. The workspace that came out of this enforces the boundary in code, not in the prompt, and refuses paths that resolve outside the declared roots even if the request looks perfectly reasonable.",
      "The practical lesson: once every tool speaks the same protocol, the agent loop stops being the interesting part. It becomes a scheduling problem, and the reliability comes from the boundaries being enforced in the transport rather than trusted to the model.",
    ],
    tags: ["MCP", "Python", "Anthropic"],
  },
  {
    date: "2026-03-19",
    title: "RAG that stays grounded",
    excerpt:
      "Documentation trail on DocuMind — MongoDB Atlas Vector Search plus a retrieval pipeline that cites what it reads. The lesson: retrieval quality beats prompt size every time.",
    body: [
      "Every RAG demo looks good on the day you build it. Then you point it at a real folder of documents and the answers start drifting — confident, well-formatted, and subtly wrong. Most of that drift is not the model's fault. It is the retrieval's.",
      "DocuMind's retrieval pipeline starts with the unglamorous work. Documents are parsed with structure preserved, because a heading and a paragraph mean different things and flattening them into one string loses the signal you need later. Chunks are sized by structure rather than by a fixed token count, then embedded with the document's own metadata attached — source, section heading, page. That metadata is what makes citation possible, and citation is what makes a wrong answer recoverable instead of merely wrong.",
      "MongoDB Atlas Vector Search handles the retrieval itself. The stage is not just a vector index — it can filter by metadata before scoring, which lets you narrow to the right document set before similarity does the ranking. For a personal document assistant that matters enormously: without the filter, a question about one PDF competes against every PDF you have ever uploaded.",
      "The second half is that answers cite what they read. Each retrieved chunk carries a source label, and the answer is required to point at it. If the retrieval returns nothing good, the model is told to say it does not know rather than to compose something plausible from the fragments it was handed. That single rule does more for trustworthiness than any prompt tuning I have done.",
      "The measurable lesson: retrieval quality beats prompt size every time. Before reaching for a bigger model or a longer system prompt, check whether the right chunk was in the candidate set at all. If it was not, no amount of prompt engineering recovers the answer. If it was, the model usually handles it. I now spend most of my effort on chunking, metadata, and filtering — and treat the prompt as a rounding error.",
    ],
    tags: ["RAG", "MongoDB", "MERN"],
  },
  {
    date: "2026-01-11",
    title: "Field notes: auth done properly",
    excerpt:
      "JWT sessions, role-scoped access, and the mistakes I stopped making — short log from hardening the college management backend with Prisma.",
    body: [
      "The first version of the auth in the college management backend had exactly one idea in it: issue a JWT, check the JWT, move on. It worked, it shipped, and it was wrong in a handful of ways I only noticed once the system had real users with real roles.",
      "The first mistake was treating the token as the session. A JWT is a bearer credential — whoever holds it, holds the account. Putting every session in one long-lived token means a leaked token stays valid until it expires, with no way to revoke it. The fix was to make the token a pointer rather than the session itself: short expiry, a server-side session record it references, and a refresh token that rotates on every use. Revoke the session record and the access token stops mattering immediately.",
      "The second mistake was authorization scattered through handlers. Each route checked the role inline, and each check was slightly different — one of them forgot. Centralizing it in one place — a small middleware that resolves the caller's permissions and attaches them to the request — meant there was a single file to read to understand who can do what. Prisma made this straightforward because the query layer is already middleware-aware, so the permission check sits right above the data access instead of being scattered through the handlers.",
      "The third mistake was trusting the role from the request body. The role comes from the session, never from the client. It sounds obvious written down, but it is exactly the kind of thing that slips in during a rushed feature, and it is the difference between a permissions system and a suggestion.",
      "What I keep now: short-lived access tokens, rotating refresh tokens with reuse detection, permissions derived server-side from the session, every route guarded by the same middleware, and a logout that actually destroys the session record. None of it is clever. All of it is the difference between auth that looks done and auth that is done.",
    ],
    tags: ["Auth", "Prisma", "TypeScript"],
  },
];

export const projects: Project[] = [
  {
    name: "Foodie",
    tagline: "Restaurant POS — terminal, orders & analytics",
    scope: "Owned the whole build — state machine, persistence, reports engine.",
    description:
      "Real-time restaurant POS covering the terminal, order management, 20-table layout, and a revenue dashboard — with multi-payment, discounts, tax, stock deduction, and CSV export.",
    highlights: [
      "POS terminal: 24 menu items across 4 categories, cart, modifiers, discounts",
      "Multi-payment (cash/card/UPI), configurable tax, auto stock deduction",
      "Order engine with live timers, printable receipts, quick reorder, table auto-release",
      "Dashboard & reports: hourly sales, top items, payment split, CSV export",
    ],
    tags: ["React 19", "Vite", "Context API", "localStorage", "CSS3"],
    accent: "from-orange-500 to-red-500",
    liveUrl: "https://foodie-seven-indol.vercel.app",
    repoUrl: "https://github.com/Sushantmg/Foodie",
  },
  {
    name: "ARLY",
    tagline: "AI Product Finder for Nepal",
    scope: "Full-stack product lead — architecture, scraping, ingestion, LLM layer.",
    description:
      "Multi-service e-commerce intelligence platform scraping and comparing product prices across 10+ Nepali marketplaces with LLM-powered extraction.",
    highlights: [
      "Multi-service scraper pipeline across 10+ Nepali marketplaces",
      "LLM-powered extraction and price normalization",
      "REST API + scheduled background jobs on Express.js",
      "Supabase for storage, auth, and edge functions",
    ],
    tags: ["React 19", "TypeScript", "Express.js", "Supabase"],
    accent: "from-violet-500 to-fuchsia-500",
    featured: true,
    repoUrl: "https://github.com/Sushantmg/ARLY",
  },
  {
    name: "DocuMind AI",
    tagline: "Intelligent RAG Document Platform",
    scope: "Design and build of the retrieval backend and chat pipeline.",
    description:
      "MERN + TypeScript RAG platform with MongoDB Atlas Vector Search for real-time, highly accurate AI responses on personal documents.",
    highlights: [
      "MongoDB Atlas Vector Search for semantic document retrieval",
      "RAG pipeline grounding answers in user-owned documents",
      "JWT authentication with role-scoped document access",
    ],
    tags: ["MERN", "RAG", "Vector Search", "JWT"],
    accent: "from-cyan-400 to-blue-600",
  },
  {
    name: "MCP Chat & Sampling",
    tagline: "Model Context Protocol Workspace",
    scope: "CLI tooling — agent loop, MCP tool wiring, sampling orchestration.",
    description:
      "CLI-based AI chat with Anthropic API and MCP for document retrieval, server-delegated LLM inference, and secure file boundaries.",
    highlights: [
      "Anthropic API chat client with a full agent loop in the CLI",
      "MCP-driven document retrieval from local files",
      "Server-delegated inference with strict file-boundary security",
    ],
    tags: ["Python", "Anthropic API", "MCP"],
    accent: "from-amber-400 to-orange-600",
    repoUrl: "https://github.com/Sushantmg/MCP-",
  },
  {
    name: "College Management System",
    tagline: "Backend + AI Academic Automation",
    scope: "Core backend services and the conversational AI module.",
    description:
      "TypeScript + Prisma backend with an AI-driven conversational module automating academic platform workflows.",
    highlights: [
      "Prisma + PostgreSQL data layer with role-based access",
      "AI chat module automating academic platform workflows",
      "RESTful services for admin and student operations",
    ],
    tags: ["TypeScript", "Prisma", "AI Chat"],
    accent: "from-emerald-400 to-teal-600",
    repoUrl: "https://github.com/Sushantmg/college-management-system",
  },
  {
    name: "FitGurkha",
    tagline: "Fitness Platform",
    scope: "Storefront UI, catalog, and checkout flow.",
    description:
      "Next.js fitness platform with a full storefront, built with TypeScript and Tailwind CSS, deployed on Vercel.",
    highlights: [
      "Next.js storefront with a full fitness catalog",
      "TypeScript + Tailwind component system",
      "Production deployment on Vercel",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind"],
    accent: "from-rose-400 to-red-600",
    liveUrl: "https://fitgurkha-fitness.vercel.app",
    repoUrl: "https://github.com/Sushantmg/fitgurkha",
  },
  {
    name: "Hamro Mart",
    tagline: "E-Commerce Storefront",
    scope: "Storefront architecture and production release.",
    description:
      "Modern e-commerce storefront using Next.js, TypeScript, and Tailwind CSS — production-deployed on Vercel.",
    highlights: [
      "Next.js e-commerce storefront with product flows",
      "TypeScript + Tailwind styling system",
      "Production build deployed on Vercel",
    ],
    tags: ["Next.js", "E-Commerce", "Tailwind"],
    accent: "from-lime-400 to-green-600",
    liveUrl: "https://hamro-mart.vercel.app",
    repoUrl: "https://github.com/Sushantmg/hamro-mart",
  },
];

export const stackMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "LangChain",
  "RAG",
  "MCP",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "MERN",
  "FastAPI",
  "OpenAI API",
];

export const education = [
  {
    degree: "Bachelor's in Software Engineering",
    school: "Gandaki College of Engineering and Science (Pokhara University), Pokhara",
    period: "2023 – 2027",
  },
  {
    degree: "High School (+2)",
    school: "Gandaki Boarding School, Lamachaur, Pokhara",
    period: "2021 – 2023",
  },
  {
    degree: "Schooling (SLC/SEE)",
    school: "Gandaki Boarding School, Lamachaur, Pokhara",
    period: "2008 – 2021",
  },
];

export const certifications = [
  {
    title: "Full-Stack MERN Diploma (180 Hours)",
    issuer: "SkillShikshya",
    issuerIcon: "skillshikshya",
    verify: "https://skillshikshya.com/verify-certificates/FMDC260005",
    image: "/images/certs/mern.jpg",
  },
  {
    title: "Generative AI Course",
    issuer: "Code IT",
    issuerIcon: "codeit",
    verify: "https://codeit.com.np/certificate-verification/CION-22691",
    image: "/images/certs/genai.jpg",
  },
  {
    title: "Frontend with React Diploma (120 Hours)",
    issuer: "Skill Shikshya",
    issuerIcon: "skillshikshya",
    verify: null,
    image: "/images/certs/react.jpg",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    issuerIcon: "anthropic",
    verify: "https://verify.skilljar.com/c/eb2jgefzbipe",
    image: "/images/certs/mcp.jpg",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    issuerIcon: "anthropic",
    verify: "https://verify.skilljar.com/c/aqyrdghwb632",
    image: null,
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    issuerIcon: "anthropic",
    verify: "https://verify.skilljar.com/c/ci92tw2i5ta9",
    image: null,
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    issuerIcon: "anthropic",
    verify: "https://verify.skilljar.com/c/zxxov5howm4o",
    image: null,
  },
];

export const languages = ["English", "Nepali"];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projectSlug = (name: string) => slugify(name);

export const noteSlug = (title: string) => slugify(title);

export const projectBySlug = (slug: string) =>
  projects.find((p) => slugify(p.name) === slug);

export const noteBySlug = (slug: string) =>
  notes.find((n) => slugify(n.title) === slug);

/** Estimated reading time in minutes, from the full body. */
export const noteReadTime = (note: Note) =>
  Math.max(
    1,
    Math.round(
      note.body.join(" ").trim().split(/\s+/).length / 200,
    ),
  );

/** The most recent entry date, used for "last updated" stamps. */
export const latestNoteDate = () =>
  notes.reduce(
    (latest, n) => (n.date > latest ? n.date : latest),
    notes[0]?.date ?? new Date().toISOString().slice(0, 10),
  );

export const normKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const sharesName = (a: string, b: string) => {
  const x = normKey(a);
  const y = normKey(b);
  return x.length > 2 && y.length > 2 && (x.includes(y) || y.includes(x));
};

export function projectsForCompany(company: string) {
  return projects.filter((p) => sharesName(company, p.name));
}

/** Whole-word, case-insensitive match — avoids "ARLY" matching "particularly". */
const mentionsTerm = (needle: string, haystack: string) => {
  const term = needle.trim().toLowerCase();
  if (term.length < 3) return false;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(
    haystack,
  );
};

/** Two labels that refer to the same thing, allowing "React" ↔ "React 19". */
const sameTerm = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase() ||
  mentionsTerm(a, b) ||
  mentionsTerm(b, a);

/**
 * How strongly a journal entry is about a project. Naming the project is
 * decisive; shared tags only count when there are at least two, because a
 * lone "TypeScript" tag would otherwise link the whole site together.
 */
const projectNoteScore = (project: Project, note: Note) => {
  const tagHits = note.tags.filter((t) =>
    project.tags.some((pt) => sameTerm(pt, t)),
  ).length;
  const mentionsName =
    mentionsTerm(project.name, note.excerpt) ||
    note.body.some((p) => mentionsTerm(project.name, p));
  return tagHits + (mentionsName ? 3 : 0);
};

/** Journal entries that touch a project — used to cross-link case files. */
export function notesForProject(project: Project) {
  return notes
    .map((note) => ({ note, score: projectNoteScore(project, note) }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score)
    .map(({ note }) => note);
}

/** Projects a journal entry is about — the reverse of notesForProject. */
export function projectsForNote(note: Note) {
  return projects
    .map((project) => ({ project, score: projectNoteScore(project, note) }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score)
    .map(({ project }) => project);
}

export function projectsUsingSkill(skill: string) {
  return projects.filter(
    (p) =>
      p.tags.some((t) => sharesName(t, skill)) ||
      sharesName(p.description, skill) ||
      // A skill can also be evidenced only in the highlights.
      p.highlights.some((h) => sharesName(h, skill)),
  );
}