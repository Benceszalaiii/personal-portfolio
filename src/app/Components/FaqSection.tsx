"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

/*
  GYIK. Controlled single-open accordion — the height/opacity reveal runs on
  framer-motion and collapses to an instant toggle under prefers-reduced-motion.
  Each row is a real <button> (aria-expanded + aria-controls) over a labelled
  region, so it's keyboard- and screen-reader-navigable. Answers pre-empt the
  objections a Hungarian SMB has before it reaches out.
*/

const faqs = [
  {
    q: "Mennyibe kerül egy weboldal?",
    a: "Az ár a projekt terjedelmétől függ — egy bemutatkozó oldal más kategória, mint egy webshop. Miután megismertem az igényeidet, fix, tételes árajánlatot adok, meglepetések nélkül. Az ajánlatkérés ingyenes és nem kötelez semmire.",
  },
  {
    q: "Mennyi idő alatt készül el?",
    a: "Egy landing oldal jellemzően 1–2 hét, egy teljes céges oldal 3–5 hét, egy webshop ennél valamivel több. A pontos ütemtervet az ajánlatban rögzítjük, és végig látod, hol tartunk.",
  },
  {
    q: "Kell hozzá bármilyen technikai tudás?",
    a: "Nem. A dizájntól a kódon át az élesítésig mindenről én gondoskodom. Az elkészült oldal tartalmát pedig egy egyszerű, magyar nyelvű felületen magad is szerkesztheted — ha szeretnéd.",
  },
  {
    q: "Az enyém lesz az oldal?",
    a: "Igen, teljes mértékben. A kész oldal, a forráskód és a domain a tiéd — nem kötlek magamhoz, az oldal bármikor továbbvihető.",
  },
  {
    q: "Vannak havi költségek?",
    a: "A működéshez tartozik egy minimális tárhely- és domainköltség (jellemzően pár ezer forint havonta). A folyamatos karbantartás és továbbfejlesztés opcionális — csak akkor fizetsz érte, ha kéred.",
  },
  {
    q: "Mi van, ha már van weboldalam?",
    a: "Szívesen megújítom vagy újraépítem a meglévő oldaladat — gyorsabb, modernebb és könnyebben kezelhető lesz, a meglévő tartalmaid átköltöztetésével.",
  },
  {
    q: "Hogyan zajlik a fizetés és a szerződés?",
    a: "Átlátható feltételekkel, írásos szerződéssel és számlával dolgozom. A díj jellemzően két részletben esedékes: egy előleg az induláskor, a fennmaradó rész az élesítéskor.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      // lg:pl-44 clears the fixed section sidebar, matching the other sections
      className="relative z-20 w-full px-4 py-24 md:px-16 md:py-32 lg:pl-44"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left: intro (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            GYIK
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
            Gyakori kérdések
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">
            Összeszedtem a leggyakoribb kérdéseket. Ha valami kimaradt, kérdezz
            bátran — egy munkanapon belül válaszolok.
          </p>
          <a
            href="#contact"
            className="focus-ember mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:text-ember"
          >
            Van egy konkrét kérdésem
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Right: accordion */}
        <ul className="divide-y divide-border border-t border-b border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="focus-ember group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-lg transition-colors duration-200 md:text-xl ${
                        isOpen
                          ? "text-ember"
                          : "text-foreground group-hover:text-ember"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-ember/50 text-ember"
                          : "border-border text-muted-foreground group-hover:border-ember/50 group-hover:text-ember"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={panelId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
