# Graph Report - personal-portfolio  (2026-07-19)

## Corpus Check
- 34 files · ~16,150 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 313 nodes · 392 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2737ac00`
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
- linter
- PlasmaWave.tsx
- CurvedLoop.tsx
- next.config.ts
- postcss.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `cn()` - 24 edges
2. `compilerOptions` - 16 edges
3. `registries` - 9 edges
4. `include` - 7 edges
5. `includes` - 6 edges
6. `tailwind` - 6 edges
7. `scripts` - 6 edges
8. `useThemeColors()` - 6 edges
9. `vcs` - 4 edges
10. `!.next` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ScrollStack()` --references--> `lenis`  [EXTRACTED]
  src/components/ScrollStack.tsx → package.json
- `OptionCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/OfferWizard.tsx → src/lib/utils.ts
- `FeatureCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/OfferWizard.tsx → src/lib/utils.ts
- `OfferWizard()` --calls--> `cn()`  [EXTRACTED]
  src/components/OfferWizard.tsx → src/lib/utils.ts
- `StackSection()` --calls--> `cn()`  [EXTRACTED]
  src/app/Components/StackSection.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (18 total, 4 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.09
Nodes (35): features, panel, StackSection(), Home(), CurvedLoopProps, MorphingDialog(), MorphingDialogClose(), MorphingDialogCloseProps (+27 more)

### Community 1 - "components.json"
Cohesion: 0.07
Nodes (26): aliases, components, utils, iconLibrary, menuAccent, menuColor, registries, @aceternity (+18 more)

### Community 2 - "dependencies"
Cohesion: 0.05
Nodes (41): class-variance-authority, clsx, framer-motion, gsap, lucide-react, motion, next, ogl (+33 more)

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
Cohesion: 0.08
Nodes (22): source, assist, actions, files, ignoreUnknown, includes, formatter, enabled (+14 more)

### Community 7 - "linter"
Cohesion: 0.15
Nodes (18): buildJourney(), poseTarget(), ScrollSceneController(), Env, ScrollScene(), TravelingScene, useEnv(), DESKTOP_POSES (+10 more)

### Community 8 - "tailwind"
Cohesion: 0.16
Nodes (9): bodoni, geistMono, geistSans, metadata, BubbleMenuProps, DEFAULT_ITEMS, MenuItem, hover() (+1 more)

### Community 9 - "layout.tsx"
Cohesion: 0.11
Nodes (15): BUDGET_OPTIONS, composeMessage(), FEATURE_OPTIONS, FeatureCard(), INITIAL, OfferData, OfferWizard(), OptionCard() (+7 more)

### Community 10 - "devDependencies"
Cohesion: 0.11
Nodes (19): @biomejs/biome, devDependencies, @biomejs/biome, tailwindcss, @tailwindcss/postcss, @types/node, @types/opentype.js, @types/react (+11 more)

### Community 11 - "linter"
Cohesion: 0.22
Nodes (9): next, react, linter, domains, enabled, rules, recommended, suspicious (+1 more)

### Community 14 - "next.config.ts"
Cohesion: 0.15
Nodes (15): Hero(), useEntrance(), hexToRgb(), PlasmaWave(), PlasmaWaveProps, ScenePalette, TravelGroup(), TravelingScene() (+7 more)

### Community 16 - "next.config.ts"
Cohesion: 0.29
Nodes (5): lenis, lenis, ScrollStack(), ScrollStackItemProps, ScrollStackProps

## Knowledge Gaps
- **154 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+149 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `!.next` connect `morphing-dialog.tsx` to `tailwind`, `package.json`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _154 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09080841638981174 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `morphing-dialog.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._