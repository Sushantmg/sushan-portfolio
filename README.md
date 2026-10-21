# sushan-portfolio

Personal site and portfolio for **Sushan Tamang** — full-stack & AI developer from Pokhara, Nepal.

A single-page portfolio with crawlable case files and journal posts, a print-ready
résumé, an in-page knowledge bot, and a keyboard-first command palette.

**Live:** https://sushan-portfolio.vercel.app

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Motion | Framer Motion, Lenis (smooth scroll) |
| Icons | lucide-react, react-icons |
| Language | TypeScript (strict) |

## Routes

| Route | Type | Notes |
| --- | --- | --- |
| `/` | static | The one-pager — hero, about, experience, skills, projects, journal, education, contact |
| `/case/[slug]` | SSG | One page per project (7). Also reachable as `#case/<slug>`, which opens the in-page modal |
| `/journal/[slug]` | SSG | One page per build-log entry (4) |
| `/cv` | static | Print-ready résumé — "save as PDF" in the toolbar |
| `/feed.xml` | dynamic | RSS feed of the journal, one `<link>` per post |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | dynamic | Generated from the same data as the pages |
| `/api/contact` | dynamic | Contact form handler (Resend, with a `mailto:` fallback) |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

### Environment

Copy `.env.example` to `.env.local`. All three variables are optional — without
`RESEND_API_KEY` the contact form falls back to opening a `mailto:` composer.

```bash
RESEND_API_KEY=      # https://resend.com/api-keys
CONTACT_TO=          # defaults to sushantmg2004@gmail.com
CONTACT_FROM=        # defaults to onboarding@resend.dev
```

`NEXT_PUBLIC_SITE_URL` overrides the canonical origin used for canonical links,
OpenGraph, the sitemap, and RSS. It defaults to the Vercel deployment.

## Content

Everything the site renders lives in `src/lib/data.ts` — profile, skills,
experience, projects, notes, education, and certifications. `src/lib/site.ts`
holds the canonical origin. The pages, the sitemap, the RSS feed, the bot's
knowledge, and the JSON-LD are all generated from that one file, so adding a
project or a journal entry is a single edit.

## Accessibility & SEO notes

- Every overlay is a labelled `role="dialog"` with a focus trap, focus restore,
  Escape handling, and a scroll lock.
- The chat transcript is a live region, muted while text streams in so replies
  are announced once rather than on every frame.
- Canonicals, OpenGraph, and JSON-LD point at the live site — never the repo.
- `SoftwareApplication`, `BlogPosting`, `Person`, `ProfilePage`, and
  `BreadcrumbList` structured data is emitted per page.
