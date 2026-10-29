import Link from "next/link";
import { latestNoteDate, profile } from "@/lib/data";
import { Kamon } from "./Kamon";
import { LiveClock } from "./LiveClock";

const updated = new Date(`${latestNoteDate()}T09:00:00Z`);
const updatedLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(updated);

export function Footer() {
  return (
    <footer className="bg-carbon lg:pl-16">
      <div aria-hidden className="w-full">
        <svg
          className="block h-2 w-full"
          viewBox="0 0 32 8"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,8 4,0 8,8 12,0 16,8 20,0 24,8 28,0 32,8"
            fill="#1a1e17"
          />
        </svg>
      </div>
      <div className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 font-mono text-xs text-muted sm:flex-row sm:px-8 lg:px-14">
        <p>
          © {new Date().getFullYear()} {profile.name}
          <span className="ml-2 inline-block align-middle">
            <span className="hanko inline-grid h-5 w-5 rotate-[-4deg] text-[0.6rem]">
              山
            </span>
          </span>
        </p>
        <p className="flex items-center gap-2">
          built by hand <span className="text-acid">→</span> next.js ·
          typescript · tailwind
          <span className="ml-2 inline-flex items-center gap-1.5 text-acid">
            <span className="h-1 w-1 animate-pulse bg-acid" />
            <LiveClock timeZone="Asia/Kathmandu" />
          </span>
        </p>
        <p className="flex items-center gap-2 font-mono text-[0.65rem] text-muted">
          <span className="text-acid">updated</span>
          <time dateTime={latestNoteDate()}>{updatedLabel}</time>
        </p>
        <a
          href="#top"
          className="flex items-center gap-2 transition-colors hover:text-acid"
        >
          <span className="text-acid">↑</span> back to top
        </a>
        </div>
        <div className="mx-auto mt-5 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line px-5 pt-4 font-mono text-[0.65rem] uppercase tracking-wider sm:justify-between sm:px-8 lg:px-14">
          <Link href="/cv" className="transition-colors hover:text-acid">
            résumé
          </Link>
          <Link href="/journal" className="transition-colors hover:text-acid">
            journal
          </Link>
          <a
            href="/feed.xml"
            type="application/rss+xml"
            className="transition-colors hover:text-acid"
          >
            rss
          </a>
          <a
            href="https://github.com/Sushantmg/sushan-portfolio"
            target="_blank"
            rel="me noopener noreferrer"
            className="transition-colors hover:text-acid"
          >
            source
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="me noopener noreferrer"
            className="transition-colors hover:text-acid"
          >
            github
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            className="transition-colors hover:text-acid"
          >
            linkedin
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-acid"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-4 px-5 sm:px-8 lg:px-14">
        <span className="h-px w-20 bg-line sm:w-40" />
        <Kamon className="h-6 w-6 text-acid/60" />
        <span className="hanko inline-grid h-6 w-6 rotate-[-4deg] text-[0.65rem]">
          終
        </span>
        <Kamon className="h-6 w-6 text-acid/40" />
        <span className="h-px w-20 bg-line sm:w-40" />
      </div>
    </footer>
  );
}