import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tabs = {
  container: "px-12 pb-12 pt-6 rounded-md",
  title: "text-xl md:text-3xl font-mono font-bold mb-6",
  content: "text-sm md:text-md font-mono",
};

export default function StackSection() {
  return (
    <section id="features" className="w-full relative p-4 md:p-16 h-screen min-h-screen ">
      <h2 className={cn("text-2xl md:text-5xl mb-12 text-center w-full font-mono font-bold")}>
        Ne elégedj meg egy unalmas, szerkeszthetetlen weboldallal!
      </h2>
      <Tabs
      activeTabClassName="dark:bg-purple-800/60 dark:border dark:border-purple-500/75"
      tabClassName="text-lg font-mono font-semibold px-4 py-2"
        tabs={[
          {
            title: "Szerkeszthetőség",
            value: "szerkeszthetoseg",
            content: (
              <div className={cn(tabs.container, "bg-violet-600")}>
                <h2 className={cn(tabs.title)}>
                  Szerkeszthetőség korlátok nélkül
                </h2>
                <p className={cn(tabs.content)}>
                  Korszerű technológiákkal és rugalmas megoldásokkal dolgozom, hogy a weboldalad pontosan azt tudja, amire szükséged van, ma és a jövőben is. Nem sablonokat használok, hanem egyedi megoldásokat építek, amelyek tökéletesen illeszkednek a céljaidhoz.
                </p>
              </div>
            ),
          },
          {
            title: "Sebesség",
            value: "sebesseg",
            content: (
              <div className={cn(tabs.container, "bg-purple-600")}>
                <h2 className={cn(tabs.title)}>
                  Villámgyors weboldal, tökéletes működés
                </h2>
                <p className={cn(tabs.content)}>
                  A modern webfejlesztésben a sebesség, a letisztult dizájn és a
                  felhasználói élmény a legfontosabb. Én ezekre fókuszálok, hogy egy olyan
                  weboldalt hozzak létre, ami nem csak jól néz ki, de villámgyorsan
                  betöltődik és tökéletesen működik minden eszközön.
                </p>
              </div>
            ),
          },
          {
            title: "Elegancia",
            value: "elegancia",
            content: (
              <div className={cn(tabs.container, "bg-indigo-600")}>
                <h2 className={cn(tabs.title)}>
                  Modern, elegáns design
                </h2>
                <p className={cn(tabs.content)}>
                  Tűnj ki a tömegből egyedi, letisztult dizájnnal és modern megjelenéssel. Egyedi arculat, figyelemfelkeltő animációk és intuitív felhasználói élmény - mindez egyetlen csomagban.
                </p>
              </div>
            ),
          },
        ]}
      ></Tabs>
    </section>
  );
}
