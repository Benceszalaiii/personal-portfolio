# Graph Report - C:\Users\Bence\git-repos\nextjs\personal-portfolio  (2026-07-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 181 nodes · 218 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2866df6f`
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
- [[_COMMUNITY_BubbleMenu.tsx|BubbleMenu.tsx]]
- [[_COMMUNITY_DecryptedText.tsx|DecryptedText.tsx]]
- [[_COMMUNITY_PlasmaWave.tsx|PlasmaWave.tsx]]
- [[_COMMUNITY_CurvedLoop.tsx|CurvedLoop.tsx]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 18 edges
2. `compilerOptions` - 16 edges
3. `registries` - 9 edges
4. `tailwind` - 6 edges
5. `scripts` - 6 edges
6. `vcs` - 4 edges
7. `formatter` - 4 edges
8. `linter` - 4 edges
9. `useMorphingDialog()` - 4 edges
10. `MorphingDialog()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ScrollStack()` --references--> `lenis`  [EXTRACTED]
  src/components/ScrollStack.tsx → package.json
- `Home()` --calls--> `cn()`  [EXTRACTED]
  src/app/page.tsx → src/lib/utils.ts
- `FadeInDiv()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/tabs.tsx → src/lib/utils.ts
- `StackSection()` --calls--> `cn()`  [EXTRACTED]
  src/app/Components/StackSection.tsx → src/lib/utils.ts
- `MorphingDialogTrigger()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/morphing-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.15
Nodes (19): StackSection(), tabs, Home(), Project, GradientText(), GradientTextProps, MorphingDialogClose(), MorphingDialogContainer() (+11 more)

### Community 1 - "components.json"
Cohesion: 0.10
Nodes (20): aliases, components, utils, iconLibrary, menuAccent, menuColor, registries, @aceternity (+12 more)

### Community 2 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, class-variance-authority, clsx, gsap, lenis, lucide-react, motion, next (+12 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (19): devDependencies, @biomejs/biome, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "biome.json"
Cohesion: 0.12
Nodes (16): source, assist, actions, files, ignoreUnknown, includes, formatter, enabled (+8 more)

### Community 6 - "morphing-dialog.tsx"
Cohesion: 0.16
Nodes (15): MorphingDialog(), MorphingDialogCloseProps, MorphingDialogContainerProps, MorphingDialogContentProps, MorphingDialogContext, MorphingDialogContextValue, MorphingDialogDescriptionProps, MorphingDialogImageProps (+7 more)

### Community 7 - "linter"
Cohesion: 0.22
Nodes (9): next, react, linter, domains, enabled, rules, recommended, suspicious (+1 more)

### Community 8 - "tailwind"
Cohesion: 0.33
Nodes (6): tailwind, baseColor, config, css, cssVariables, prefix

### Community 9 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 10 - "BubbleMenu.tsx"
Cohesion: 0.40
Nodes (3): BubbleMenuProps, DEFAULT_ITEMS, MenuItem

### Community 11 - "DecryptedText.tsx"
Cohesion: 0.50
Nodes (3): DecryptedText(), DecryptedTextProps, Direction

### Community 12 - "PlasmaWave.tsx"
Cohesion: 0.67
Nodes (3): hexToRgb(), PlasmaWave(), PlasmaWaveProps

## Knowledge Gaps
- **115 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1476923076923077 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._