@AGENTS.md

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Design Context

Full strategic context is in `PRODUCT.md` (read it before any UI work). Visual system is in `DESIGN.md` — **note: `DESIGN.md` is currently stale (describes a driving school, not this portfolio); rewrite it before trusting it.**

- **Register:** `brand` — a portfolio for Szalai Bence (full-stack dev). The site _is_ the work sample; its craft is the pitch.
- **Primary goal:** convert visiting **Hungarian businesses** into freelance clients. Copy is Hungarian.
- **Direction:** clean, professional, **premium/luxury** — dark-red-on-charcoal theme. Keep the plasma hero, add purposeful 3D, but avoid effect-soup.
- **Anti-references:** generic dev-portfolio template, cluttered/effect-soup, childish/amateur, cold corporate.
- **Accessibility:** WCAG 2.1 AA (contrast, keyboard, focus); motion is embraced but must degrade under `prefers-reduced-motion`.

Design principles (apply to every UI change):

1. **The site is the portfolio** — every pixel is a work sample; a rough edge here reads as a rough edge in client work.
2. **Restraint is the flex** — premium comes from control, not volume; let each effect breathe.
3. **Luxury through cohesion** — one committed identity applied consistently; no grab-bag of accents/fonts.
4. **Earn the contact** — guide the visitor from "who is this" → "look what he made" → "here's how to reach him."
5. **Show, don't tell** — prove skill by demonstrating it, not by listing adjectives.
