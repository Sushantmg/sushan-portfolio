"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { botMeta, getReply, quickPrompts } from "@/lib/chatbot";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

const welcome: Message = {
  id: 0,
  from: "bot",
  text: `Hey — I'm ${botMeta.name}, a little knowledge bot built into this portfolio.\n\nAsk me anything about Sushan: projects, skills, experience, contact.`,
};

let nextId = 1;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;

    setMessages((m) => [...m, { id: nextId++, from: "user", text }]);
    setInput("");
    setTyping(true);

    const delay = 600 + ((text.length * 13) % 500);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId++, from: "bot", text: getReply(text) },
      ]);
      setTyping(false);
    }, delay);
  };

  const openPanel = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label="Open chat with Sushan bot"
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center border transition-all duration-200 ${
          open
            ? "border-acid bg-carbon text-acid"
            : "border-line bg-acid text-carbon hover:-translate-y-0.5 hover:hard-shadow-sm"
        }`}
      >
        {open ? (
          <Terminal className="h-5 w-5 rotate-180" />
        ) : (
          <Terminal className="h-5 w-5" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[32rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden border border-line bg-carbon shadow-2xl sm:right-6"
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
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="font-mono grid h-7 w-7 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid"
              >
                ×
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`whitespace-pre-line font-mono text-[0.82rem] leading-relaxed ${
                      m.from === "user"
                        ? "border border-acid/60 bg-acid/10 px-3 py-2 text-acid"
                        : "border border-line bg-carbon-2 px-3 py-2 text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

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
                  {quickPrompts().map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="border border-line bg-carbon-2 px-3 py-1.5 text-left font-mono text-[0.72rem] text-muted transition-all duration-200 hover:border-acid hover:text-acid"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-line bg-carbon-2 p-3"
            >
              <span className="font-mono text-sm text-acid">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask about  sushan…"
                className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
                aria-label="Chat message"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-8 w-8 shrink-0 place-items-center bg-acid text-carbon transition-transform duration-200 hover:scale-105 disabled:opacity-40"
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