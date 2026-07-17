# Frontend Developer Portfolio — Foundation

Project scaffold only. No pages have been built yet — this is the
architecture pages will be assembled from.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · Lucide React · next-themes

## Folder structure

```
src/
├─ app/
│  ├─ layout.tsx        Root layout: fonts, ThemeProvider, SEO metadata, Navbar/Footer shell
│  ├─ page.tsx           Temporary placeholder route (replace when building pages)
│  ├─ design-system/     Internal QA page — every token/component/state in one place (not public content)
│  └─ globals.css        Design tokens (@theme), semantic color mapping, base layer, keyframes
├─ components/
│  ├─ ui/                Reusable, generic primitives (no page-specific logic)
│  │  ├─ Container.tsx
│  │  ├─ Section.tsx
│  │  ├─ Typography.tsx  Heading, Text, Code, Kbd — the canonical type scale as components
│  │  ├─ Button.tsx      Supports `download` for file-download CTAs (e.g. Resume)
│  │  ├─ IconButton.tsx  Icon-only control (toolbar/utility actions)
│  │  ├─ Card.tsx        Card + Header/Title/Description/Content/Footer, `interactive` variant
│  │  ├─ Input.tsx       Input + Textarea — label, helper text, error state, accessible
│  │  ├─ Badge.tsx       Non-interactive status pill
│  │  ├─ Tag.tsx         Interactive, optionally removable chip
│  │  ├─ Skeleton.tsx    Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard — pure CSS, no client JS
│  │  ├─ Reveal.tsx      Reusable fade/slide-in entrance animation wrapper
│  │  ├─ AnimatedCounter.tsx  Number-tween primitive, animates once on scroll into view
│  │  ├─ RadialProgress.tsx   Circular progress ring (not a linear bar), composes AnimatedCounter
│  │  ├─ Timeline.tsx    Timeline + TimelineItem — vertical scroll-reveal timeline scaffold
│  │  ├─ TypingText.tsx  Reusable typewriter effect, reduced-motion aware
│  │  └─ ThemeToggle.tsx
│  ├─ sections/           Page-level content blocks (composed from ui/ primitives)
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ Skills.tsx
│  │  ├─ Experience.tsx
│  │  ├─ Work.tsx        Featured Projects — filterable by category, screenshot zoom + hover overlay
│  │  ├─ GitHub.tsx      Live data from the public GitHub REST API — see lib/github.ts
│  │  └─ Contact.tsx     Form submits via mailto: (no backend yet) + direct email/GitHub links
│  ├─ layout/             App-shell components composed once, in the root layout
│  │  ├─ Navbar.tsx
│  │  └─ Footer.tsx
│  └─ providers/
│     └─ ThemeProvider.tsx
├─ config/
│  └─ site.ts             Single source of truth: name, nav items, social links, SEO defaults
├─ lib/
│  ├─ utils.ts             cn() (clsx + tailwind-merge), focusRing, transitionBase, formatRelativeTime
│  └─ github.ts            Typed GitHub REST API client + language/event summarizing helpers
└─ types/
   └─ index.ts             Shared interfaces (NavItem, SocialLink, WithChildren, WithClassName)
```

## Design tokens

Defined once in `src/app/globals.css` via Tailwind v4's `@theme` directive —
change the palette, radii, shadows, or type scale there and every component
updates. Visit `/design-system` after `npm run dev` to see every token and
component rendered together, in both light and dark mode.

- **Neutrals:** ink (`#0A0A0B` → `#F4F4F6`) / paper (`#FAFAFA`) — near-black
  and near-white, not pure extremes.
- **Signal accent:** refined violet (`#6E56CF` light / `#B4A4F7` dark), used
  sparingly for focus states, links, and primary CTAs.
- **Status family:** success / warning / danger / info, each a single quiet
  hue with a matching `-subtle` background — drives Badge, Tag, and Input
  error states.
- **Radius scale:** `xs` (4px) → `xl` (24px), five deliberate steps.
- **Shadow scale:** `xs` → `lg`, defined as runtime CSS variables (like
  color) so elevation is shadow-led in light mode but goes border-led and
  nearly invisible in dark mode — the Linear/Raycast convention, not one
  flat shadow value forced onto both themes.
