import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const panel = {
  container:
    "h-full w-full rounded-2xl border border-border bg-card p-8 md:p-12 relative overflow-hidden",
  tag: "font-mono text-xs uppercase tracking-[0.2em] text-ember",
  title: "font-display text-2xl md:text-4xl font-medium mt-4 mb-5 text-foreground",
  content: "text-base md:text-lg leading-relaxed text-muted-foreground max-w-[60ch]",
};

const features = [
  {
    title: "Szerkeszthetőség",
    value: "szerkeszthetoseg",
    tag: "Rugalmasság",
    heading: "Szerkeszthetőség korlátok nélkül",
    body: "Korszerű technológiákkal és rugalmas megoldásokkal dolgozom, hogy a weboldalad pontosan azt tudja, amire szükséged van — ma és a jövőben is. Nem sablonokat használok, hanem egyedi megoldásokat építek, amelyek tökéletesen illeszkednek a céljaidhoz.",
  },
  {
    title: "Sebesség",
    value: "sebesseg",
    tag: "Teljesítmény",
    heading: "Villámgyors betöltés, tökéletes működés",
    body: "A modern webfejlesztésben a sebesség, a letisztult dizájn és a felhasználói élmény a legfontosabb. Ezekre fókuszálok, hogy olyan weboldalt hozzak létre, ami nemcsak jól néz ki, de villámgyorsan betöltődik és hibátlanul működik minden eszközön.",
  },
  {
    title: "Elegancia",
    value: "elegancia",
    tag: "Arculat",
    heading: "Prémium, elegáns megjelenés",
    body: "Tűnj ki a tömegből egyedi, letisztult dizájnnal és igényes megjelenéssel. Egyedi arculat, átgondolt animációk és intuitív felhasználói élmény — mindez egyetlen, összehangolt csomagban.",
  },
];

export default function StackSection() {
  return (
    <section
      id="features"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
          Amit kínálok
        </p>
        <h2 className="mt-4 max-w-[22ch] font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
          Ne elégedj meg egy unalmas, szerkeszthetetlen weboldallal.
        </h2>
      </div>

      <div className="mx-auto mt-16 h-[26rem] max-w-3xl md:h-[24rem]">
        <Tabs
          activeTabClassName="bg-secondary border border-border"
          tabClassName="text-sm md:text-base font-mono font-medium px-5 py-2 text-muted-foreground"
          contentClassName=""
          tabs={features.map((f) => ({
            title: f.title,
            value: f.value,
            content: (
              <div className={cn(panel.container)}>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, oklch(0.55 0.16 28 / 0.22), transparent)",
                  }}
                />
                <p className={cn(panel.tag)}>{f.tag}</p>
                <h3 className={cn(panel.title)}>{f.heading}</h3>
                <p className={cn(panel.content)}>{f.body}</p>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}
