import type { ComponentType } from "react";
import {
  SiAnthropic,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithub,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { DiAws, DiJava } from "react-icons/di";
import {
  Braces,
  Code2,
  Database,
  GraduationCap,
  KeyRound,
  Layers,
  Network,
  Plug,
  Search,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";

type Icon = ComponentType<{ className?: string }>;

const map: Record<string, Icon> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Java: DiJava,
  "C++": SiCplusplus,
  "HTML/CSS": SiHtml5,
  "HTML": SiHtml5,
  "CSS": SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  "REST APIs": Braces,
  "RESTful API Design": Braces,
  "JWT Auth": KeyRound,
  MongoDB: SiMongodb,
  "Atlas Vector Search": Search,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  "Prisma ORM": SiPrisma,
  "Prisma": SiPrisma,
  Docker: SiDocker,
  AWS: DiAws,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  "CI/CD": Workflow,
  LangChain: SiLangchain,
  "OpenAI API": Sparkles,
  "RAG Pipelines": Network,
  RAG: Network,
  MCP: Plug,
  "Model Context Protocol": Plug,
  "Vector Embeddings": Layers,
  "MCP Chat & Sampling": Plug,
  MERN: Database,
};

const fallback: Icon = Terminal;

const issuerMap: Record<string, Icon> = {
  anthropic: SiAnthropic,
  skillshikshya: GraduationCap,
  codeit: Code2,
};

export function SkillIcon({
  skill,
  className,
}: {
  skill: string;
  className?: string;
}) {
  const Icon = map[skill] ?? fallback;
  return <Icon className={className} />;
}

export function IssuerIcon({
  issuer,
  className,
}: {
  issuer: string;
  className?: string;
}) {
  const Icon = issuerMap[issuer] ?? GraduationCap;
  return <Icon className={className} />;
}