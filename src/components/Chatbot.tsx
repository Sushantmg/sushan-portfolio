"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  ClipboardCopy,
  Mic,
  RotateCcw,
  Search,
  Send,
  Terminal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { botMeta, quickPrompts } from "@/lib/chatbot";
import { followupsFor, jumpsFor } from "./chat/followups";
import { MessageText } from "./chat/MessageText";
import { useChat } from "./chat/useChat";

interface SpeechResultLike {
  readonly isFinal: boolean;
  readonly 0: { readonly transcript: string };
}

interface SpeechEventLike {
  readonly results: { readonly length: number; readonly [i: number]: SpeechResultLike };
}

interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

type SpeechWindow = typeof window & {
  SpeechRecognition?: new () => RecognitionLike;
  webkitSpeechRecognition?: new () => RecognitionLike;
};

function speechCtor() {
  if (typeof window === "undefined") return null;
  const w = window as SpeechWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function hasSpeech() {
  return speechCtor() !== null;
}

const noopSubscribe = () => () => {};

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function CopyMsg({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    } catch {}
  };
  return (
    <button
      onClick={copy}
      aria-label="Copy message"
      className="font-mono text-[0.58rem] text-muted/50 transition-colors hover:text-acid"
    >
      {ok ? "✓ copied" : "[ copy ]"}
    </button>
  );
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-line bg-carbon-2 px-2.5 py-1 text-left font-mono text-[0.68rem] text-muted transition-all duration-200 hover:border-acid hover:text-acid"
    >
      {label}
    </button>
  );
}

