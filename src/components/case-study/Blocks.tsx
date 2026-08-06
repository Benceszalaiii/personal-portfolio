import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { Block } from "@/content/case-studies/types";
import { Inline } from "./Inline";

/*
  Renders one content block. The reading column is set by the parent (max-w-2xl);
  only `figure` with `bleed` and the wide block kinds break out of it, which is
  what gives the page its long-form rhythm — narrow prose, occasional full-width
  evidence.
*/

/** Widths the reading column and its breakouts share. */
const COLUMN = "mx-auto w-full max-w-2xl";
const WIDE = "mx-auto w-full max-w-5xl";

export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <Reveal className={`${COLUMN} space-y-6`}>
          {block.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-lg leading-[1.75] text-muted-foreground"
            >
              <Inline text={paragraph} />
            </p>
          ))}
        </Reveal>
      );

    case "figure":
      return (
        <Reveal className={block.bleed ? WIDE : COLUMN}>
          <figure>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes={
                  block.bleed
                    ? "(max-width: 1024px) 100vw, 64rem"
                    : "(max-width: 768px) 100vw, 42rem"
                }
                className="h-auto w-full"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                <Inline text={block.caption} />
              </figcaption>
            )}
          </figure>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal className={COLUMN}>
          <blockquote className="border-l-2 border-ember pl-6">
            <p className="font-display text-2xl font-medium leading-[1.35] text-foreground md:text-3xl">
              <Inline text={block.text} />
            </p>
            {block.source && (
              <footer className="mt-3 font-mono text-xs text-muted-foreground">
                {block.source}
              </footer>
            )}
          </blockquote>
        </Reveal>
      );

    case "code":
      return (
        <Reveal className={WIDE}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {block.label && (
              <p className="border-b border-border px-5 py-2.5 font-mono text-xs text-muted-foreground">
                {block.label}
              </p>
            )}
            {/* The pre scrolls on its own so a long line never widens the page */}
            <pre className="overflow-x-auto px-5 py-4">
              <code className="font-mono text-[0.8rem] leading-relaxed text-muted-foreground">
                {block.lines.join("\n")}
              </code>
            </pre>
          </div>
        </Reveal>
      );

    case "stats":
      return (
        <Reveal className={WIDE}>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.label} className="bg-card px-6 py-7">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-medium text-ember">
                    {item.value}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "points":
      return (
        <div className={`${WIDE} grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2`}>
          {block.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.06}>
              <article className="h-full bg-card p-7">
                <h3 className="font-display text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  <Inline text={item.body} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      );

    case "problem":
      return (
        <Reveal className={COLUMN}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            <div className="bg-card p-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                A probléma
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <Inline text={block.problem} />
              </p>
            </div>
            <div className="bg-card p-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ember">
                A megoldás
              </p>
              <p className="mt-3 leading-relaxed text-foreground">
                <Inline text={block.solution} />
              </p>
            </div>
          </div>
        </Reveal>
      );
  }
}
