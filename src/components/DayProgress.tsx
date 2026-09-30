"use client";

import { useSyncExternalStore } from "react";

const NPT_OFFSET_MS = (5 * 3600 + 45 * 60) * 1000;

function progress() {
  const npt = new Date(Date.now() + NPT_OFFSET_MS);
  const seconds =
    npt.getUTCHours() * 3600 + npt.getUTCMinutes() * 60 + npt.getUTCSeconds();
  return (seconds / 86400) * 100;
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
function getSnapshot() {
  return progress();
}
function getServerSnapshot() {
  return 0;
}

export function DayProgress() {
  const pct = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="flex items-center gap-2" title="Nepal Time day progress">
      <span className="h-1 w-1 bg-acid" />
      <span>NPT day</span>
      <span className="text-acid">{pct.toFixed(1)}%</span>
      <span className="inline-block h-[2px] w-16 overflow-hidden bg-line align-middle">
        <span
          className="block h-full bg-acid transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </span>
    </span>
  );
}