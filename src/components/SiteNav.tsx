"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineSidebar from "@/components/LineSidebar";

type SectionLink = { label: string; id: string };

// Per-page section maps — the sidebar always reflects the page it's on.
const SECTIONS: Record<string, SectionLink[]> = {
  "/": [
    { label: "Kezdőlap", id: "home" },
    { label: "Munkáim", id: "munkaim" },
    { label: "Szolgáltatások", id: "features" },
    { label: "Rólam", id: "about" },
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
          className="focus-ember fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-ember hover:text-ember"
        >
          <Home className="size-5" aria-hidden />
        </Link>
      )}

      {/* Section sidebar — desktop only; key remounts it per route so the
          active state resets with the new section list */}
      {sections.length > 0 && (
        <aside className="fixed left-4 top-1/3 z-40 hidden -translate-y-1/2 lg:block">
          <LineSidebar
            key={pathname}
            items={sections.map((s) => s.label)}
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
