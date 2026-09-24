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
  title: "Sushan Tamang — Full-Stack & AI Developer",
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
    "Nepal",
  ],
  openGraph: {
    title: "Sushan Tamang — Full-Stack & AI Developer",
    description:
      "Building production-grade AI-powered applications, scalable web platforms, and multi-service architectures.",
    type: "website",
    images: ["/images/drone.jpg"],
  },
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