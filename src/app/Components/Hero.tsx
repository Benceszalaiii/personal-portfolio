"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PlasmaWave from "@/components/PlasmaWave";
import { Signature } from "@/components/ui/signature";
import { useThemeColors } from "@/lib/theme-color";

// Staggered entrance that stays visible without JS: SSR renders shown; the
// client hides-then-reveals on mount so no-JS / crawlers still see the copy.
function useEntrance() {
  const [enhanced, setEnhanced] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setEnhanced(true);
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  const step = (i: number) => {
    const hidden = enhanced && !shown;
    return {
      opacity: hidden ? 0 : 1,
      transform: hidden ? "translateY(20px)" : "none",
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`,
    } as const;
  };
  return step;
}

export default function Hero() {
  const step = useEntrance();
  // theme-derived plasma palette (WebGL needs concrete hex, not var());
  // PlasmaWave re-reads its colors prop every frame, so this updates live
  const plasma = useThemeColors({
    deep: { css: "var(--plasma-deep)", fallback: "#5c0f16" },
    bright: { css: "var(--plasma-bright)", fallback: "#c0392b" },
  });

  return (
    <section
      id="home"
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* Layer 1: recolored oxblood plasma */}
      <div className="absolute inset-0">
        <PlasmaWave
          colors={[plasma.deep, plasma.bright]}
          speed1={0.065}
          speed2={0.1}
          focalLength={1.45}
          bend1={1.1}
          bend2={0.6}
          dir2={1}
          rotationDeg={30}
        />
      </div>

      {/* Layer 2: soft oxblood core glow under the monolith (the 3D canvas
          itself lives in the page-level ScrollScene layer, z-10) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 48%, color-mix(in oklab, var(--hero-glow) 55%, transparent), transparent 70%)",
        }}
      />

      {/* Legibility scrims — radial behind copy + bottom blend into page.
          z-[11]: above the traveling canvas so the hero keeps its vignette. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[11]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 62%, transparent 24%, color-mix(in oklab, var(--background) 55%, transparent) 62%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[11] h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      {/* Copy */}
      <div className="relative z-20 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p
          style={step(0)}
          className="font-mono text-xs uppercase tracking-[0.28em] text-ember sm:text-sm"
        >
          Full-stack webfejlesztő
        </p>
        {/* Visually the hand-drawn signature; the sr-only text keeps the
            page's h1 readable for crawlers and screen readers */}
        <h1 style={step(1)} className="mt-5">
          <span className="sr-only">Szalai Bence</span>
          <Signature
            text="Szalai Bence"
            color="var(--primary)"
            fontSize={72}
            delay={0.3}
            className="h-auto max-w-full"
          />
        </h1>
        <p
          style={step(2)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Prémium, egyedi weboldalak, amelyek a vállalkozásodért dolgoznak — a
          megjelenéstől a betöltési sebességig kézműves minőségben.
        </p>
        <div
          style={step(3)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="#contact"
            className="focus-ember inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110"
          >
            Beszéljünk a projektedről
          </Link>
          <Link
            href="#about"
            className="focus-ember inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
          >
            Ismerj meg közelebbről
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 z-20 flex justify-center"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
          Görgess
        </span>
      </div>
    </section>
  );
}
