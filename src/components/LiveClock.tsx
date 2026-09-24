"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}
function getServerSnapshot() {
  return 0;
}

export function LiveClock({
  timeZone = "Asia/Kathmandu",
  className,
}: {
  timeZone?: string;
  className?: string;
}) {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(seconds * 1000);
  return <span className={className}>{time}</span>;
}