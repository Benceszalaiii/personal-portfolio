import Link from "next/link";
import CurvedLoop from "@/components/CurvedLoop";
import Reveal from "@/components/motion/Reveal";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog";
import { cn } from "@/lib/utils";
import Hero from "./Components/Hero";
import StackSection from "./Components/StackSection";
import ContactSection from "./Components/ContactSection";

type Project = {
  title: string;
  description: string;
  href: string;
  action: string;
  image: string;
  imageClassName?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Inua Saunamanufaktur",
    description:
      "Egyedi szaunák tervezése és kivitelezése, Dániában, Németországban, Ausztriában és Magyarországon nyújtott szolgáltatásokkal. Fejlett struktúra, egyedi dizájn és animációk jellemzik. A cél az adminisztráció megkönnyítése, a cég bemutatása és az érdeklődők tájékoztatása. Az adminisztráció PayloadCMS-sel történik, a weboldal pedig Next.js-ben készült.",
    href: "https://inua.benceszalai.hu/",
    action: "Weboldal megnyitása",
    image: "/saunamanufaktur.png",
    tags: ["Next.js", "PayloadCMS", "TypeScript"],
  },
  {
    title: "További projektek hamarosan",
    description:
      "Az oldalra feltöltött adatok jelenleg hiányosak, a jövőben folyamatosan bővülni fognak. Addig is az összes projektemet megtekintheted a GitHub profilomon.",
    href: "https://github.com/benceszalaiii",
    action: "GitHub megnyitása",
    image: "/github.png",
    imageClassName: "invert",
    tags: ["GitHub"],
  },
];

export default function Home() {
  return (
    <main className="w-full">
      <Hero />

      <StackSection />

      <section id="loop" className="w-full overflow-hidden py-8">
        <CurvedLoop
          className="text-[oklch(0.4_0.09_27)]"
          curveAmount={150}
          marqueeText="TypeScript ✦ Next.js ✦ PayloadCMS ✦ TailwindCSS ✦ Motion ✦ shadcn/ui ✦ PostgreSQL ✦ Vercel ✦"
        />
      </section>

      {/* Rólam */}
      <section id="about" className="relative w-full px-4 py-24 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Rólam
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
              Szalai Bence
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Szia! 19 éves{" "}
                <span className="font-medium text-ember">
                  full-stack webfejlesztő
                </span>{" "}
                vagyok. 16 éves korom óta foglalkozom webfejlesztéssel, és azóta
                rengeteg mindent tanultam. Jelenleg a Győri SZC Jedlik Ányos
                Technikumba járok, ahol{" "}
                <span className="font-medium text-ember">szoftverfejlesztőnek</span>{" "}
                tanulok.
              </p>
              <p>
                Több vállalkozásnak és magánszemélynek is készítettem már
                weboldalt. A munkáim megtekinthetők a{" "}
                <Link
                  href="#projects"
                  className="font-medium text-foreground underline decoration-ember/50 underline-offset-4 transition-colors hover:text-ember"
                >
                  projektek
                </Link>{" "}
                szekcióban.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto w-full max-w-xs md:mx-0">
            <MorphingDialog>
              <MorphingDialogTrigger>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-2 transition-colors hover:border-ember/60">
                  <MorphingDialogImage
                    src="/picture.JPEG"
                    className="aspect-4/5 w-full rounded-xl"
                    alt="Szalai Bence portré"
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="max-w-md border border-border bg-card">
                  <MorphingDialogClose />
                  <MorphingDialogImage
                    src="/picture.JPEG"
                    className="w-full rounded-lg"
                    alt="Szalai Bence portré"
                  />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          </Reveal>
        </div>
      </section>

      {/* Projektek */}
      <section
        id="projects"
        className="relative w-full px-4 py-24 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              Munkáim
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
              Projektek
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {projects.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <MorphingDialog>
                  <MorphingDialogTrigger>
                    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-ember/60">
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                        <MorphingDialogImage
                          src={item.image}
                          className={cn(
                            "h-full w-full transition-transform duration-500 group-hover:scale-[1.03]",
                            item.imageClassName,
                          )}
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <MorphingDialogTitle className="font-display text-xl font-medium text-foreground">
                          {item.title}
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </MorphingDialogSubtitle>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </MorphingDialogTrigger>

                  <MorphingDialogContainer>
                    <MorphingDialogContent className="max-w-lg border border-border bg-card">
                      <MorphingDialogClose />
                      <div className="overflow-hidden rounded-lg bg-muted">
                        <MorphingDialogImage
                          src={item.image}
                          className={cn("w-full", item.imageClassName)}
                          alt={item.title}
                        />
                      </div>
                      <MorphingDialogTitle className="mt-5 font-display text-2xl font-medium text-foreground">
                        {item.title}
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {item.description}
                      </MorphingDialogSubtitle>
                      <MorphingDialogDescription className="mt-6">
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          className="focus-ember inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110"
                          href={item.href}
                        >
                          {item.action}
                          <span aria-hidden>→</span>
                        </Link>
                      </MorphingDialogDescription>
                    </MorphingDialogContent>
                  </MorphingDialogContainer>
                </MorphingDialog>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
