import { About } from "@/components/About";
import { BackToTop } from "@/components/BackToTop";
import { Chatbot } from "@/components/Chatbot";
import { CommandPalette } from "@/components/CommandPalette";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { EducationCertifications } from "@/components/EducationCertifications";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Karesansui } from "@/components/Karesansui";
import { Navbar } from "@/components/Navbar";
import { Petals, SakuraBranch } from "@/components/Petals";
import { Preloader } from "@/components/Preloader";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sushan Tamang",
    url: "https://github.com/Sushantmg/sushan-portfolio",
    jobTitle: "Full-Stack & AI Developer",
    address: { "@type": "PostalAddress", addressLocality: "Pokhara", addressCountry: "NP" },
    email: "mailto:sushantmg2004@gmail.com",
    sameAs: [
      "https://github.com/Sushantmg",
      "https://www.linkedin.com/in/sushan-tamang-9406712b1/",
    ],
  };

  return (
    <div className="grain relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SmoothScroll />
      <div aria-hidden className="seigaiha fixed inset-0 z-0 opacity-[0.045]" />
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
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
      <CommandPalette />
      <CustomCursor />
    </div>
  );
}