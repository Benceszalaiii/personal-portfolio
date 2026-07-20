"use client";

import { motion } from "framer-motion";
import {
  FilePen,
  Gauge,
  Globe,
  LifeBuoy,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";

type Service = {
  icon: typeof Globe;
  title: string;
  description: string;
  features: string[];
  detail: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Egyedi weboldalak",
    description:
      "Nem sablon: a vállalkozásod céljaira szabott, gyors és reszponzív oldal — a tervezéstől a kész kódig.",
    features: [
      "Next.js & React",
      "Reszponzív minden eszközön",
      "SEO-barát alap",
    ],
    detail:
      "A bemutatkozó oldaltól a komplex webalkalmazásig mindent egyedileg építek. Nincs nehézkes sablon és felesleges bővítmény — csak tiszta, karbantartható kód, ami pontosan azt tudja, amire a vállalkozásodnak szüksége van.",
  },
  {
    icon: ShoppingBag,
    title: "Webshop & fizetés",
    description:
      "Online értékesítés magyar bankkártyás fizetéssel, készletkezeléssel és automatikus számlázással.",
    features: [
      "SimplePay / Barion / Stripe",
      "Készlet- és rendeléskezelés",
      "Automatikus számlák",
    ],
    detail:
      "Teljes értékű webáruház magyar fizetési szolgáltatókkal (SimplePay, Barion) vagy Stripe-pal. Készlet, rendelések, kuponok és automatikus számlázás — minden egy helyen, könnyen kezelhető felületen.",
  },
  {
    icon: Palette,
    title: "Arculat & UI/UX",
    description:
      "Letisztult, prémium megjelenés és átgondolt élmény, ami bizalmat épít és ügyfelet hoz.",
    features: [
      "Egyedi arculat",
      "Prototípus & wireframe",
      "Akadálymentes (WCAG)",
    ],
    detail:
      "Az első benyomás pár másodperc alatt eldől. Prémium, egyedi arculatot tervezek, amely megkülönböztet a versenytársaktól, és úgy vezeti a látogatót, hogy a végén nálad köt ki.",
  },
  {
    icon: FilePen,
    title: "Tartalomkezelés",
    description:
      "Szerkeszd magad az oldal tartalmát — szövegek, képek, blog percek alatt, fejlesztő nélkül.",
    features: [
      "Payload CMS",
      "Szerepkörök & jogosultságok",
      "Verziózott tartalom",
    ],
    detail:
      "Ne függj a fejlesztődtől minden apró módosításnál. Egy átlátható adminfelületen magad szerkeszted a szövegeket, képeket és a blogot — jogosultságokkal a csapatod számára is.",
  },
  {
    icon: Gauge,
    title: "Teljesítmény & SEO",
    description:
      "Villámgyors betöltés és keresőoptimalizálás, hogy előrébb kerülj a Google találatai közt.",
    features: ["Core Web Vitals", "Technikai SEO", "Képoptimalizálás"],
    detail:
      "A lassú oldal ügyfeleket veszít. A betöltést a Google Core Web Vitals mérőszámaira optimalizálom, és technikailag felkészítem az oldalt a keresőkre, hogy a látogatók valóban megtaláljanak.",
  },
  {
    icon: LifeBuoy,
    title: "Üzemeltetés & támogatás",
    description:
      "Hosting, biztonsági frissítések és folyamatos támogatás — az oldalad mindig elérhető és naprakész.",
    features: [
      "Hosting (Vercel)",
      "Monitoring & mentések",
      "Folyamatos karbantartás",
    ],
    detail:
      "A launch után sem maradsz magadra. Gondoskodom a megbízható hostingról, a biztonsági frissítésekről, a mentésekről és a folyamatos fejlesztésekről, hogy az oldalad hosszú távon is jól működjön.",
  },
];

export function ServicesGridBlock() {
  return (
    <section
      id="services"
      // lg:pl-44 clears the fixed section sidebar, matching StackSection
      className="relative z-20 w-full px-4 py-24 md:px-16 lg:pl-44"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Szolgáltatások
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
            Mindent egy kézből, a tervezéstől az üzemeltetésig.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Nem csak egy weboldalt kapsz, hanem egy partnert, aki végigkísér az
            ötlettől a folyamatos működésig.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (index % 3) * 0.08, duration: 0.5 }}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-ember/50">
                  {/* subtle ember wash on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ember/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-5 w-fit rounded-xl bg-ember/10 p-3 text-ember ring-1 ring-inset ring-ember/15">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 font-display text-xl font-medium text-foreground">
                      {service.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-xs text-muted-foreground"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-ember" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA — morphing dialog reveals the full service detail */}
                    <MorphingDialog>
                      <MorphingDialogTrigger className="mt-auto w-fit rounded-md focus-ember">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-ember">
                          Részletek
                          <span aria-hidden>→</span>
                        </span>
                      </MorphingDialogTrigger>

                      <MorphingDialogContainer>
                        <MorphingDialogContent className="border border-border bg-card">
                          <MorphingDialogClose />
                          <div className="mb-5 w-fit rounded-xl bg-ember/10 p-3 text-ember ring-1 ring-inset ring-ember/15">
                            <Icon className="h-7 w-7" />
                          </div>
                          <MorphingDialogTitle className="font-display text-2xl font-medium text-foreground">
                            {service.title}
                          </MorphingDialogTitle>
                          <MorphingDialogSubtitle className="mt-2 leading-relaxed">
                            {service.detail}
                          </MorphingDialogSubtitle>
                          <MorphingDialogDescription>
                            <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-ember">
                              Mit tartalmaz
                            </p>
                            <ul className="space-y-2.5">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-2.5 text-sm text-foreground"
                                >
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </MorphingDialogDescription>
                        </MorphingDialogContent>
                      </MorphingDialogContainer>
                    </MorphingDialog>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card/50 p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-xl font-medium text-foreground">
              Egyedi megoldásra van szükséged?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Mondd el, mire van szükséged — egy munkanapon belül válaszolok.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="#contact">Kérj ajánlatot</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
