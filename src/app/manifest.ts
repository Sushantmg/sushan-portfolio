import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sushan Tamang — Full-Stack & AI Developer",
    short_name: "sushan.",
    description:
      "Portfolio of Sushan Tamang — building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
    start_url: "/",
    display: "standalone",
    background_color: "#10120f",
    theme_color: "#10120f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}