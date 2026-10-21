import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Sushan Tamang — Full-Stack & AI Developer",
    short_name: "sushan.",
    description:
      "Portfolio of Sushan Tamang — building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#10120f",
    theme_color: "#10120f",
    categories: ["portfolio", "developer", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
