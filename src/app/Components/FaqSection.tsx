"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/*
  GYIK. Controlled single-open accordion — the height/opacity reveal runs on
  framer-motion and collapses to an instant toggle under prefers-reduced-motion.
  Each row is a real <button> (aria-expanded + aria-controls) over a labelled
  region, so it's keyboard- and screen-reader-navigable. Answers pre-empt the
  objections a Hungarian SMB has before it reaches out.
*/

/*
  `link` is optional and exists for exactly one row today.

  "Mennyibe kerül egy weboldal?" is the highest-intent question on the page, and
  it used to answer with "kérj ajánlatot" — routing the one visitor who wants a
  number into a form, past a calculator that would have given them the number
  immediately. The answer now names the calculator and the row carries a real
  link to it.
*/
const faqs: {
  q: string;
  a: string;
  link?: { href: string; label: string };
}[] = [
  {
    q: "Mennyibe kerül egy weboldal?",
    a: "Az ár a projekt terjedelmétől függ — egy bemutatkozó oldal más kategória, mint egy webshop. Az árlistát viszont nem kell kitalálnod: minden tétel fix áron szerepel a kalkulátorban, így pár kattintásból megkapod a nagyságrendet. A tételes ajánlatot ezután állítom össze — ingyenes, és nem kötelez semmire.",
    link: { href: "/kalkulator", label: "Számold ki az árad" },
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
      // The lg sidebar gutter comes from <main> in page.tsx.
      className="relative z-20 w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left: intro (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/*
            "kérdések" costs ~6.7x the font-size, and text-5xl put it flush
            against its own column at 1024px — with the rail gutter reserved it
            would have tipped over. The 2.5rem ceiling holds it inside the
            292px column there, and it only reaches full size at ~1290px.
          */}
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.1vw,2.5rem)] font-medium leading-[1.1] text-foreground [hyphens:auto]">
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
                      {/* pb-6 moved to the wrapper so the link sits inside the
                          answer's padding rather than under it. */}
                      <div className="pb-6">
                        <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                        {item.link ? (
                          <Link
                            href={item.link.href}
                            className="focus-ember group/link mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-ember underline decoration-ember/40 underline-offset-4 transition-colors hover:text-foreground"
                          >
                            {item.link.label}
                            <span
                              aria-hidden
                              className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover/link:translate-x-1"
                            >
                              →
                            </span>
                          </Link>
                        ) : null}
                      </div>
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
