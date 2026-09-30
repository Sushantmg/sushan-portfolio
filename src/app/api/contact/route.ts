import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = { name?: string; message?: string };

export async function POST(req: Request) {
  const body: Payload = await req.json().catch(() => ({}));

  const name = (body.name ?? "").toString().trim().slice(0, 80);
  const message = (body.message ?? "").toString().trim().slice(0, 600);

  if (!message) {
    return NextResponse.json({ ok: false, error: "empty_message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "mail_not_configured" },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO ?? "sushantmg2004@gmail.com";
  const from = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: to,
      subject: `portfolio contact · ${name || "anonymous"}`,
      text: `From: ${name || "anonymous"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}