"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "muted" | "danger" | "outline";

interface BigButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  leading?: ReactNode;
  children: ReactNode;
}

export function BigButton({
  variant = "primary",
  size = "lg",
  leading,
  children,
  className,
  ...rest
}: BigButtonProps) {
  const base =
    "w-full rounded-2xl font-semibold flex items-center justify-center gap-3 transition active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100";
  const sizes = {
    md: "h-[56px] text-lg px-5",
    lg: "h-[72px] text-xl px-6",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-[var(--primary)] text-white hover:brightness-110",
    accent: "bg-[var(--accent)] text-white hover:brightness-110",
    muted: "bg-[var(--muted)] text-[var(--foreground)] hover:bg-slate-200",
    danger: "bg-[var(--destructive)] text-white hover:brightness-110",
    outline:
      "bg-white text-[var(--foreground)] border-2 border-[var(--border)] hover:bg-[var(--muted)]",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {leading}
      <span>{children}</span>
    </button>
  );
}
