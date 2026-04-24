"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  back?: string; // href; if set, shows back button
  right?: ReactNode;
  variant?: "primary" | "accent" | "white";
}

export function TopBar({ title, subtitle, back, right, variant = "primary" }: TopBarProps) {
  const bg = {
    primary: "bg-[var(--primary)] text-white",
    accent: "bg-[var(--accent)] text-white",
    white: "bg-white text-[var(--foreground)] border-b border-[var(--border)]",
  }[variant];

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-20 flex h-16 w-full items-center gap-3 px-4",
        bg,
      )}
    >
      {back ? (
        <Link
          href={back}
          aria-label="Kembali"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      ) : (
        <div className="w-2" />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-lg font-semibold">{title}</div>
        {subtitle ? (
          <div className="truncate text-sm opacity-90">{subtitle}</div>
        ) : null}
      </div>
      {right}
    </header>
  );
}
