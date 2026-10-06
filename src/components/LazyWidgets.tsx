"use client";

import dynamic from "next/dynamic";

export const Chatbot = dynamic(
  () => import("./Chatbot").then((m) => m.Chatbot),
  { ssr: false },
);

export const CommandPalette = dynamic(
  () => import("./CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);

export const Preloader = dynamic(
  () => import("./Preloader").then((m) => m.Preloader),
  { ssr: false },
);

export const CustomCursor = dynamic(
  () => import("./CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);