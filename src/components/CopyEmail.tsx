"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy email address"
      title={copied ? "Copied!" : "Copy email"}
      className={`ml-3 inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[0.65rem] transition-all duration-200 ${
        copied
          ? "border-acid bg-acid text-carbon"
          : "border-line text-muted hover:border-acid hover:text-acid"
      }`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "copied" : "copy"}
    </button>
  );
}