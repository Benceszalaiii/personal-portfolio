import { NextResponse } from "next/server";
import { Resend } from "resend";

/*
  Contact form handler. Uses Resend (RESEND_KEY in .env).
  - `from` uses Resend's shared onboarding sender, which delivers to the
    account owner's own address without a verified domain. Set CONTACT_FROM to
    a "Name <you@yourdomain>" once a domain is verified for nicer deliverability.
  - `to` is the owner inbox (CONTACT_TO_EMAIL); `replyTo` is the visitor so you
    can reply straight from your inbox.
*/

// instantiated lazily so a missing RESEND_KEY doesn't crash the build
let resend: Resend | undefined;
const TO = process.env.CONTACT_TO_EMAIL ?? "szbence2007@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "Portfólió kapcsolat <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  if (!process.env.RESEND_KEY) {
    return NextResponse.json(
      { error: "A szerver nincs konfigurálva az e-mail küldéshez." },
      { status: 500 },
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Hibás kérés." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Kérlek töltsd ki az összes mezőt." },
      { status: 400 },
    );
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "A megadott adatok túl hosszúak." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Érvénytelen e-mail cím." },
      { status: 400 },
    );
  }

  try {
    resend ??= new Resend(process.env.RESEND_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO, "bence.szalai@icloud.com"],
      replyTo: email,
      subject: `Új üzenet a portfólióról — ${name}`,
      text: `Név: ${name}\nE-mail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nem sikerült elküldeni az üzenetet. Próbáld újra később." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Váratlan hiba történt. Próbáld újra később." },
      { status: 500 },
    );
  }
}
