import { cn } from "@/lib/utils";
import BubbleMenu from "./BubbleMenu";

export default function Navbar() {
  return (
    <>
      <BubbleMenu
      useFixedPosition
        logo={<span className="font-mono font-bold">Bence Szalai</span>}
        items={[
          {
            label: "Start",
            href: "#home",
            rotation: 8,
            hoverStyles: {bgColor: "#333", textColor: "#fff"}
          },
          {
            label: "Funkciók",
            href: "#features",
            rotation: -8,
            hoverStyles: {bgColor: "#333", textColor: "#fff"}
          },
          {
            label: "Rólam",
            href: "#about",
            rotation: 4,
            hoverStyles: {bgColor: "#333", textColor: "#fff"}
          },
        ]}
      />
    </>
  );
}
