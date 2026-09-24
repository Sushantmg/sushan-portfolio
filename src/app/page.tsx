import { About } from "@/components/About";
import { Chatbot } from "@/components/Chatbot";
import { Contact } from "@/components/Contact";
import { EducationCertifications } from "@/components/EducationCertifications";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="grain relative min-h-screen">
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
    </div>
  );
}