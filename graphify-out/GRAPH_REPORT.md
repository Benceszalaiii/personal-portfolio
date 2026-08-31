# Graph Report - personal-portfolio  (2026-08-31)

## Corpus Check
- 90 files · ~79,182 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1225 nodes · 1694 edges · 112 communities (62 shown, 50 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8f005283`
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
- slide_search_core.py
- dependencies
- color
- spacing
- TestTailwindConfigGenerator
- html-token-validator.py
- pricing.ts
- BM25
- cn
- PriceCalculator.tsx
- generate-slide.py
- TailwindConfigGenerator
- DesignSystemGenerator
- fetch-background.py
- design_system.py
- generate.py
- fontSize
- TestShadcnInstaller
- main
- _sync_all.py
- card
- .add_components
- ShadcnInstaller
- .generate_config_string
- primitive
- test_tailwind_config_gen.py
- _search_csv
- generate.py
- button
- ._base_config
- _run
- BM25
- input
- semantic
- radius
- shadow
- _generate_intelligent_overrides
- design-tokens-starter.json
- $type
- lg
- padding-x
- radius
- xl
- md
- none
- test_sync_brand_to_tokens.py
- main
- shadcn_add.py
- .__init__
- search.py
- StackSection.tsx
- .test_add_components_with_overwrite
- .test_add_components_dry_run
- .test_add_components_success
- .test_add_components_npx_not_found
- .test_add_all_components_no_config
- .test_list_installed_no_config
- .test_init_default_project_root
- .test_init_dry_run
- .test_get_installed_components_empty
- .test_get_installed_components_with_files
- .test_add_components_no_components
- .test_add_breakpoints
- .test_recommend_plugins
- .test_generate_typescript_config
- .test_generate_javascript_config
- .test_validate_config_no_content
- .test_init_javascript
- .test_write_config_invalid_path
- .test_default_content_paths_react
- .test_default_content_paths_vue
- .test_add_colors
- framer-motion
- gsap
- lucide-react
- motion
- next
- opentype.js
- radix-ui
- @radix-ui/react-tabs
- react
- react-dom
- react-icons
- @react-three/drei
- resend
- shadcn
- @tabler/icons-react
- tailwind-merge
- three
- tw-animate-css

## God Nodes (most connected - your core abstractions)
1. `TailwindConfigGenerator` - 57 edges
2. `cn()` - 36 edges
3. `TestTailwindConfigGenerator` - 35 edges
4. `ShadcnInstaller` - 33 edges
5. `TestShadcnInstaller` - 26 edges
6. `compilerOptions` - 16 edges
7. `color` - 15 edges
8. `gray` - 12 edges
9. `spacing` - 12 edges
10. `ValidationResult` - 11 edges

## Surprising Connections (you probably didn't know these)
- `TestShadcnInstaller` --uses--> `ShadcnInstaller`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_shadcn_add.py → .agents/skills/ui-styling/scripts/shadcn_add.py
- `TestGeneratedConfigIsValidJs` --uses--> `TailwindConfigGenerator`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py → .agents/skills/ui-styling/scripts/tailwind_config_gen.py
- `TestTailwindConfigGenerator` --uses--> `TailwindConfigGenerator`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py → .agents/skills/ui-styling/scripts/tailwind_config_gen.py
- `_generate_intelligent_overrides()` --calls--> `search()`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/design_system.py → .agents/skills/ui-ux-pro-max/scripts/core.py
- `ScrollStack()` --references--> `lenis`  [EXTRACTED]
  src/components/ScrollStack.tsx → package.json

## Import Cycles
- None detected.

## Communities (112 total, 50 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.11
Nodes (23): MorphingDialog(), MorphingDialogClose(), MorphingDialogCloseProps, MorphingDialogContainer(), MorphingDialogContainerProps, MorphingDialogContent(), MorphingDialogContentProps, MorphingDialogContext (+15 more)

### Community 1 - "components.json"
Cohesion: 0.07
Nodes (26): aliases, components, utils, iconLibrary, menuAccent, menuColor, registries, @aceternity (+18 more)

### Community 2 - "dependencies"
Cohesion: 0.22
Nodes (9): class-variance-authority, clsx, ogl, dependencies, class-variance-authority, clsx, ogl, @react-three/fiber (+1 more)

### Community 3 - "package.json"
Cohesion: 0.07
Nodes (27): nextConfig, !.next, ContactSection(), metadata, CaseStudyPage(), generateMetadata(), Params, metadata (+19 more)

### Community 4 - "compilerOptions"
Cohesion: 0.05
Nodes (53): $type, $value, $type, $value, $type, $value, $type, $value (+45 more)

### Community 5 - "biome.json"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, **/*.ts (+20 more)

### Community 6 - "morphing-dialog.tsx"
Cohesion: 0.07
Nodes (29): source, assist, actions, next, react, files, ignoreUnknown, includes (+21 more)

### Community 7 - "linter"
Cohesion: 0.06
Nodes (42): BM25, detect_domain(), get_cip_brief(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection (+34 more)

### Community 8 - "tailwind"
Cohesion: 0.12
Nodes (12): bodoni, geistMono, geistSans, metadata, DEFAULT_ITEMS, Falloff, FALLOFF_CURVES, LineSidebarProps (+4 more)

### Community 9 - "layout.tsx"
Cohesion: 0.11
Nodes (15): BUDGET_OPTIONS, composeMessage(), FEATURE_OPTIONS, FeatureCard(), INITIAL, OfferData, OfferWizard(), OptionCard() (+7 more)

### Community 10 - "devDependencies"
Cohesion: 0.06
Nodes (32): @biomejs/biome, devDependencies, @biomejs/biome, tailwindcss, @tailwindcss/postcss, @types/node, @types/opentype.js, @types/react (+24 more)

### Community 11 - "BubbleMenu.tsx"
Cohesion: 0.40
Nodes (3): BubbleMenuProps, DEFAULT_ITEMS, MenuItem

### Community 12 - "PlasmaWave.tsx"
Cohesion: 0.67
Nodes (3): isEmail(), POST(), TO

### Community 14 - "next.config.ts"
Cohesion: 0.07
Nodes (36): FooterLaser(), LaserFlow, Hero(), useEntrance(), hexToRgb(), PlasmaWave(), PlasmaWaveProps, buildJourney() (+28 more)

### Community 16 - "next.config.ts"
Cohesion: 0.29
Nodes (5): lenis, lenis, ScrollStack(), ScrollStackItemProps, ScrollStackProps

### Community 19 - "macbook-scroll.tsx"
Cohesion: 0.50
Nodes (4): hexToRGB(), LaserFlow(), LaserUniforms, Props

### Community 20 - "LogoLoop.tsx"
Cohesion: 0.15
Nodes (5): LOGOS, ANIMATION_CONFIG, LogoItem, LogoLoop, LogoLoopProps

### Community 22 - "slide_search_core.py"
Cohesion: 0.08
Nodes (36): format_context(), format_result(), main(), Format a single search result for display, Format contextual recommendations for display., BM25, calculate_pattern_break(), detect_domain() (+28 more)

### Community 23 - "dependencies"
Cohesion: 0.05
Nodes (38): description, name, name_hu, provided_by, description, name, name_hu, provided_by (+30 more)

### Community 24 - "color"
Cohesion: 0.05
Nodes (37): $type, $value, background, destructive, destructive-foreground, foreground, muted, muted-foreground (+29 more)

### Community 25 - "spacing"
Cohesion: 0.06
Nodes (34): $type, $value, $type, $value, $type, $value, $type, $value (+26 more)

### Community 26 - "TestTailwindConfigGenerator"
Cohesion: 0.07
Nodes (15): Test adding colors multiple times., Test adding full color palette., Test adding custom spacing., Test TailwindConfigGenerator class., Test that adding same plugin twice doesn't duplicate., Test plugin recommendations for Next.js., Test initialization with default settings., Test generating config with custom colors. (+7 more)

### Community 27 - "html-token-validator.py"
Cohesion: 0.14
Nodes (24): get_context(), is_allowed_exception(), is_allowed_rgba(), is_inside_block(), load_css_variables(), main(), print_result(), print_summary() (+16 more)

### Community 28 - "pricing.ts"
Cohesion: 0.10
Nodes (23): OptionGroup(), Props, Tick(), DetailTarget, Advisory, allItems, baseItems, byId (+15 more)

### Community 29 - "BM25"
Cohesion: 0.11
Nodes (19): BM25, detect_domain(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection, Search across all domains and combine results (+11 more)

### Community 30 - "cn"
Cohesion: 0.15
Nodes (13): faqs, Home(), Button(), buttonVariants, MorphingDialogDescription(), MorphingDialogSubtitle(), MorphingDialogTitle(), Signature() (+5 more)

### Community 31 - "PriceCalculator.tsx"
Cohesion: 0.16
Nodes (19): budgetBand(), DetailPopover(), EnquiryDialog(), FEATURE_BY_ITEM, GROUPS, morph(), PriceCalculator(), PROJECT_TYPE_BY_PACKAGE (+11 more)

### Community 32 - "generate-slide.py"
Cohesion: 0.15
Nodes (19): _e(), generate_chart_slide(), generate_cta_slide(), generate_deck(), generate_metrics_slide(), generate_problem_slide(), generate_solution_slide(), generate_testimonial_slide() (+11 more)

### Community 33 - "TailwindConfigGenerator"
Cohesion: 0.10
Nodes (11): Generate Tailwind CSS configuration files., Add full color palette (50-950 shades) for a base color.          Args:, TailwindConfigGenerator, Test adding custom fonts., Test validating valid configuration., Test generating complete TypeScript configuration., Test initialization with different frameworks., Test default output path for TypeScript. (+3 more)

### Community 34 - "DesignSystemGenerator"
Cohesion: 0.14
Nodes (11): DesignSystemGenerator, Find matching reasoning rule for a category., Apply reasoning rules to search results., Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation.          variance/motion/density, Bucket a 1-10 dial value into its tier config. Returns None if value is None., Generates design system recommendations from aggregated searches. (+3 more)

### Community 35 - "fetch-background.py"
Cohesion: 0.17
Nodes (17): generate_css_for_background(), get_background_image(), get_curated_images(), get_overlay_css(), get_pexels_search_url(), load_backgrounds_config(), load_brand_colors(), main() (+9 more)

### Community 36 - "design_system.py"
Cohesion: 0.17
Nodes (16): ansi_ljust(), format_ascii_box(), format_markdown(), format_master_md(), generate_design_system(), hex_to_ansi(), persist_design_system(), Convert hex color to ANSI True Color swatch (██) with fallback. (+8 more)

### Community 37 - "generate.py"
Cohesion: 0.20
Nodes (15): apply_color(), apply_viewbox_size(), extract_svgs(), generate_batch(), generate_icon(), generate_sizes(), load_env(), main() (+7 more)

### Community 38 - "fontSize"
Cohesion: 0.12
Nodes (16): $type, $value, $type, $value, $type, $value, $type, $value (+8 more)

### Community 39 - "TestShadcnInstaller"
Cohesion: 0.12
Nodes (9): Test adding components without shadcn config., Test adding components that are already installed., Test ShadcnInstaller class., Test adding all components in dry run mode., Create temporary project structure., Test successful addition of all components., Test listing installed components when none exist., Test checking for non-existent shadcn config. (+1 more)

### Community 40 - "main"
Cohesion: 0.13
Nodes (8): main(), Add custom font families.          Args:             fonts: Dict of font_type: [, Add custom spacing values.          Args:             spacing: Dict of name: val, Add custom breakpoints.          Args:             breakpoints: Dict of name: wi, Add plugin requirements.          Args:             plugins: List of plugin name, Get plugin recommendations based on configuration.          Returns:, Validate configuration.          Returns:             Tuple of (valid, message), Add custom colors to theme.          Args:             colors: Dict of color_nam

### Community 41 - "_sync_all.py"
Cohesion: 0.29
Nodes (13): blend(), derive_row(), derive_ui_reasoning(), h2r(), is_dark(), lum(), on_color(), r2h() (+5 more)

### Community 42 - "card"
Cohesion: 0.18
Nodes (13): $type, $value, border, padding, radius, shadow, border, card (+5 more)

### Community 43 - ".add_components"
Cohesion: 0.22
Nodes (7): main(), Add all available shadcn/ui components.          Args:             overwrite: If, List installed components.          Returns:             Tuple of (success, mess, Check if shadcn is initialized in project.          Returns:             True if, Get list of already installed components.          Returns:             List of, Read shadcn version from project package.json; fall back to a pinned default., Add shadcn/ui components.          Args:             components: List of compone

### Community 44 - "ShadcnInstaller"
Cohesion: 0.17
Nodes (7): Handle shadcn/ui component installation., ShadcnInstaller, Test component addition with subprocess error., Test listing installed components when they exist., Test initialization with custom project root., Test checking for existing shadcn config., Test getting installed components without config.

### Community 45 - ".generate_config_string"
Cohesion: 0.20
Nodes (6): Generate configuration file content.          Returns:             Configuration, Generate TypeScript configuration., Generate JavaScript configuration., Format plugins array for config.          Validates each plugin name against a s, Add indentation to JSON string., Write configuration to file.          Returns:             Tuple of (success, me

### Community 46 - "primitive"
Cohesion: 0.18
Nodes (11): fast, normal, slow, $type, $value, $type, $value, primitive (+3 more)

### Community 47 - "test_tailwind_config_gen.py"
Cohesion: 0.20
Nodes (7): Tests for tailwind_config_gen.py, Reduce a generated TS/JS config to a bare assignable object so it can be     han, Regression guard for the missing-comma bug between the ``theme`` block and     `, The property preceding ``plugins`` must end with a comma (pure-Python         ch, The emitted config parses as valid JS via ``node --check``., _strip_to_object(), TestGeneratedConfigIsValidJs

### Community 48 - "_search_csv"
Cohesion: 0.25
Nodes (10): detect_domain(), _load_csv(), Load CSV and return list of dicts, Core search function using BM25, Auto-detect the most relevant domain from query, Main search function with auto-domain detection, Search stack-specific guidelines, search() (+2 more)

### Community 49 - "generate.py"
Cohesion: 0.29
Nodes (9): enhance_prompt(), generate_batch(), generate_logo(), load_env(), main(), Enhance the logo prompt with style and industry modifiers, Generate a logo using Gemini models with image generation      Args:         asp, Generate multiple logo variants with different styles (+1 more)

### Community 50 - "button"
Cohesion: 0.20
Nodes (10): fg, font-size, hover-bg, button, $type, $value, $type, $value (+2 more)

### Community 51 - "._base_config"
Cohesion: 0.22
Nodes (6): Path, Initialize generator.          Args:             typescript: If True, generate ., Determine default output path., Create base configuration structure., Get default content paths for framework., Any

### Community 52 - "_run"
Cohesion: 0.28
Nodes (8): Path, Regression tests for validate-tokens.cjs.  The validator used to skip any line c, A hardcoded hex on the same line as a var() token is still a violation., A line that references only tokens produces no false positives., _run(), test_flags_hardcoded_hex_sharing_line_with_token(), test_token_only_line_reports_no_violation(), CompletedProcess

### Community 53 - "BM25"
Cohesion: 0.28
Nodes (5): BM25, BM25 ranking algorithm for text search, Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query

### Community 54 - "input"
Cohesion: 0.29
Nodes (8): padding-y, input, $type, $value, focus-ring, padding-y, $type, $value

### Community 55 - "semantic"
Cohesion: 0.25
Nodes (8): $type, $value, $type, $value, semantic, spacing, component, section

### Community 56 - "radius"
Cohesion: 0.29
Nodes (8): $type, $value, $type, $value, radius, default, full, default

### Community 57 - "shadow"
Cohesion: 0.47
Nodes (6): sm, shadow, sm, sm, $type, $value

### Community 58 - "_generate_intelligent_overrides"
Cohesion: 0.33
Nodes (6): _detect_page_type(), format_page_override_md(), _generate_intelligent_overrides(), Format a page-specific override file with intelligent AI-generated content., Generate intelligent overrides based on page type using layered search., Detect page type from context and search results.

### Community 59 - "design-tokens-starter.json"
Cohesion: 0.40
Nodes (4): component, dark, semantic, $schema

### Community 60 - "$type"
Cohesion: 0.60
Nodes (5): $type, $value, bg, bg, bg

### Community 61 - "lg"
Cohesion: 0.60
Nodes (5): lg, $type, $value, lg, lg

### Community 62 - "padding-x"
Cohesion: 0.67
Nodes (4): padding-x, padding-x, $type, $value

### Community 63 - "radius"
Cohesion: 0.67
Nodes (4): radius, radius, $type, $value

### Community 64 - "xl"
Cohesion: 0.67
Nodes (4): xl, xl, $type, $value

### Community 65 - "md"
Cohesion: 0.67
Nodes (4): $type, $value, md, md

### Community 66 - "none"
Cohesion: 0.67
Nodes (4): $type, $value, none, none

## Knowledge Gaps
- **320 isolated node(s):** `$schema`, `$value`, `$type`, `$value`, `$type` (+315 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `primitive` connect `primitive` to `compilerOptions`, `fontSize`, `radius`, `shadow`, `design-tokens-starter.json`, `spacing`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `!.next` connect `package.json` to `tailwind`, `morphing-dialog.tsx`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `color` connect `compilerOptions` to `primitive`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 36 inferred relationships involving `TailwindConfigGenerator` (e.g. with `TestGeneratedConfigIsValidJs` and `.test_node_check_parses_generated_config()`) actually correct?**
  _`TailwindConfigGenerator` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 23 inferred relationships involving `ShadcnInstaller` (e.g. with `TestShadcnInstaller` and `.test_add_all_components_dry_run()`) actually correct?**
  _`ShadcnInstaller` has 23 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `$value`, `$type` to the rest of the system?**
  _320 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11384615384615385 - nodes in this community are weakly interconnected._