# Design

Dark-only theme with red accents for a premium Hungarian driving school. All tokens live in `src/app/(app)/globals.css` (shadcn/Tailwind v4, OKLCH) — **user-supplied palette, do not alter the values**. No light mode exists.

## Color

Strategy: dark charcoal surfaces, red carries identity (secondary/accent-foreground/border/ring are all red, hue ~29).

| Token | Value | Use |
| --- | --- | --- |
| `--background` / `--card` | `oklch(0.2138 0.0019 286)` | page + cards (same tone — borders define cards) |
| `--popover` / `--muted` | `oklch(0.2686 0 0)` | raised panels, quiet fills |
| `--primary` | `oklch(0.9219 0 0)` | light button surface |
| `--primary-foreground` | `oklch(0.4105 0.1651 29)` | deep red text on primary buttons |
| `--secondary` | `oklch(0.3957 0.1624 29)` | saturated red fills (logo chip, chat bubbles, red buttons) |
| `--accent-foreground` | `oklch(0.6280 0.2577 29)` | bright red text/icon emphasis, prices, active states |
| `--border` / `--ring` | red `oklch(0.4715 0.1935 29)` | red-tinted hairlines + focus |
| `--destructive` | `oklch(0.7036 0.1881 22)` | errors, cancellations |

Usage rules:
- Emphasis text/icons: `text-accent-foreground`. Red fills: `bg-secondary text-secondary-foreground`. Soft red tints: `bg-secondary/10..20`, `border-secondary/40..60`.
- CTA glow: `shadow-lg shadow-secondary/40`.
- **Signature separator: dark→red gradient hairlines** via `.border-gradient-b` / `.border-gradient-t` utilities (navbar bottom, footer top). The utility draws the hairline with a positioned `::after`/`::before`, so the host element must set its own `position` (`sticky` on the header, `relative` on the footer) — the utility deliberately does not force `position: relative` (that would break the sticky navbar). Section separators use `border-border/30`.
- Badge variant `accent` = red tint chip. Never invent hex values.

## Typography

Intended display + body family: **Funnel Display** (weights 300–800), set as `--font-sans` in `globals.css`; `--tracking-normal: 0.025em`. Headings `font-semibold text-balance` — h1 `text-5xl–6xl`, section h2 `text-3xl–4xl`; body ≤ ~70ch.

> ⚠️ **Font not yet loaded on the public site.** Funnel Display is imported only in the Payload admin (`src/app/(payload)/custom.scss`). The `(app)` frontend never loads the webfont (no `next/font`, `@font-face`, or `<link>`), so `--font-sans` currently resolves to its `ui-serif, serif` fallback and marketing headings render in the browser's default serif. Wire the font via `next/font/google` (Funnel Display) in the `(app)` layout before launch; that is the single highest-impact visual fix.

## Radius, shadow, spacing

`--radius: 1rem`; cards `rounded-xl–3xl`; shadows subtle (template values), red glow reserved for primary CTAs; marketing rhythm `py-16–py-24`, dashboards `py-8–py-10`.

## Components

- shadcn/ui in `src/components/ui/*`; domain cards `TeacherCard` / `CarCard` / `PostCard` (hover: `-translate-y-1` + `border-accent-foreground`, 300ms). `fill` images are wrapped by `Media`, which applies `absolute inset-0` so the image covers its positioned parent; same-origin media URLs stay relative for Next's image optimizer (`images.localPatterns`).
- `CarGallery` (`src/components/CarGallery`): client component on the car detail page. Thumbnail click crossfades the large image (`motion/react` `AnimatePresence`, 350ms); active thumbnail gets `ring-2 ring-accent-foreground ring-offset-2`, inactive thumbnails sit at `opacity-60` until hover. Keyboard-operable `<button>`s with Hungarian `aria-label`s.
- Header (`SiteHeader`): sticky (`sticky top-0 z-50`), `bg-background/80 backdrop-blur-xl`, `.border-gradient-b`.
- Admin: `BackToSite` renders in the Payload admin top navbar (`admin.components.actions` in `payload.config.ts`) — pill link "Vissza a főoldalra" → `/`.
- Dashboards (`/fiok`, `/oktatoi-felulet`): product register — tab underline in `border-accent-foreground`, state badges (`LessonBadges`), skeletons for loading, Hungarian empty/error states.

## Motion

Stack: **React Three Fiber + drei** for the hero 3D; **`motion/react`** for UI transitions. App-level `<MotionConfig reducedMotion="user">` (in `src/providers`) makes every `motion` component honor `prefers-reduced-motion` (transform/layout animations skip, opacity still resolves — content never ships hidden).

- **Hero 3D** (`src/components/Hero3D/*`): a cinematic night-road corridor — a receding family of glowing red light-gates over a wet-asphalt reflector floor, scene-colored fog dissolving into `--background`, lane dashes gliding toward the viewer. Camera does a slow idle drift + damped pointer parallax. `Scene.tsx` documents the swap points (hero object, lighting, camera, palette hexes — WebGL can't read the OKLCH tokens). Performance: lazy-loaded client-only (`next/dynamic`, `ssr:false`), capped DPR with `PerformanceMonitor` downgrade, `quality: 'low'` on mobile/coarse-pointer, `frameloop` pauses off-screen (`IntersectionObserver`) and runs `'demand'` (single static frame) under reduced motion. A gradient backdrop stands in while the bundle loads or when WebGL is unavailable; a radial scrim keeps hero copy readable over the bright gates.
- **Section reveals** (`components/motion/Reveal.tsx`): restrained fade-up (`y:24→0`, 0.7s, ease `[0.22,1,0.36,1]`), `whileInView` once. Use one per section (two for split layouts); reduced motion is handled by the global `MotionConfig`.
- **Hero scroll parallax** (`components/motion/HeroParallax.tsx`): hero copy drifts up and fades on scroll via `useScroll`/`useTransform`; passes identity values under reduced motion.
- Micro-transitions 200–300ms ease-out on cards, tabs, links.

## Voice

All copy Hungarian (tegeződés toward students); HUF via `formatHUF`; dates via `hu-HU` formatters in `src/utilities/formatDateTime.ts`.