- **Motion tokens:** `--duration-fast/base/slow` and `--ease-signature`
  (a signature ease-out curve) — every transition in the system references
  these instead of ad-hoc values.
- **Type:** Geist Sans (display + body), Geist Mono (eyebrows, nav
  wordmark, Badge/Tag/Code text) — the mono face is the project's
  signature detail, a nod to a code-editor aesthetic appropriate for a
  frontend engineer's site.
- **Dark mode:** class-based (`.dark`), driven by `next-themes`, defaults to
  system preference, no flash of incorrect theme.

## Interaction states

Hover and focus are not one-off styles — every interactive primitive
consumes the same `focusRing` and `transitionBase` constants from
`lib/utils.ts`, so the visible focus ring and hover timing can't drift
between components. Try tabbing through `/design-system` to see it.

## Component boundary (Server vs Client)

| Component      | Type   | Why                                  |
|-----------------|--------|---------------------------------------|
| `Container`     | Server | Pure layout, no interactivity         |
| `Section`       | Server | Pure layout, no interactivity         |
| `Footer`        | Server | Static content                        |
| `Button`        | Client | Framer Motion hover/tap feedback      |
| `Card`          | Client | Framer Motion hover lift              |
| `ThemeToggle`   | Client | `useTheme` hook, `matchMedia`         |
| `Navbar`        | Client | Scroll listener, mobile menu state    |
| `ThemeProvider` | Client | `next-themes` context                 |

## SEO & metadata files

Generated via Next.js's App Router file conventions — no static image
files or manual meta tags to keep in sync:

- `app/icon.tsx` / `app/apple-icon.tsx` — favicon + Apple touch icon,
  a monogram badge in the actual accent color, generated at build time.
- `app/opengraph-image.tsx` — the 1200×630 share-preview image used by
  Twitter/LinkedIn/Slack link unfurls, built from the same brand tokens.
- `app/sitemap.ts` / `app/robots.ts` — auto-generated `/sitemap.xml` and
  `/robots.txt`. The internal `/design-system` QA page is excluded from
  both (and carries its own `robots: noindex` in its page metadata) so it
  never shows up in search results.
- `app/manifest.ts` — web app manifest, reuses the same generated icons.
- `lib/structured-data.ts` — schema.org `Person` JSON-LD (name, job title,
  education, GitHub) rendered in the root layout for richer search results.
- `metadata.alternates.canonical` and a proper `viewport` export
  (with light/dark `theme-color`) in `layout.tsx`.

All of these read from `siteConfig.url` — update that one value once you
have a real domain and the sitemap, robots.txt, canonical URL, and OG tags
all follow.

## Performance

