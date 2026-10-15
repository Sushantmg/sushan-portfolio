import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  message?: string;
  email?: string;
  company?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 600;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

function sanitizeHeader(value: string, max: number) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export async function POST(req: Request) {
  const body: Payload = await req.json().catch(() => ({}));

  const rawName = (body.name ?? "").toString();
  const rawEmail = (body.email ?? "").toString();
  const rawMessage = (body.message ?? "").toString();
  if (rawName.trim().length > MAX_NAME || rawEmail.trim().length > MAX_EMAIL || rawMessage.trim().length > MAX_MESSAGE) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  const name = sanitizeHeader(rawName, MAX_NAME);
  const email = sanitizeHeader(rawEmail, MAX_EMAIL);
  const message = rawMessage.trim().slice(0, MAX_MESSAGE);
  const honeypot = (body.company ?? "").toString().trim();

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (message.length < 5) {
    return NextResponse.json({ ok: false, error: "too_short" }, { status: 400 });
  }

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "too_many" },
      { status: 429, headers: { "Retry-After": "600" } },
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
      ...(email ? { reply_to: email, replyTo: email } : {}),
      subject: `portfolio contact · ${name || "anonymous"}`,
      text: `${message}\n\n— ${name || "anonymous"}${email ? `\nreply to: ${email}` : ""}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
