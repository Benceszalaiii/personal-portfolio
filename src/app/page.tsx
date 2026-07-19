import Link from "next/link";
import CurvedLoop from "@/components/CurvedLoop";
import Reveal from "@/components/motion/Reveal";
import ScrollScene from "@/components/ScrollScene";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import ContactSection from "./Components/ContactSection";
import Hero from "./Components/Hero";
import StackSection from "./Components/StackSection";

export default function Home() {
  return (
    // relative: hosts the absolutely-positioned ScrollScene canvas layer
    <main className="relative w-full">
      <Hero />

      <StackSection />

      {/* z-20: decorative marquee stays legible over the full-width 3D moment */}
      <section id="loop" className="relative z-20 w-full overflow-hidden py-8">
        <CurvedLoop
          className="text-brand-faint"
          curveAmount={150}
          marqueeText="TypeScript ✦ Next.js ✦ PayloadCMS ✦ TailwindCSS ✦ Motion ✦ shadcn/ui ✦ PostgreSQL ✦ Vercel ✦"
        />
      </section>

      {/* Rólam */}
      <section
        id="about"
        className="relative w-full px-4 py-24 md:px-16 md:py-32"
      >
        <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
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
                <span className="font-medium text-ember">
                  szoftverfejlesztőnek
                </span>{" "}
                tanulok.
              </p>
              <p>
                Több vállalkozásnak és magánszemélynek is készítettem már
                weboldalt. A referenciáim hamarosan itt is megtekinthetők
                lesznek — addig is megtalálod a munkáimat a{" "}
                <Link
                  href="https://github.com/benceszalaiii"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground underline decoration-ember/50 underline-offset-4 transition-colors hover:text-ember"
                >
                  GitHub profilomon
                </Link>
                .
              </p>
            </div>
          </Reveal>

          {/* stage-about: measured by ScrollScene — the monolith settles beside it */}
          <div id="stage-about" className="mx-auto w-full max-w-xs md:mx-0">
            <Reveal delay={0.08}>
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
        </div>
      </section>

      <ContactSection />

      {/* The single persistent 3D canvas: absolute within <main>, sticky
          viewport inside, z-10 — above section backdrops, below content. */}
      <ScrollScene />
    </main>
  );
}
