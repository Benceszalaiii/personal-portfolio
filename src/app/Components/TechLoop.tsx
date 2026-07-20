"use client";

import {
  SiFramer,
  SiNextdotjs,
  SiPayloadcms,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

/*
  Marquee of the actual stack, sitting just above the contact CTA — proof of
  craft right before the ask. Icons render in a MUTED primary (brand-faint),
  brightening to ember only on hover, so the strip reads as a quiet texture,
  not a loud badge wall (restraint is the flex). Edges fade into the page
  background; LogoLoop honours prefers-reduced-motion internally (freezes).
*/

function Tech({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2.5 text-brand-faint transition-colors duration-300 group-hover/item:text-ember">
      <span className="text-[1.15em] leading-none">{icon}</span>
      <span className="font-mono text-[0.5em] uppercase tracking-[0.2em]">
        {label}
      </span>
    </span>
  );
}

const LOGOS: LogoItem[] = [
  {
    node: <Tech icon={<SiTypescript />} label="TypeScript" />,
    title: "TypeScript",
  },
  { node: <Tech icon={<SiNextdotjs />} label="Next.js" />, title: "Next.js" },
  { node: <Tech icon={<SiReact />} label="React" />, title: "React" },
  {
    node: <Tech icon={<SiPayloadcms />} label="Payload" />,
    title: "PayloadCMS",
  },
  {
    node: <Tech icon={<SiTailwindcss />} label="Tailwind" />,
    title: "TailwindCSS",
  },
  { node: <Tech icon={<SiFramer />} label="Motion" />, title: "Motion" },
  {
    node: <Tech icon={<SiShadcnui />} label="shadcn/ui" />,
    title: "shadcn/ui",
  },
  {
    node: <Tech icon={<SiPostgresql />} label="PostgreSQL" />,
    title: "PostgreSQL",
  },
  { node: <Tech icon={<SiVercel />} label="Vercel" />, title: "Vercel" },
];

export default function TechLoop() {
  return (
    <section
      aria-label="Használt technológiák"
      className="relative z-20 w-full overflow-hidden py-16 md:py-20"
    >
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Amivel dolgozom
      </p>
      <LogoLoop
        logos={LOGOS}
        speed={44}
        direction="left"
        logoHeight={34}
        gap={72}
        scaleOnHover
        pauseOnHover
        fadeOut
        fadeOutColor="var(--background)"
        ariaLabel="Használt technológiák"
      />
    </section>
  );
}
