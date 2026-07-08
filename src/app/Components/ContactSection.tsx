"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const field =
  "w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ring/50";
const label = "font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Kérlek töltsd ki az összes mezőt.");
      setStatus("error");
      return;
    }
    if (!isEmail(email)) {
      setError("Adj meg egy érvényes e-mail címet.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? "Nem sikerült elküldeni. Próbáld újra később.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setError("Hálózati hiba. Ellenőrizd a kapcsolatot és próbáld újra.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full px-4 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: the pitch */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Kapcsolat
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl">
            Beszéljünk a projektedről.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Van egy ötleted, vagy megújítanád a jelenlegi weboldalad? Írj pár
            sort róla — jellemzően egy munkanapon belül válaszolok.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:szbence2007@gmail.com"
              className="font-mono text-sm text-foreground transition-colors hover:text-ember"
            >
              szbence2007@gmail.com
            </a>
            <Link
              href="https://github.com/benceszalaiii"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-ember"
            >
              github.com/benceszalaiii
            </Link>
          </div>
        </Reveal>

        {/* Right: the form */}
        <Reveal delay={0.08}>
          {status === "success" ? (
            <div
              role="status"
              className="flex h-full min-h-[20rem] flex-col items-start justify-center rounded-2xl border border-border bg-card p-8"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-2xl text-ember"
              >
                ✓
              </span>
              <h3 className="mt-5 font-display text-2xl text-foreground">
                Köszönöm az üzeneted!
              </h3>
              <p className="mt-2 text-muted-foreground">
                Megkaptam, és hamarosan jelentkezem a megadott e-mail címen.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="focus-ember mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ember hover:underline"
              >
                Új üzenet írása
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={label}>
                  Neved
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Kovács Anna"
                  className={field}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={label}>
                  E-mail címed
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={200}
                  placeholder="anna@vallalkozas.hu"
                  className={field}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={label}>
                  Üzenet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  placeholder="Mesélj a projektről, amin dolgozol…"
                  className={`${field} resize-y`}
                />
              </div>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status === "error" && error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="focus-ember inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Küldés…" : "Üzenet küldése"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
