"use server";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Copy, Key, Mail } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Solita Café — Ügyfélprojekt",
    description:
      "Egy dunai kávézó és közösségi eseményhelyszín teljes, saját kezűleg szerkeszthető, négynyelvű weboldala. Az ajánlat és a funkciók áttekintése, élő előnézettel.",
  };
}

const PREVIEW_URL = "https://solita.benceszalai.hu";

type Feature = {
  kicker: string;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    kicker: "Nemzetköziség",
    title: "Négy nyelv, egy oldal",
    desc: "A teljes oldal magyarul, angolul, németül és szlovákul is elérhető — a Szigetköz határ menti vendégforgalmára szabva, azonnali nyelvváltással.",
  },
  {
    kicker: "Étlap",
    title: "Digitális étlap, saját kézben",
    desc: "Kávék, italok és ételek kategóriákba rendezve, árakkal. A tulajdonos fejlesztő nélkül, percek alatt frissíti a kínálatot a tartalomkezelőből.",
  },
  {
    kicker: "Programok",
    title: "Események idővonalon",
    desc: "Közelgő és múltbeli programok rács- és idővonalnézetben, színes esemény-címkékkel — az akusztikus koncertektől a borvacsorákig.",
  },
  {
    kicker: "Valós idő",
    title: "Élő nyitvatartás",
    desc: "Az oldal valós időben jelzi, hogy a kávézó éppen nyitva van-e, és mennyi idő múlva nyit vagy zár legközelebb.",
  },
  {
    kicker: "Élmény",
    title: "Videós fogadtatás",
    desc: "Külön asztali és mobil háttérvideó idézi meg a hangulatot, finom lejátszás-vezérléssel és mozgáscsökkentett alternatívával.",
  },
  {
    kicker: "Közösség",
    title: "Kapcsolat és hírlevél",
    desc: "Kapcsolatfelvételi űrlap és hírlevél-feliratkozás duplikáció-szűréssel, hogy a törzsvendégek elsőként értesüljenek az újdonságokról.",
  },
  {
    kicker: "Tartalomkezelés",
    title: "Payload CMS admin",
    desc: "Étlap, események, galéria és nyitvatartás — mind egy letisztult, magyar nyelvű admin felületről szerkeszthető, kódolás nélkül.",
  },
  {
    kicker: "Megfelelőség",
    title: "GDPR-kész adatvédelem",
    desc: "Teljes, magyar nyelvű adatvédelmi nyilatkozat és átlátható sütikezelés a hatályos európai szabályozás szerint.",
  },
  {
    kicker: "TÁMOGATÁS",
    title: "TikTok integráció",
    desc: "Legújabb TikTok tartalmak megjelenítése könnyedén, a link beillesztésével.",
  },
];

const stack = [
  "Next.js",
  "Payload CMS",
  "next-intl",
  "TypeScript",
  "Postgres",
  "Vercel",
];

const brandSwatches = [
  { name: "Homok", hex: "#F5EFE6" },
  { name: "Tinta", hex: "#2C2416" },
  { name: "Petrol", hex: "#3D8A7A" },
  { name: "Terrakotta", hex: "#C4724A" },
  { name: "Arany", hex: "#D4A853" },
];

export default async function SolitaCafePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const key = (await searchParams).key;
  let hasKey;
  if (key) {
    hasKey = key === "ecfd398b-fdf0-45df-8e13-925aef5e8b2c";
  } else {
    hasKey = false;
  }
  return (
    <main className="w-full">
      {/* Intro */}
      <section className="relative w-full px-4 pb-16 pt-32 md:px-16 md:pb-24 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 60% at 50% -10%, oklch(0.4 0.13 28 / 0.35), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-ember"
              >
                ← Portfólió
              </Link>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>SOLITA CAFÉ</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-foreground md:text-7xl">
              Solita Café
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Egy dunai kávézó és közösségi eseményhelyszín teljes weboldala
              Győrzámolyban — eseményekkel és saját kezűleg szerkeszthető
              tartalommal, négy nyelven.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={PREVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="focus-ember inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110"
              >
                Élő előnézet megnyitása
                <span aria-hidden>↗</span>
              </a>
              <a
                href={PREVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-ember"
              >
                solita.benceszalai.hu
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Az ajánlat */}
      <section className="relative w-full px-4 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Az ajánlat
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-4xl">
              Egy weboldal, ami a kávézóért dolgozik
            </h2>
          </Reveal>
          <Reveal
            delay={0.08}
            className="space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              A Solita Café számára egy teljes, saját kezűleg szerkeszthető
              weboldalt építek, amely nem csupán bemutatja a helyet: kezeli az
              asztalfoglalásokat, gyűjti a hírlevél-feliratkozókat, és négy
              nyelven szólítja meg a Szigetköz hazai és határon túli vendégeit.
            </p>
            <p>
              A tartalom végig a tulajdonos kezében marad — az étlap, az
              események és a galéria fejlesztő bevonása nélkül, néhány
              kattintással frissíthető. A cél egy olyan online jelenlét, amely
              ugyanolyan meleg és gondosan megkomponált, mint maga a kávézó a
              Duna partján.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Funkciók */}
      <section className="relative w-full px-4 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Funkciók
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
              Amit az oldal tud
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className="flex h-full flex-col bg-card p-7 transition-colors duration-300 hover:bg-secondary/30">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ember">
                    {f.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-medium text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Arculat + Stack */}
      <section className="relative w-full px-4 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Arculat
            </p>
            <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
              Egyedi design rendszer
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              A kávézó „napsütötte, természetes” hangulatára épített paletta és
              tipográfia — Cormorant Garamond és DM Sans párosítás, meleg homok
              alapon. Nem sablon: minden token a márkához igazítva.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {brandSwatches.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span
                    className="h-7 w-7 rounded-full border border-border"
                    style={{ backgroundColor: s.hex }}
                    aria-hidden
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Technológia
            </p>
            <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
              Modern, megbízható alapok
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Gyors, karbantartható és jövőálló stack — a tartalomkezeléstől a
              tárhelyig egy összehangolt rendszer.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          {hasKey && (
            <Reveal delay={0.08}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                TELJESKÖRŰ TESZTELÉS
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
                Próbáld ki az oldal hátterét is
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Ne csak a kinézet ragadjon meg, hanem a könnyen szerkeszthető
                háttér is!
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2">
                <li className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  <Mail className="inline size-4 mr-2" /><span className="select-all">demo@solitacafe.hu</span>
                </li>
                <li className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  <Key className="inline size-4 mr-2" />
                  <span className="select-all">solita123</span>
                </li>
              </ul>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                A kezelőfelületre való belépéshez keresd az oldalon lévő     <svg className="size-3.5 inline text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg> gombot, vagy a következő linket: <Link href={`${PREVIEW_URL}/admin`} target="_blank" rel="noreferrer" className="font-mono text-sm text-muted-foreground transition-colors hover:text-ember">{`${PREVIEW_URL}/admin`}</Link>
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Záró CTA */}
      <section className="relative w-full px-4 pb-28 pt-8 md:px-16">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 120% at 50% 0%, oklch(0.5 0.16 28 / 0.25), transparent 65%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
                Nézd meg élőben
              </h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                Az oldal jelenleg előnézeti domainen fut. Kattints, és fedezd
                fel a teljes élményt.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={PREVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ember inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110"
                >
                  solita.benceszalai.hu
                  <span aria-hidden>↗</span>
                </a>
                {!hasKey && (
                  <Link
                    href="/#contact"
                    className="focus-ember inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
                  >
                    Kérek ilyet én is
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
