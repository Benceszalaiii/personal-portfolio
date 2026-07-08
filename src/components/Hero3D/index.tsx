"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Client-only: three.js has no business in the server bundle, and this keeps
// the hero text painting instantly while the scene streams in behind it.
const HeroScene = dynamic(() => import("./Scene"), { ssr: false });

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Hero3D — a faceted metal monolith turning in oxblood light, composited over
 * the plasma. Streams in client-side; a static gradient stands in while the
 * bundle loads or when WebGL is unavailable. Pauses (frameloop→demand) once
 * scrolled out of view.
 */
export default function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Fallback / underlay: a soft oxblood core glow, always present */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 48%, oklch(0.42 0.14 28 / 0.55), transparent 70%)",
        }}
      />
      {mounted && <HeroScene reduced={reduced} active={active} />}
    </div>
  );
}
