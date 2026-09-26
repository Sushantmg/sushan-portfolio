import type { Metadata } from "next";
import { Fraunces, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/Sushantmg/sushan-portfolio"),
  title: {
    default: "Sushan Tamang — Full-Stack & AI Developer",
    template: "%s · Sushan Tamang",
  },
  description:
    "Portfolio of Sushan Tamang — software engineering student and full-stack developer building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
  keywords: [
    "Sushan Tamang",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js",
    "React",
    "MERN",
    "RAG",
    "MCP",
    "LangChain",
    "Nepal",
    "Pokhara",
  ],
  creator: "Sushan Tamang",
  authors: [{ name: "Sushan Tamang", url: "https://github.com/Sushantmg" }],
  openGraph: {
    title: "Sushan Tamang — Full-Stack & AI Developer",
    description:
      "Building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
    type: "website",
    url: "https://github.com/Sushantmg/sushan-portfolio",
    siteName: "Sushan Tamang",
    locale: "en_US",
    images: [
      {
        url: "/images/drone.jpg",
        width: 1400,
        height: 2489,
        alt: "Aerial photo of Sushan Tamang taken by drone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushan Tamang — Full-Stack & AI Developer",
    description:
      "Building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
    images: ["/images/drone.jpg"],
  },
  robots: { index: true, follow: true },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10120f" },
    { media: "(prefers-color-scheme: dark)", color: "#10120f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#10120f] text-[#ECE9DE]">
        {children}
      </body>
    </html>
  );
}