- **Code splitting:** `page.tsx` uses `next/dynamic` for every
  below-the-fold section (About, Skills, Experience, Work, GitHub,
  Contact) — only `Hero` is a static import. SSR stays on for all of them
  (Next's default), so search engines and no-JS visitors still get full
  HTML content; only the client-side hydration JS is chunked separately
  and loaded on demand, instead of one large upfront bundle. Verified by
  inspecting the actual build output — the dynamically-imported sections'
  content lands in separate chunks from Hero's.
- **Images:** every real photo goes through `next/image`; the one plain
  `<img>` (the GitHub contribution graph) is an external third-party SVG
  that isn't next/image-optimizable, and is commented as such. `priority`
  is reserved for genuinely above-the-fold images — it does **not**
  belong on the About photo, which is below the fold.
- `next.config.ts` sets `poweredByHeader: false` and
  `optimizePackageImports` for `lucide-react`/`framer-motion`.

## Accessibility & semantic HTML

Landmark elements throughout (`<header>`/`<nav>`, `<main>`, `<footer>`),
a real heading hierarchy (one `<h1>` in Hero → `<h2>` per `Section` →
`<h3>` for sub-headings — never skipped or reordered for visual sizing),
a skip-to-content link, visible focus rings on every interactive element
(`focusRing` in `lib/utils.ts`), and `aria-label`s on every icon-only
control. Motion respects `prefers-reduced-motion` throughout (see the
Motion section below).

## Motion & premium-feel layer

Added across the whole app, each one scoped and restrained rather than
layered onto everything (per "avoid excessive animations"):

- **Scroll progress bar** (`ui/ScrollProgressBar.tsx`) — thin accent bar,
  fixed to the top of the viewport, spring-smoothed.
- **Loading screen** (`ui/LoadingScreen.tsx`) — brief (500ms floor)
  branded splash, shown once per browser session via `sessionStorage`,
  skipped entirely for `prefers-reduced-motion`.
- **Page transitions** (`layout/PageTransition.tsx`) — keyed by pathname,
  so it only fires on an actual route change (`/` ↔ `/design-system`).
  Hash-anchor nav within the homepage never triggers it.
- **Smooth scrolling** (`providers/SmoothScrollProvider.tsx`) — Lenis for
  eased/inertia scroll, layered on top of the existing CSS
  `scroll-behavior: smooth`. Same-page anchor links (Navbar, Hero's scroll
  indicator, Footer, Contact) are explicitly intercepted and routed through
  Lenis's `scrollTo`, since a native anchor jump would otherwise fight its
  virtualized scroll position. Exposes `useLenisControls()` so components
  like the Navbar's mobile menu can pause/resume it (the existing
  `body.style.overflow` lock alone doesn't stop Lenis). Fully skipped for
  reduced motion.
- **Parallax** — `ui/FloatingShapes.tsx` (Hero's blobs, extracted so
  Contact can echo a subtler version) and `sections/_components/AboutPhoto.tsx`
  both use scroll-linked `useTransform`, scoped to each element's own
  viewport entry/exit rather than the whole page's scroll.
- **Cursor interaction** — a soft mouse-follow spotlight in the Hero only
  (`CursorSpotlight` in `Hero.tsx`), not a global custom cursor — those
  tend to hurt trackpad/touch users more than they add.
- **Gradient bookend** — Contact now echoes the Hero's aurora at low
  opacity (`FloatingShapes variant="subtle"`) for a sense of closure.

Reveal, hover, button, and card animations were already in place from
earlier passes and didn't need rework — this pass filled in what was
actually missing rather than doubling up on what already worked.

## Contact form & email

`Contact.tsx` uses React Hook Form + Zod (`lib/contact-schema.ts`) for
validation, then submits via a `mailto:` link — no backend, no API keys,
no environment variables. Submitting the form opens the visitor's email
client with the subject and message pre-filled, addressed to
`socialLinks.email` (`config/site.ts`).

This is intentionally simple: it works the moment the site is deployed,
with nothing to configure. The tradeoff is that it depends on the visitor
having a configured email client — if you outgrow that later, the
validation layer (`lib/contact-schema.ts`, the RHF-wired form) is already
in place and would only need a real submit handler swapped in.

## GitHub section

`GitHub.tsx` fetches live data client-side from the public GitHub REST API
(`api.github.com`) — no auth token needed, and no server involved, so it
costs nothing at build time. A few things worth knowing:

- **Rate limits:** unauthenticated requests are capped at 60/hour **per
  visitor's IP**, not per-deployment, so this scales fine for normal
  traffic. If a visitor hits the limit, the section shows a fallback card
  linking to the GitHub profile directly rather than breaking.
- **Contribution graph** uses `ghchart.rshah.org` — a third-party,
  unofficial SVG chart service, not GitHub's own. Swap the `<img>` src in
  `GitHub.tsx` for `github-readme-stats` or the GraphQL API (which does
  need a token) if you'd rather not depend on it.
- **Username** is set once, in `socialLinks.githubUsername` (`config/site.ts`).

## Setup

```bash
npm install
npm run dev
```

Add your actual resume PDF at `public/resume.pdf` — the Hero's "Download
Resume" button points to `siteConfig.resumeUrl` (`/resume.pdf` by default)
and will 404 until that file exists.

## Conventions

- Compose class overrides through `cn()` (`src/lib/utils.ts`) — never
  concatenate Tailwind classes with template strings.
- New nav links or social links go in `src/config/site.ts`, not inline in
  `Navbar`/`Footer`.
- Colors and spacing come from the design tokens in `globals.css`
  (`bg-background`, `text-foreground`, `border-border`, `text-accent`,
  etc.) — avoid raw hex values in components.
