import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/navbar";

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
  title: "Bence Szalai — Full-stack webfejlesztő",
  description:
    "Egyedi, prémium weboldalak vállalkozásoknak. Szalai Bence full-stack webfejlesztő portfóliója.",
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
      <head>
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
      </head>
      <body className="min-h-full w-full font-sans selection:bg-primary/35 selection:text-foreground">
        <Navbar />
        {children}
        <footer className="relative border-gradient-t w-full bg-background">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
            <p className="font-display text-lg tracking-tight text-foreground">
              Bence Szalai
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
              <a
                href="#contact"
                className="transition-colors hover:text-ember"
              >
                Kapcsolat
              </a>
            </nav>
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bence Szalai
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
