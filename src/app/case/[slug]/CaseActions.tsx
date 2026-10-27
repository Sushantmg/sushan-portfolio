"use client";

import { ExternalLink } from "lucide-react";
import { ShareActions } from "@/components/ShareActions";

export function CaseActions({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ShareActions title={title} text={text} url={url} />
      <a
        href={`/#case/${url.split("/").pop() ?? ""}`}
        className="inline-flex items-center gap-1.5 border border-acid bg-acid px-3 py-2 font-mono text-[0.68rem] font-bold text-carbon transition-transform duration-200 hover:-translate-y-0.5"
      >
        <ExternalLink className="h-3 w-3" /> open in site
      </a>
    </div>
  );
}
