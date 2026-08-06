import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockView } from "@/components/case-study/Blocks";
import Reveal from "@/components/motion/Reveal";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

/*
  The case-study renderer. Everything on this page comes from the study object —
  the route is a layout, not a document. Chapters carry `data-nav-section`, which
  is what SiteNav's scroll-spy reads, so a new study gets a working sidebar
  without touching the nav.
*/

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.title} — Esettanulmány`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Esettanulmány`,
      description: study.summary,
      images: [{ url: study.cover.src }],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <main className="w-full">
      {/* ------------------------------------------------------------ hero */}
      <section
        id="intro"
        data-nav-section="Bevezető"
        className="relative w-full px-4 pb-16 pt-32 md:px-16 md:pb-24 md:pt-40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 60% at 50% -10%, color-mix(in oklab, var(--hero-glow) 35%, transparent), transparent 70%)",
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
              <span>{study.kind}</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-foreground md:text-7xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {study.tagline}
            </p>

            {study.links && study.links.length > 0 && (
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      link.primary
                        ? "focus-ember inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110"
                        : "focus-ember inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
                    }
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={study.cover.src}
                alt={study.cover.alt}
                width={study.cover.width}
                height={study.cover.height}
                sizes="(max-width: 1024px) 100vw, 64rem"
                priority
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ tények rail */}
      <section className="relative w-full px-4 pb-8 md:px-16">
        <Reveal className="mx-auto max-w-5xl">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {study.facts.map((fact) => (
              <div key={fact.label} className="bg-card px-6 py-5">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-foreground">{fact.value}</dd>
              </div>
            ))}
            <div className="bg-card px-6 py-5">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                Szerepkör
              </dt>
              <dd className="mt-1.5 text-foreground">{study.role}</dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-muted px-3 py-1.5 font-mono text-xs text-foreground/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* --------------------------------------------------------- fejezetek */}
      {study.chapters.map((chapter) => (
        <section
          key={chapter.id}
          id={chapter.id}
          data-nav-section={chapter.nav}
          className="relative w-full px-4 py-16 md:px-16 md:py-24"
        >
          <Reveal className="mx-auto w-full max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              {chapter.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-4xl">
              {chapter.title}
            </h2>
            {chapter.lede && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground/90">
                {chapter.lede}
              </p>
            )}
          </Reveal>

          <div className="mt-12 space-y-12">
            {chapter.blocks.map((block, i) => (
              <BlockView
                // Blocks are a static authored list — index is a stable key.
                key={`${chapter.id}-${i}`}
                block={block}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ------------------------------------------------------------ zárás */}
      <section
        id="tanulsag"
        data-nav-section="Tanulság"
        className="relative w-full px-4 pb-28 pt-8 md:px-16"
      >
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 120% at 50% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 65%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                Tanulság
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-foreground md:text-4xl">
                Mit visz tovább egy megrendelői projektbe
              </h2>
              <div className="mt-6 space-y-5">
                {study.takeaway.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-lg leading-[1.75] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/#contact"
                  className="focus-ember inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110"
                >
                  Beszéljünk a projektedről
                </Link>
                <Link
                  href="/esettanulmany"
                  className="focus-ember inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-ember hover:text-ember"
                >
                  További esettanulmányok
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
