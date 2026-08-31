"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineSidebar from "@/components/LineSidebar";

type SectionLink = { label: string; id: string };

// Per-page section maps — the sidebar always reflects the page it's on.
//
// ⚠ This list is a hand-maintained mirror of the section order in
// src/app/page.tsx. It does NOT derive from the page, so reordering sections
// there without editing here silently desyncs the nav (which is exactly how
// "Munkáim" kept showing second after it moved to the end).
const SECTIONS: Record<string, SectionLink[]> = {
  "/": [
    { label: "Kezdőlap", id: "home" },
    { label: "Szolgáltatások", id: "features" },
    { label: "Rólam", id: "about" },
    { label: "Munkáim", id: "munkaim" },
    { label: "Kapcsolat", id: "contact" },
  ],
  "/solita-cafe": [
    { label: "Bemutatkozás", id: "intro" },
    { label: "Az ajánlat", id: "ajanlat" },
    { label: "Funkciók", id: "funkciok" },
    { label: "Arculat", id: "arculat" },
    { label: "Élő előnézet", id: "elonezet" },
  ],
};

/**
 * Sections a page declares about itself: `id` + `data-nav-section="Label"` on
 * the section element. Used for routes whose sections aren't known up front
 * (case studies build theirs from content), so they get a sidebar without
 * being registered in SECTIONS above.
 */
function readDeclaredSections(): SectionLink[] {
  return [...document.querySelectorAll("[data-nav-section][id]")].map((el) => ({
    label: el.getAttribute("data-nav-section") ?? "",
    id: el.id,
  }));
}

export default function SiteNav() {
  const pathname = usePathname();
  const [sections, setSections] = useState<SectionLink[]>(
    () => SECTIONS[pathname] ?? [],
  );
  const [active, setActive] = useState(0);

  // Scroll-spy: a section becomes active while it crosses a thin band just
  // above the viewport's middle, so manual scrolling keeps the sidebar in sync.
  useEffect(() => {
    setActive(0);
    const found = SECTIONS[pathname] ?? readDeclaredSections();
    setSections(found);

    const els = found
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = els.indexOf(entry.target as HTMLElement);
          if (i !== -1) setActive(i);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  function scrollToSection(index: number) {
    const el = document.getElementById(sections[index]?.id ?? "");
    if (!el) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    el.scrollIntoView({ behavior: motionOK ? "smooth" : "auto" });
  }

  return (
    <>
      {/* Home button — every breakpoint, but only off the homepage (on "/" it
          would just link to the current page) */}
      {pathname !== "/" && (
        <Link
          href="/"
          aria-label="Vissza a kezdőlapra"
          className="focus-ember fixed left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-ember hover:text-ember"
          style={{ zIndex: "var(--z-nav)" }}
        >
          <Home className="size-5" aria-hidden />
        </Link>
      )}

      {/* Section sidebar — desktop only; key remounts it per route so the
          active state resets with the new section list */}
      {sections.length > 0 && (
        <aside
          // max-w-36 is a load-bearing constraint, not styling. This rail is
          // `position: fixed`, so nothing in the document flow pushes back on
          // it: page.tsx reserves a 12rem gutter for it, and the budget is
          // 192px − 16px (left-4) − 12px (LineSidebar's proximity shift) =
          // 164px. The rail measures ~115px with today's labels. Without a
          // cap, one longer Hungarian label ("Esettanulmányok",
          // "Ajánlatkérés") silently grows it back into the copy — which is
          // exactly the bug the gutter was introduced to fix. Labels
          // ellipsize instead.
          //
          // Capping the <aside> alone is not enough, and the failure is
          // silent: LineSidebar's <ul> is a flex ITEM of its row-flex <nav>,
          // so its `min-width: auto` resolves to min-content and it refuses to
          // shrink — the box reads 144px while the label spills to 231px,
          // straight back into the copy. Every link in the chain
          // (ul → button → span) needs min-width: 0 before the ellipsis can
          // engage.
          className="fixed left-4 top-1/3 hidden max-w-36 -translate-y-1/2 lg:block [&_ul]:min-w-0 [&_ul]:max-w-full [&_li]:min-w-0 [&_button]:min-w-0 [&_button]:max-w-full [&_button>span:last-child]:overflow-hidden [&_button>span:last-child]:text-ellipsis [&_button>span:last-child]:whitespace-nowrap"
          style={{ zIndex: "var(--z-rail)" }}
        >
          <LineSidebar
            key={pathname}
            items={sections.map((s) => s.label)}
            // 01 / 02 / 03 above every section is scaffolding, not
            // navigation — the labels already say where you are, and dropping
            // the numerals is what buys the width the ellipsis rule needs.
            showIndex={false}
            accentColor="var(--ember)"
            textColor="var(--muted-foreground)"
            markerColor="var(--border)"
            fontSize={0.8}
            markerLength={24}
            markerGap={8}
            maxShift={12}
            itemGap={12}
            proximityRadius={80}
            defaultActive={0}
            active={active}
            onItemClick={scrollToSection}
          />
        </aside>
      )}
    </>
  );
}
