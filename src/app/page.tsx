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
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="grain relative min-h-screen">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
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