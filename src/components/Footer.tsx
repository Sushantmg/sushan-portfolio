import { profile } from "@/lib/data";
import { LiveClock } from "./LiveClock";

export function Footer() {
  return (
    <footer className="border-t border-line bg-carbon py-8 lg:pl-16">
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
        </p>
        <p className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 animate-pulse bg-acid" />
            <LiveClock timeZone="Asia/Kathmandu" />
          </span>
          <span className="text-acid">~/</span>sushan
        </p>
      </div>
    </footer>
  );
}