export function Chatbot() {
  const reduced = useReducedMotion();
  const {
    open,
    messages,
    typing,
    unread,
    reveal,
    streamId,
    send,
    skipStream,
    reset,
    openPanel,
    close,
    toggle,
    recall,
    copyAll,
  } = useChat(!reduced);

  const [input, setInput] = useState("");
  const [hint, setHint] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showJump, setShowJump] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [listening, setListening] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const stickRef = useRef(true);
  const recRef = useRef<RecognitionLike | null>(null);

  const canVoice = useSyncExternalStore(noopSubscribe, hasSpeech, () => false);

  const q = query.trim().toLowerCase();
  const shown = q
    ? messages.filter((m) => m.text.toLowerCase().includes(q))
    : messages;

  const botCount = messages.filter((m) => m.from === "bot").length;
  const lastBot = [...messages].reverse().find((m) => m.from === "bot");
  const chips =
    lastBot && !typing && !q && streamId === null
      ? followupsFor(lastBot.text, botCount)
      : [];
  const jumps = lastBot && !typing && !q && streamId === null ? jumpsFor(lastBot.text) : [];

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 1800);
    const hide = setTimeout(() => setHint(false), 9000);
    return () => {
      clearTimeout(t);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    const onAsk = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      openPanel();
      setTimeout(() => send(detail), 120);
    };
    window.addEventListener("sushan:ask", onAsk);
    return () => window.removeEventListener("sushan:ask", onAsk);
  }, [openPanel, send]);

  useEffect(() => {
    if (!stickRef.current) return;
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (streamId === null) return;
    const el = listRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  }, [reveal, streamId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPanel();
        setTimeout(() => inputRef.current?.focus(), 60);
        return;
      }
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
          setQuery("");
          return;
        }
        if (open) close();
        return;
      }
      if (open && e.key === "/" && !inField) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, searchOpen, openPanel, close]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
    stickRef.current = atBottom;
    setShowJump(!atBottom);
  };

  const jumpToLatest = () => {
    stickRef.current = true;
    setShowJump(false);
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const submit = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    stickRef.current = true;
    setShowJump(false);
    send(text);
    if (raw === undefined) {
      setInput("");
      const el = inputRef.current;
      if (el) el.style.height = "auto";
    }
  };

  const onComposerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };

  const onComposerKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
      return;
    }
    if (e.key === "ArrowUp" && !e.shiftKey) {
      const prev = recall(-1);
      if (prev !== null) {
        e.preventDefault();
        setInput(prev);
      }
      return;
    }
    if (e.key === "ArrowDown" && !e.shiftKey) {
      const next = recall(1);
      if (next !== null) {
        e.preventDefault();
        setInput(next);
      }
    }
  };

  const onCopyAll = useCallback(async () => {
    await copyAll();
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }, [copyAll]);

  const toggleVoice = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const Ctor = speechCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (last?.[0]?.transcript) setInput(last[0].transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <>
      <AnimatePresence>
        {!open && hint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0, duration: 0.35 }}
            className="fixed bottom-[5.5rem] right-5 z-[45] w-56 border border-acid/40 bg-carbon-2 p-3 font-mono text-[0.7rem] leading-relaxed text-ink shadow-xl sm:right-6"
          >
            <p className="text-acid">{"//"} hi — it&apos;s me, a bot</p>
            <p className="mt-1.5 text-muted">
              I&apos;m live inside this site. Ask me anything about sushan —
              projects, skills, contact.
            </p>
            <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-carbon-2" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        onClick={() => {
          setHint(false);
          toggle();
          if (!open) setTimeout(() => inputRef.current?.focus(), 200);
        }}
        aria-label={open ? "Close chat" : "Chat with the Sushan bot"}
        className={`fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 border px-4 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
          open
            ? "border-line bg-carbon text-ink hover:border-acid hover:text-acid"
            : "hard-shadow-sm border-acid bg-acid text-carbon hover:-translate-y-0.5"
        }`}
      >
        {open ? (
          <>
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">close</span>
          </>
        ) : (
          <>
            <span className="relative grid h-8 w-8 place-items-center bg-carbon text-acid">
              <Bot className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-acid ring-2 ring-carbon" />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span>ask sushan</span>
              <span className="mt-1 text-[0.55rem] font-medium normal-case text-carbon/70">
                an AI bot · online
              </span>
            </span>
            {unread > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center bg-vermilion px-1 text-[0.6rem] font-bold tracking-normal text-carbon">
                {unread}
              </span>
            )}
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100dvh-7.5rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden border border-line bg-carbon shadow-2xl sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-line bg-carbon-2 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center border border-acid bg-acid text-carbon">
                  <Terminal className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold text-ink">
                    {botMeta.name}
                  </p>
                  <p className="font-mono flex items-center gap-1.5 text-[0.65rem] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                    {botMeta.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSearchOpen((s) => !s);
                    setTimeout(() => searchRef.current?.focus(), 40);
                  }}
                  aria-label="Search transcript"
                  title="search (esc to close)"
                  className={`grid h-7 w-7 place-items-center border transition-colors ${
                    searchOpen
                      ? "border-acid text-acid"
                      : "border-line text-muted hover:border-acid hover:text-acid"
                  }`}
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onCopyAll}
                  aria-label="Copy whole transcript"
                  title="copy transcript"
                  className="grid h-7 w-7 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  {copiedAll ? (
                    <span className="font-mono text-[0.5rem] text-acid">✓</span>
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={reset}
                  aria-label="Start new chat"
                  title="new chat"
                  className="grid h-7 w-7 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={close}
                  aria-label="Close chat"
                  className="grid h-7 w-7 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {searchOpen && (
              <div className="flex items-center gap-2 border-b border-line bg-carbon-2 px-3 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search transcript…"
                  aria-label="Search transcript"
                  className="w-full bg-transparent font-mono text-xs text-ink placeholder:text-muted focus:outline-none"
                />
                <span className="font-mono text-[0.6rem] text-muted">
                  {shown.length}/{messages.length}
                </span>
              </div>
            )}

            <div className="relative flex min-h-0 flex-1 flex-col">
              <div
                ref={listRef}
                onScroll={onScroll}
                role="log"
                aria-live="polite"
                aria-label="Chat transcript"
                className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {shown.length === 0 && (
                  <p className="font-mono text-[0.7rem] text-muted">
                    no messages match “{query}”
                  </p>
                )}

                {shown.map((m) => {
                  const streaming = m.id === streamId;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col ${
                        m.from === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        onClick={streaming ? skipStream : undefined}
                        title={streaming ? "click to finish" : undefined}
                        className={`max-w-[92%] whitespace-pre-line font-mono text-[0.82rem] leading-relaxed ${
                          m.from === "user"
                            ? "border border-acid/60 bg-acid/10 px-3 py-2 text-acid"
                            : "border border-line bg-carbon-2 px-3 py-2 text-ink"
                        } ${streaming ? "cursor-pointer" : ""}`}
                      >
                        <MessageText
                          text={
                            streaming ? m.text.slice(0, reveal) : m.text
                          }
                          highlight={q || undefined}
                        />
                        {streaming && (
                          <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-acid align-middle" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 px-0.5">
                        {m.from === "bot" && <CopyMsg text={m.text} />}
                        {m.ts && (
                          <span className="font-mono text-[0.55rem] text-muted/40">
                            {timeFmt.format(m.ts)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 border border-line bg-carbon-2 px-3 py-2.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 bg-acid"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.length === 1 && !typing && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {quickPrompts().map((p) => (
                      <Chip key={p} label={p} onClick={() => submit(p)} />
                    ))}
                  </div>
                )}

                {jumps.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {jumps.map((j) => (
                      <button
                        key={j.href}
                        onClick={() => {
                          document
                            .querySelector(j.href)
                            ?.scrollIntoView({ behavior: "smooth" });
                          close();
                        }}
                        className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted transition-colors hover:border-acid hover:text-acid"
                      >
                        {j.label} →
                      </button>
                    ))}
                  </div>
                )}

                {chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {chips.map((c) => (
                      <Chip key={c} label={c} onClick={() => submit(c)} />
                    ))}
                  </div>
                )}
              </div>

              {showJump && (
                <button
                  onClick={jumpToLatest}
                  className="absolute bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 border border-line bg-carbon-2 px-3 py-1 font-mono text-[0.6rem] text-acid transition-colors hover:border-acid"
                >
                  <ArrowDown className="h-3 w-3" /> latest
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-line bg-carbon-2 px-3 pt-2 pb-1 font-mono text-[0.55rem] text-muted/60">
              <span>↵ send · ⇧↵ newline</span>
              <span>↑↓ history · ⌘K chat · esc close</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex items-start gap-2 bg-carbon-2 px-3 pb-3 pt-1"
            >
              <span className="font-mono pt-1.5 text-sm text-acid">❯</span>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={onComposerChange}
                onKeyDown={onComposerKey}
                placeholder={listening ? "listening…" : "ask about  sushan…"}
                aria-label="Chat message"
                className="max-h-28 w-full resize-none bg-transparent py-1.5 font-mono text-sm leading-snug text-ink placeholder:text-muted focus:outline-none"
              />
              {canVoice && (
                <button
                  type="button"
                  onClick={toggleVoice}
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                  title="voice input"
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center border transition-colors ${
                    listening
                      ? "animate-pulse border-acid bg-acid/15 text-acid"
                      : "border-line text-muted hover:border-acid hover:text-acid"
                  }`}
                >
                  <Mic className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Send message"
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center bg-acid text-carbon transition-transform duration-200 hover:scale-105 disabled:opacity-40"
                disabled={!input.trim() || typing}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
