import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-line bg-carbon-2 py-24 sm:py-32 lg:pl-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title={
                <>
                  Got a build in mind?{" "}
                  <em className="font-light italic text-acid">Let&apos;s talk.</em>
                </>
              }
              description="Open to internships, freelance, and collaborations. I usually reply within 24 hours."
            />

            <Reveal>
              <a
                href={`mailto:${profile.email}`}
                className="font-display group inline-block text-2xl font-semibold text-ink underline decoration-acid decoration-2 underline-offset-8 transition-colors duration-300 hover:text-acid sm:text-3xl"
              >
                {profile.email}
              </a>
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
            <div className="hard-shadow flex h-full flex-col justify-between border border-line bg-carbon">
              <div className="border-b border-line p-5">
                <p className="label text-muted">
                  / links & socials
                </p>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-px bg-line">
                {[
                  { label: "GitHub", icon: GitHubIcon, href: profile.github },
                  { label: "LinkedIn", icon: LinkedInIcon, href: profile.linkedin },
                  { label: "Email", icon: Mail, href: `mailto:${profile.email}` },
                  { label: "Call", icon: Phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center justify-center gap-3 bg-carbon p-6 transition-colors duration-300 hover:bg-carbon-2"
                  >
                    <link.icon className="h-6 w-6 text-muted transition-colors duration-300 group-hover:text-acid" />
                    <span className="label text-muted transition-colors duration-300 group-hover:text-ink">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}