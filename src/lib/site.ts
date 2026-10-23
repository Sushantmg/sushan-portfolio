/**
 * Canonical origin for the deployed site.
 *
 * Every absolute URL we emit — canonical links, OpenGraph, sitemap entries,
 * RSS links, JSON-LD `url` nodes — must point at the live site, not the GitHub
 * repo. Override with NEXT_PUBLIC_SITE_URL when the domain changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sushan-portfolio.vercel.app"
).replace(/\/+$/, "");

/** Join a path onto the canonical origin. */
export const siteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Shared social preview image. */
export const OG_IMAGE = "/opengraph-image";

/**
 * The RSS alternate. Next merges `alternates` shallowly, so any route that
 * declares its own `alternates` replaces this — every route has to re-declare
 * it alongside its canonical.
 */
export const RSS_ALTERNATE = {
  types: { "application/rss+xml": "/feed.xml" },
} as const;

/** OpenGraph + Twitter image, shared by routes that do not generate their own. */
export const SOCIAL_IMAGE = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "Sushan Tamang — Full-Stack & AI Developer",
  },
];

export const site = {
  name: "Sushan Tamang",
  role: "Full-Stack & AI Developer",
  locale: "en_US",
} as const;
