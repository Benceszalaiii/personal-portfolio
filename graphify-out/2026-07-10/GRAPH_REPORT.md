# Graph Report - personal-portfolio  (2026-07-10)

## Corpus Check
- 32 files · ~13,585 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 237 nodes · 288 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `58522fdd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_components.json|components.json]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_package.json|package.json]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_biome.json|biome.json]]
- [[_COMMUNITY_morphing-dialog.tsx|morphing-dialog.tsx]]
- [[_COMMUNITY_linter|linter]]
- [[_COMMUNITY_tailwind|tailwind]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_PlasmaWave.tsx|PlasmaWave.tsx]]
- [[_COMMUNITY_CurvedLoop.tsx|CurvedLoop.tsx]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 17 edges
2. `compilerOptions` - 16 edges
3. `registries` - 9 edges
4. `tailwind` - 6 edges
5. `scripts` - 6 edges
6. `vcs` - 4 edges
7. `formatter` - 4 edges
8. `linter` - 4 edges
9. `ScrollSceneController()` - 4 edges
10. `Reveal()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ScrollStack()` --references--> `lenis`  [EXTRACTED]
  src/components/ScrollStack.tsx → package.json
- `StackSection()` --calls--> `cn()`  [EXTRACTED]
  src/app/Components/StackSection.tsx → src/lib/utils.ts
- `Home()` --calls--> `cn()`  [EXTRACTED]
  src/app/page.tsx → src/lib/utils.ts
- `FadeInDiv()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/tabs.tsx → src/lib/utils.ts
- `poseTarget()` --calls--> `pxToWorld()`  [EXTRACTED]
  src/components/ScrollScene/Controller.tsx → src/components/ScrollScene/scene-state.ts

## Import Cycles
- None detected.

## Communities (16 total, 5 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.10
Nodes (34): features, panel, StackSection(), Home(), Project, projects, MorphingDialog(), MorphingDialogClose() (+26 more)

### Community 1 - "components.json"
Cohesion: 0.07
Nodes (26): aliases, components, utils, iconLibrary, menuAccent, menuColor, registries, @aceternity (+18 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (23): dependencies, class-variance-authority, clsx, gsap, lenis, lucide-react, motion, next (+15 more)

### Community 3 - "package.json"
Cohesion: 0.18
Nodes (6): Status, brandSwatches, Feature, features, stack, Reveal()

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (20): devDependencies, @biomejs/biome, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, @types/three (+12 more)

### Community 5 - "biome.json"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "morphing-dialog.tsx"
Cohesion: 0.08
Nodes (25): source, assist, actions, next, react, files, ignoreUnknown, includes (+17 more)

### Community 7 - "linter"
Cohesion: 0.11
Nodes (20): buildJourney(), poseTarget(), ScrollSceneController(), Env, ScrollScene(), TravelingScene, useEnv(), DESKTOP_POSES (+12 more)

### Community 8 - "tailwind"
Cohesion: 0.17
Nodes (8): bodoni, geistMono, geistSans, metadata, BubbleMenuProps, DEFAULT_ITEMS, MenuItem, Navbar()

### Community 12 - "PlasmaWave.tsx"
Cohesion: 0.67
Nodes (3): isEmail(), POST(), resend

### Community 14 - "next.config.ts"
Cohesion: 0.43
Nodes (5): Hero(), useEntrance(), hexToRgb(), PlasmaWave(), PlasmaWaveProps

## Knowledge Gaps
- **134 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `compilerOptions`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._