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
};

export const projects: Project[] = [
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