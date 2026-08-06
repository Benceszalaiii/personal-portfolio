import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies/types";

/*
  The case-study card. Shared by the homepage "Munkáim" section and the
  /esettanulmany index so the two can never drift apart — a study looks the
  same wherever it is listed.
*/

export function CaseStudyCard({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/esettanulmany/${study.slug}`}
      className="focus-ember group grid overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-ember/50 md:grid-cols-[1.1fr_1fr]"
    >
      {/* Copy first in the DOM; the image sits second on desktop, first on
          mobile, so a small screen leads with the visual. */}
      <div className="order-2 flex flex-col justify-center p-8 md:order-1 md:p-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ember">
          {study.kind} · {study.year}
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium text-foreground md:text-3xl">
          {study.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {study.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-foreground/60"
            >
              {tech}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-ember">
          Esettanulmány
          <span aria-hidden>→</span>
        </span>
      </div>

      <div className="order-1 overflow-hidden border-b border-border md:order-2 md:border-b-0 md:border-l">
        <Image
          src={study.cover.src}
          alt={study.cover.alt}
          width={study.cover.width}
          height={study.cover.height}
          sizes="(max-width: 768px) 100vw, 32rem"
          priority={priority}
          className="h-full w-full object-cover object-left-top"
        />
      </div>
    </Link>
  );
}
