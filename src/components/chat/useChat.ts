"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { botMeta, getReply } from "@/lib/chatbot";
import { profile } from "@/lib/data";

export type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
  ts?: number;
};

const STORAGE_KEY = "sushan-chat";
const MAX_MESSAGES = 80;

export const welcomeText = `Hey — I'm ${botMeta.name}, a knowledge bot living inside this portfolio.\n\nAsk me about Sushan: projects, skills, experience, contact. Type /help for commands, or pick a prompt below.`;

function freshWelcome(): Message[] {
  return [{ id: 0, from: "bot", text: welcomeText }];
}

function loadHistory(): Message[] {
  if (typeof window === "undefined") return freshWelcome();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return freshWelcome();
    const parsed = JSON.parse(raw) as {
      from: "user" | "bot";
      text: string;
      ts?: number;
    }[];
    if (!Array.isArray(parsed) || parsed.length === 0) return freshWelcome();
    return parsed
      .slice(-MAX_MESSAGES)
      .map((m, i) => ({ id: i, from: m.from, text: m.text, ts: m.ts }));
  } catch {
    return freshWelcome();
  }
}

export function useChat(streaming: boolean) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [streamId, setStreamId] = useState<number | null>(null);
  const [reveal, setReveal] = useState(0);

  const openRef = useRef(false);
  const busyRef = useRef(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamTextRef = useRef("");
  const sentRef = useRef<string[]>([]);
  const cursorRef = useRef(0);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (sentRef.current.length === 0) {
      sentRef.current = messages
        .filter((m) => m.from === "user")
        .map((m) => m.text);
      cursorRef.current = sentRef.current.length;
    }
  }, [messages]);

  useEffect(() => {
    try {
      const keep = messages
        .slice(-MAX_MESSAGES)
        .map(({ from, text, ts }) => ({ from, text, ts }));
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(keep));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (streamId === null) return;
    const len = streamTextRef.current.length;
    const step = Math.max(2, Math.ceil(len / 40));
    const tick = 16;
    let cur = 0;
    const interval = setInterval(() => {
      cur = Math.min(len, cur + step);
      setReveal(cur);
      if (cur >= len) clearInterval(interval);
    }, tick);
    const done = setTimeout(() => {
      clearInterval(interval);
      setReveal(len);
      setStreamId(null);
    }, tick * Math.ceil(len / step) + 120);
    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [streamId]);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || busyRef.current) return;
      busyRef.current = true;
      sentRef.current = [...sentRef.current, text].slice(-50);
      cursorRef.current = sentRef.current.length;
      setMessages((m) => [
        ...m,
        { id: m.length, from: "user", text, ts: Date.now() },
      ]);
      setTyping(true);
      const delay = 380 + ((text.length * 11) % 340);
      replyTimer.current = setTimeout(() => {
        let reply: string;
        try {
          reply = getReply(text);
        } catch {
          reply = `Something broke on my end. Try rephrasing — or just email ${profile.email} directly.`;
        }
        const id = messagesRef.current.length;
        streamTextRef.current = reply;
        setMessages((m) => [
          ...m,
          { id: m.length, from: "bot", text: reply, ts: Date.now() },
        ]);
        setTyping(false);
        busyRef.current = false;
        if (!openRef.current) setUnread((u) => u + 1);
        if (streaming) {
          setStreamId(id);
          setReveal(0);
        }
      }, delay);
    },
    [streaming],
  );

  const skipStream = useCallback(() => {
    setReveal(streamTextRef.current.length);
    setStreamId(null);
  }, []);

  const reset = useCallback(() => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    busyRef.current = false;
    sentRef.current = [];
    cursorRef.current = 0;
    streamTextRef.current = "";
    setMessages(freshWelcome());
    setTyping(false);
    setStreamId(null);
    setReveal(0);
    setUnread(0);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const openPanel = useCallback(() => {
    setOpen(true);
    setUnread(0);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => {
    if (openRef.current) setOpen(false);
    else {
      setOpen(true);
      setUnread(0);
    }
  }, []);

  const recall = useCallback((direction: -1 | 1): string | null => {
    const list = sentRef.current;
    if (list.length === 0) return null;
    if (direction === -1) {
      if (cursorRef.current <= 0) return null;
      cursorRef.current -= 1;
      return list[cursorRef.current] ?? null;
    }
    // Stepping past the newest entry returns an empty string, so the composer
    // can return to the message that was being typed.
    if (cursorRef.current >= list.length - 1) {
      cursorRef.current = list.length;
      return "";
    }
    cursorRef.current += 1;
    return list[cursorRef.current] ?? "";
  }, []);

  const transcript = useCallback(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return messages
      .map((m) => {
        const who = m.from === "user" ? "you" : botMeta.name;
        const time = m.ts ? `[${fmt.format(m.ts)}] ` : "";
        return `${time}${who}: ${m.text}`;
      })
      .join("\n\n");
  }, [messages]);

  const copyAll = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(transcript());
    } catch {}
  }, [transcript]);

  useEffect(
    () => () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    },
    [],
  );

  return {
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
  };
}
