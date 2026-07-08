import BubbleMenu from "./BubbleMenu";

export default function Navbar() {
  return (
    <BubbleMenu
      useFixedPosition
      menuBg="oklch(0.2 0.012 25)"
      menuContentColor="oklch(0.95 0.006 60)"
      logo={
        <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
          Bence Szalai
        </span>
      }
      items={[
        {
          label: "Kezdőlap",
          href: "#home",
          rotation: 8,
          hoverStyles: { bgColor: "oklch(0.52 0.17 25)", textColor: "#fff" },
        },
        {
          label: "Szolgáltatások",
          href: "#features",
          rotation: -8,
          hoverStyles: { bgColor: "oklch(0.46 0.15 26)", textColor: "#fff" },
        },
        {
          label: "Rólam",
          href: "#about",
          rotation: 4,
          hoverStyles: { bgColor: "oklch(0.58 0.18 30)", textColor: "#fff" },
        },
        {
          label: "Projektek",
          href: "#projects",
          rotation: -6,
          hoverStyles: { bgColor: "oklch(0.5 0.16 24)", textColor: "#fff" },
        },
        {
          label: "Kapcsolat",
          href: "#contact",
          rotation: 6,
          hoverStyles: { bgColor: "oklch(0.62 0.19 32)", textColor: "#fff" },
        },
      ]}
    />
  );
}
