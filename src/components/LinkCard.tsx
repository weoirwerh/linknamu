"use client";

import { useSyncExternalStore } from "react";

// 클릭 수 집계 — 현재는 브라우저 localStorage에 저장 (서버 연동 전 임시)
const CLICKS_KEY = "linknamu:clicks";

function loadClicks(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(CLICKS_KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function recordClick(id: string) {
  const clicks = loadClicks();
  clicks[id] = (clicks[id] ?? 0) + 1;
  try {
    localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
  } catch {}
  listeners.forEach((listener) => listener());
}

type LinkCardProps = {
  id: string;
  icon: string;
  title: string;
  url: string;
};

export default function LinkCard({ id, icon, title, url }: LinkCardProps) {
  const count = useSyncExternalStore(
    subscribe,
    () => loadClicks()[id] ?? 0,
    () => 0,
  );

  const external = !url.startsWith("mailto:");

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => recordClick(id)}
      className="flex items-center gap-3.5 rounded-[14px] border border-line bg-card px-5 py-[18px] shadow-sm transition hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="w-6 text-center text-xl">{icon}</span>
      <span className="flex-1 font-semibold">{title}</span>
      <span className="text-[13px] text-muted">{count}회</span>
      <span className="text-muted">›</span>
    </a>
  );
}
