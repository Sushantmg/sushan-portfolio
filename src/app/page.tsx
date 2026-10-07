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
import { profile, projects, slugify } from "@/lib/data";

const SITE = "https://github.com/Sushantmg/sushan-portfolio";
const LANGUAGES = new Set(["TypeScript", "Python", "JavaScript"]);

export default function Home() {
  const person = {
    "@type": "Person",
    name: profile.name,
    url: SITE,
    jobTitle: profile.role,
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
        url: SITE,
        inLanguage: "en",
        author: person,
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
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          url: `${SITE}/#case/${slugify(project.name)}`,
          keywords: project.tags.join(", "),
          author: person,
          ...(programmingLanguage.length > 0 ? { programmingLanguage } : {}),
        };
      }),
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="grain relative min-h-screen">
      <a
        href="#top"
        className="fixed left-4 top-4 z-[101] -translate-y-24 border border-acid bg-carbon px-4 py-2 font-mono text-xs font-bold text-acid transition-transform duration-200 focus:translate-y-0"
      >
        skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      <main className="relative">
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