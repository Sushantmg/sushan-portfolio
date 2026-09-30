import { profile } from "@/lib/data";
import { Kamon } from "./Kamon";
import { LiveClock } from "./LiveClock";

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
        <a
          href="#top"
          className="flex items-center gap-2 transition-colors hover:text-acid"
        >
          <span className="text-acid">↑</span> back to top
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