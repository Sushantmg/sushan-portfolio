import { MotionConfig } from "framer-motion";
import { About } from "@/components/About";
import { BackToTop } from "@/components/BackToTop";
import { Contact } from "@/components/Contact";
import { EducationCertifications } from "@/components/EducationCertifications";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journal } from "@/components/Journal";
import { Karesansui } from "@/components/Karesansui";
import {
  Chatbot,
  CommandPalette,
  CustomCursor,
  Preloader,
} from "@/components/LazyWidgets";
import { MobileDock } from "@/components/MobileDock";
import { Navbar } from "@/components/Navbar";
import { Petals, SakuraBranch } from "@/components/Petals";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/components/SmoothScroll";
import { notes, noteSlug, profile, projectSlug, projects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

const LANGUAGES = new Set(["TypeScript", "Python", "JavaScript"]);

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const person = {
    "@type": "Person",
    name: profile.name,
    url: siteUrl("/"),
    jobTitle: profile.role,
    description: profile.summary,
    image: siteUrl("/images/drone.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pokhara",
      addressCountry: "NP",
    },
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        name: profile.name,
        description:
          "Portfolio of Sushan Tamang — full-stack & AI developer building production-grade AI applications, scalable web platforms, and multi-service architectures.",
        url: siteUrl("/"),
        inLanguage: "en",
        author: person,
      },
      {
        "@type": "ProfilePage",
        name: `${profile.name} — ${profile.role}`,
        url: siteUrl("/"),
        description: profile.summary,
        mainEntity: person,
        isPartOf: { "@type": "WebSite", url: siteUrl("/") },
      },
      ...projects.map((project) => {
        const programmingLanguage = project.tags.filter((tag) =>
          LANGUAGES.has(tag),
        );
        return {
          "@type": "SoftwareApplication",
          name: project.name,
          headline: project.tagline,
          description: project.description,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: siteUrl(`/case/${projectSlug(project.name)}`),
          keywords: project.tags.join(", "),
          author: person,
          ...(programmingLanguage.length > 0 ? { programmingLanguage } : {}),
        };
      }),
      ...notes.map((note) => ({
        "@type": "BlogPosting",
        headline: note.title,
        description: note.excerpt,
        url: siteUrl(`/journal/${noteSlug(note.title)}`),
        datePublished: note.date,
        keywords: note.tags.join(", "),
        author: person,
      })),
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="grain relative min-h-screen">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[101] -translate-y-24 border border-acid bg-carbon px-4 py-2 font-mono text-xs font-bold text-acid transition-transform duration-200 focus:translate-y-0"
      >
        skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SmoothScroll />
      <div aria-hidden className="seigaiha fixed inset-0 z-0 opacity-[0.045]" />
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#c7f542_1px,transparent_1px),linear-gradient(to_bottom,#c7f542_1px,transparent_1px)] bg-[size:5rem_1rem] opacity-[0.03]"
      />
      <Preloader />
      <Petals />
      <SakuraBranch />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <Hero />
        <Karesansui />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Journal />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
      <MobileDock />
      <CommandPalette />
      <CustomCursor />
    </div>
    </MotionConfig>
  );
}
