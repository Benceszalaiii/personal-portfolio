import BubbleMenu from "./BubbleMenu";

/*
  All colors are theme tokens (or relative-color derivations of --primary with
  slight lightness/hue spread per bubble), so a tweakcn palette swap re-themes
  the menu. BubbleMenu applies these as CSS values, so var()/oklch() strings
  resolve in the browser.
*/
const hover = (l: string, c: string, h: string) => ({
  bgColor: `oklch(from var(--primary) ${l} ${c} ${h})`,
  textColor: "var(--primary-foreground)",
});

export default function Navbar() {
  return (
    <BubbleMenu
      useFixedPosition
      menuBg="var(--popover)"
      menuContentColor="var(--popover-foreground)"
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
          hoverStyles: hover("l", "c", "h"),
        },
        {
          label: "Szolgáltatások",
          href: "#features",
          rotation: -8,
          hoverStyles: hover("calc(l - 0.06)", "calc(c - 0.02)", "calc(h + 1)"),
        },
        {
          label: "Rólam",
          href: "#about",
          rotation: 4,
          hoverStyles: hover("calc(l + 0.06)", "calc(c + 0.01)", "calc(h + 5)"),
        },
        {
          label: "Projektek",
          href: "#projects",
          rotation: -6,
          hoverStyles: hover("calc(l - 0.02)", "calc(c - 0.01)", "calc(h - 1)"),
        },
        {
          label: "Kapcsolat",
          href: "#contact",
          rotation: 6,
          hoverStyles: hover("calc(l + 0.1)", "calc(c + 0.02)", "calc(h + 7)"),
        },
      ]}
    />
  );
}
