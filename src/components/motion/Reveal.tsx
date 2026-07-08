"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
  Scroll reveal that ENHANCES an already-visible default. SSR / no-JS renders
  fully visible; only once the client mounts do we hide-then-reveal on scroll.
  Honors prefers-reduced-motion (reveals instantly, no transform).
*/
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setEnhanced(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // Safety net: if the observer never fires (headless capture, no-scroll
    // render, tab never focused), reveal anyway so content can't ship blank.
    const fallback = window.setTimeout(() => setShown(true), 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const hidden = enhanced && !shown;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : "none",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </div>
  );
}
