import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bence Szalai",
  description: "Portfolio of Bence Szalai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full w-full font-mono selection:bg-purple-800 selection:border selection:border-purple-600 selection:text-white">
        <Navbar />
        {children}
        <footer className="w-full h-12 flex flex-row items-center justify-center gap-4 bg-[#222]">
          <p className="font-mono font-semibold text-sm text-neutral-400">Copyright © 2026 Bence Szalai</p>
        </footer>
        </body>
    </html>
  );
}
