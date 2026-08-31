"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterLaser from "@/app/Components/FooterLaser";
import { cn } from "@/lib/utils";

/**
 * The site footer, with one route-aware exception.
 *
 * /kalkulator locks itself to exactly one viewport on desktop, and a footer
 * below it would put the document a footer's height past 100dvh — which is
 * still a scrollbar, on the one page whose whole layout argument is that there
 * is nothing to scroll.
 *
 * It is hidden on that route at `lg` only. Below `lg` the calculator releases
 * its lock and scrolls like any other page, so the footer belongs there and
 * stays. Nothing is lost on desktop: the calculator carries its own CTA, which
 * is the only thing the footer offers that page.
 *
 * This used to be inlined in app/layout.tsx. It had to become a component
 * because knowing the route means reading usePathname, and layout.tsx is a
 * server component that should stay one.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  const locked = pathname === "/kalkulator";

  if (locked) {
    // The laser beam is a full-bleed WebGL layer; there is no point mounting a
    // canvas only to hide the footer it introduces.
    return (
      <footer className="relative w-full border-gradient-t bg-background lg:hidden">
        <FooterRow />
      </footer>
    );
  }

  return (
    <>
      <FooterLaser />
      <footer className={cn("relative w-full border-gradient-t bg-background")}>
        <FooterRow />
      </footer>
    </>
  );
}

function FooterRow() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
      <p className="font-display text-lg tracking-tight text-foreground">
        Szalai Bence
      </p>
      <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        <Link
          href="https://github.com/benceszalaiii"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-ember"
        >
          GitHub
        </Link>
        {/* The calculator is the only page that answers "mennyibe kerül"
            without an e-mail exchange, so it gets a permanent exit from every
            page rather than living only inside the services section. */}
        <Link href="/kalkulator" className="transition-colors hover:text-ember">
          Árkalkulátor
        </Link>
        <Link href="/#contact" className="transition-colors hover:text-ember">
          Kapcsolat
        </Link>
      </nav>
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Szalai Bence
      </p>
    </div>
  );
}
