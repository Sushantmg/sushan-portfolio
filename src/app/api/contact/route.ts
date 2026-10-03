import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = { name?: string; message?: string; company?: string };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_NAME = 80;
const MAX_MESSAGE = 600;

const buckets = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_PER_WINDOW;
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "local";
}

export async function POST(req: Request) {
  const body: Payload = await req.json().catch(() => ({}));

  const name = (body.name ?? "").toString().trim().slice(0, MAX_NAME);
  const message = (body.message ?? "").toString().trim().slice(0, MAX_MESSAGE);
  const honeypot = (body.company ?? "").toString().trim();

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (message.length < 5) {
    return NextResponse.json({ ok: false, error: "too_short" }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "too_many" },
      { status: 429 },
    );
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
      subject: `portfolio contact · ${name || "anonymous"}`,
      text: `From: ${name || "anonymous"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
