import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// High-contrast Didone for display headings — luxury/watchmaker register.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Szalai Bence — Full-stack webfejlesztő",
  // The first copy anyone reads is the search result, so it follows the same
  // rule as every other surface: named functions in real trades, not adjectives.
  description:
    "Foglalási naptár a fodrászatnak, készletkezelő a boltnak, szerkesztőfelület a blogodnak — weboldal, ami dolgozik is. Szalai Bence, full-stack webfejlesztő, Győr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} dark h-full antialiased`}
    >
      {/*
        The tweakcn live-preview script used to load here. It is a theme-EDITOR
        hook — it lets tweakcn.com push palettes into the running page — and it
        was shipping to every visitor, along with the blue :root/.dark blocks it
        had pasted at the end of globals.css. Those blocks came after the
        oxblood ones at equal specificity, so they won: the site rendered blue
        while every comment in globals.css, the WebGL rigs and PRODUCT.md
        described oxblood on charcoal. Both are gone. Re-add this tag
        temporarily if you want to edit the palette on tweakcn again.
      */}
      <body className="min-h-full w-full font-sans selection:bg-primary/35 selection:text-foreground">
        <SiteNav />
        {children}
        {/* Route-aware: the calculator locks itself to one viewport on desktop
            and the footer stands down there. See components/SiteFooter. */}
        <SiteFooter />
      </body>
    </html>
  );
}
