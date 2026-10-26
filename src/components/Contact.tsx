import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";
import { PrintCv } from "./PrintCv";
import { Reveal, SectionHeading } from "./Reveal";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-line bg-carbon-2 py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              index="07"
              eyebrow="Contact"
              watermark="縁"
              sectionId="contact"
              title={
                <>
                  Got a build in mind?{" "}
                  <em className="font-light italic text-acid">Let&apos;s talk.</em>
                </>
              }
              description="Open to internships, freelance, and collaborations. I usually reply within 24 hours."
            />

            <Reveal>
              <span className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display group inline-block text-2xl font-semibold text-ink underline decoration-acid decoration-2 underline-offset-8 transition-colors duration-300 hover:text-acid sm:text-2xl"
                >
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} />
                <PrintCv />
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-2 font-mono text-sm text-muted">
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-acid" /> {profile.phone}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-acid" /> Pokhara, Nayagaun-15,
                  Kaski, Nepal
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="shikiji-frame hard-shadow flex h-full flex-col justify-between border border-line bg-carbon">
              <div className="border-b border-line p-5">
                <p className="label text-muted">
                  / quick message
                </p>
              </div>
              <ContactForm />
              <div className="p-5">
                <p className="label mb-4 text-muted">
                  / links & socials
                </p>
                <div className="grid gap-px bg-line sm:grid-cols-2">
                  {[
                    { label: "GitHub", icon: GitHubIcon, href: profile.github, external: true },
                    { label: "LinkedIn", icon: LinkedInIcon, href: profile.linkedin, external: true },
                    { label: "Source", icon: GitHubIcon, href: "https://github.com/Sushantmg/sushan-portfolio", external: true },
                    { label: "Email", icon: Mail, href: `mailto:${profile.email}` },
                    { label: "Call", icon: Phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                    { label: "Résumé", icon: FileText, href: "/cv" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? link.label === "GitHub" || link.label === "LinkedIn"
                            ? "me noopener noreferrer"
                            : "noopener noreferrer"
                          : undefined
                      }
                      className="group flex flex-col items-center justify-center gap-3 bg-carbon p-5 transition-colors duration-300 hover:bg-carbon-2"
                    >
                      <link.icon className="h-6 w-6 text-muted transition-colors duration-300 group-hover:text-acid" />
                      <span className="label text-muted transition-colors duration-300 group-hover:text-ink">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}