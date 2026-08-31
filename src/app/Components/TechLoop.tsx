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
  not a loud badge wall (restraint is the flex). Edges fade via an alpha mask
  rather than a colour scrim — see the note on the wrapper below. LogoLoop
  honours prefers-reduced-motion internally (freezes).
*/

function Tech({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2.5 text-brand-faint transition-colors duration-300 group-hover/item:text-ember">
      <span className="text-[1.15em] leading-none">{icon}</span>
      <span className="text-sm font-semibold tracking-wide">{label}</span>
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
      // `pl-0!` opts this one section out of the lg rail gutter that <main>
      // gives every child. That gutter exists so the fixed rail never prints
      // through READING content — but this strip is decorative texture, and
      // stopping it 192px short of the left edge makes it read as a
      // misaligned box rather than as a band running under the page. The
      // heading is centred in the viewport, so it clears the rail anyway.
      className="relative z-20 w-full overflow-hidden py-16 md:py-20 lg:pl-0!"
    >
      <p className="mb-8 text-center text-sm font-semibold text-muted-foreground">
        Amivel dolgozom
      </p>
      {/*
        The edge fade is a MASK, not a coloured gradient.

        LogoLoop's own `fadeOut` paints a solid-colour gradient pointed at
        --background. The strip does not sit on a flat --background: the
        traveling monolith and the section backdrops pass behind it, so the
        "fade" was a pair of flat charcoal bars over a moving surface — the
        exact noise it was meant to prevent. An alpha mask fades the icons to
        transparent instead, so whatever is behind them at that scroll position
        shows through untouched. -webkit- prefix included: Safari still needs it.
      */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)",
        }}
      >
        <LogoLoop
          logos={LOGOS}
          speed={44}
          direction="left"
          logoHeight={34}
          gap={72}
          scaleOnHover
          pauseOnHover
          ariaLabel="Használt technológiák"
        />
      </div>
    </section>
  );
}
