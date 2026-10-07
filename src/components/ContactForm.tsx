"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/lib/data";

const MAX = 600;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const reset = () => {
    setStatus("idle");
    setError("");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || status === "sending") return;

    const trimmedEmail = email.trim();
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      setStatus("error");
      setError("that email doesn't look right — check it or leave it blank");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const form = e.currentTarget;
      const honeypot = new FormData(form).get("company")?.toString() ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: trimmedEmail,
          message,
          company: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as {
        ok: boolean;
        error?: string;
      };

      if (data.ok) {
        setStatus("sent");
        setMessage("");
        return;
      }

      if (data.error === "mail_not_configured" || data.error === "send_failed") {
        fallbackMailto();
        return;
      }

      setError(
        data.error === "too_many"
          ? "too many messages from this device — email me directly"
          : "give it a few more words, then send again",
      );
      setStatus("error");
    } catch {
      fallbackMailto();
    }
  };

  const fallbackMailto = () => {
    const subject = encodeURIComponent(`Hello from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "anonymous"}${email.trim() ? `\nreply to: ${email.trim()}` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("idle");
  };

  return (
    <form onSubmit={submit} className="border-b border-line p-5">
      <label htmlFor="cn-name" className="label text-muted">
        / from
      </label>
      <input
        id="cn-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="your name"
        maxLength={80}
        className="mt-2 w-full border-b border-line bg-transparent pb-2 font-mono text-sm text-ink caret-acid placeholder:text-muted/60 focus:border-acid focus:outline-none"
      />
      <span className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="cn-company">Company (leave blank)</label>
        <input
          id="cn-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </span>
      <label htmlFor="cn-email" className="label mt-4 block text-muted">
        / reply-to <span className="text-muted/50">(optional)</span>
      </label>
      <input
        id="cn-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") reset();
        }}
        placeholder="you@company.com"
        maxLength={120}
        autoComplete="email"
        className="mt-2 w-full border-b border-line bg-transparent pb-2 font-mono text-sm text-ink caret-acid placeholder:text-muted/60 focus:border-acid focus:outline-none"
      />
      <label htmlFor="cn-message" className="label mt-4 block text-muted">
        / message
      </label>
      <textarea
        id="cn-message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (status === "sent" || status === "error") reset();
        }}
        placeholder="195 — what are we building?"
        rows={3}
        maxLength={MAX}
        className="mt-2 w-full resize-none border-b border-line bg-transparent pb-2 font-mono text-sm text-ink caret-acid placeholder:text-muted/60 focus:border-acid focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[0.65rem] text-muted">
          {status === "sending"
            ? "sending…"
            : status === "sent"
              ? "✓ sent — replies within a day"
              : status === "error"
                ? error
                : `${message.length}/${MAX}`}
        </span>
        <button
          type="submit"
          disabled={!message.trim() || status === "sending"}
          className="inline-flex items-center gap-2 bg-acid px-4 py-2 text-xs font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          send <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}