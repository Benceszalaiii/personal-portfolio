"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useThemeColors } from "@/lib/theme-color";

// three.js stays out of the initial bundle; the effect is decorative
const LaserFlow = dynamic(() => import("@/components/LaserFlow"), {
  ssr: false,
});

/*
  Laser beam dropping onto the footer's top border. The beam's horizontal
  flare line is pushed to the bottom of this container (verticalBeamOffset),
  so it lands exactly where the footer's .border-gradient-t hairline runs —
  the laser reads as the thing drawing that border.

  - color resolves from --ember (itself derived from --primary), via the same
    useThemeColors bridge the hero plasma uses — tweakcn changes re-render
    and update the shader uniform live.
  - the canvas paints on black; mix-blend-screen composites it onto the
    charcoal page so only the light shows.
  - reduced-motion / mobile get nothing: the static gradient hairline on the
    footer is the fallback border.
*/
export default function FooterLaser() {
  const [motionOK, setMotionOK] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setMotionOK(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const colors = useThemeColors({
    beam: { css: "var(--ember)", fallback: "#e0623a" },
  });

  if (!motionOK) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 hidden h-72 w-full overflow-hidden md:block"
    >
      <LaserFlow
        className="mix-blend-screen"
        color={colors.beam}
        // +0.17 of the width from center ≈ the beam stands at 2/3 of the screen
        horizontalBeamOffset={0.17}
        verticalBeamOffset={-0.46}
        fogIntensity={0.35}
        wispIntensity={3.5}
        mouseTiltStrength={0.008}
      />
    </div>
  );
}
