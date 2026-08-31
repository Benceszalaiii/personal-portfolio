# Graph Report - personal-portfolio  (2026-07-20)

## Corpus Check
- 45 files · ~28,242 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 369 nodes · 463 edges · 22 communities (18 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c3e922b6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.tsx
- components.json
- dependencies
- package.json
- compilerOptions
- biome.json
- morphing-dialog.tsx
- linter
- tailwind
- layout.tsx
- devDependencies
- BubbleMenu.tsx
- PlasmaWave.tsx
- CurvedLoop.tsx
- next.config.ts
- postcss.config.mjs
- next.config.ts
- postcss.config.mjs
- CurvedLoop.tsx
- macbook-scroll.tsx
- LogoLoop.tsx
- macbook-scroll.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 26 edges
2. `compilerOptions` - 16 edges
3. `registries` - 9 edges
4. `useThemeColors()` - 8 edges
5. `include` - 7 edges
6. `includes` - 6 edges
7. `tailwind` - 6 edges
8. `scripts` - 6 edges
9. `MorphingDialog()` - 5 edges
10. `MorphingDialogTrigger()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ScrollStack()` --references--> `lenis`  [EXTRACTED]
  src/components/ScrollStack.tsx → package.json
- `Home()` --calls--> `cn()`  [EXTRACTED]
  src/app/page.tsx → src/lib/utils.ts
- `KBtn()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/macbook-scroll.tsx → src/lib/utils.ts
- `OptionCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/OfferWizard.tsx → src/lib/utils.ts
- `FeatureCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/OfferWizard.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (22 total, 4 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.09
Nodes (31): AboutSection(), faqs, features, Home(), MorphingDialog(), MorphingDialogClose(), MorphingDialogCloseProps, MorphingDialogContainer() (+23 more)

### Community 1 - "components.json"
Cohesion: 0.07
Nodes (26): aliases, components, utils, iconLibrary, menuAccent, menuColor, registries, @aceternity (+18 more)

### Community 2 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, framer-motion, gsap, lucide-react, motion, next, ogl (+37 more)

### Community 3 - "package.json"
Cohesion: 0.22
Nodes (6): ContactSection(), brandSwatches, Feature, features, stack, Reveal()

### Community 4 - "compilerOptions"
Cohesion: 0.16
Nodes (13): ignoreScripts, name, private, scripts, build, dev, format, lint (+5 more)

### Community 5 - "biome.json"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, **/*.ts (+20 more)

### Community 6 - "morphing-dialog.tsx"
Cohesion: 0.06
Nodes (31): source, assist, actions, next, react, files, ignoreUnknown, includes (+23 more)

### Community 7 - "linter"
Cohesion: 0.15
Nodes (18): buildJourney(), poseTarget(), ScrollSceneController(), Env, ScrollScene(), TravelingScene, useEnv(), DESKTOP_POSES (+10 more)

### Community 8 - "tailwind"
Cohesion: 0.20
Nodes (6): DEFAULT_ITEMS, Falloff, FALLOFF_CURVES, LineSidebarProps, SectionLink, SECTIONS

### Community 9 - "layout.tsx"
Cohesion: 0.09
Nodes (23): BUDGET_OPTIONS, composeMessage(), FEATURE_OPTIONS, FeatureCard(), INITIAL, OfferData, OfferWizard(), OptionCard() (+15 more)

### Community 10 - "devDependencies"
Cohesion: 0.11
Nodes (19): @biomejs/biome, devDependencies, @biomejs/biome, tailwindcss, @tailwindcss/postcss, @types/node, @types/opentype.js, @types/react (+11 more)

### Community 11 - "BubbleMenu.tsx"
Cohesion: 0.40
Nodes (3): BubbleMenuProps, DEFAULT_ITEMS, MenuItem

### Community 12 - "PlasmaWave.tsx"
Cohesion: 0.67
Nodes (3): isEmail(), POST(), TO

### Community 14 - "next.config.ts"
Cohesion: 0.10
Nodes (21): FooterLaser(), LaserFlow, Hero(), useEntrance(), bodoni, geistMono, geistSans, metadata (+13 more)

### Community 16 - "next.config.ts"
Cohesion: 0.29
Nodes (5): lenis, lenis, ScrollStack(), ScrollStackItemProps, ScrollStackProps

### Community 19 - "macbook-scroll.tsx"
Cohesion: 0.50
Nodes (4): hexToRGB(), LaserFlow(), LaserUniforms, Props

### Community 20 - "LogoLoop.tsx"
Cohesion: 0.15
Nodes (5): LOGOS, ANIMATION_CONFIG, LogoItem, LogoLoop, LogoLoopProps

### Community 21 - "macbook-scroll.tsx"
Cohesion: 0.20
Nodes (3): MacbookShowcase(), KBtn(), MacbookScroll()

## Knowledge Gaps
- **172 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+167 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `!.next` connect `morphing-dialog.tsx` to `package.json`, `next.config.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _172 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08771929824561403 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `morphing-dialog.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._