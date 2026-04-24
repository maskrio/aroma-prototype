"use client";

import { cn } from "@/lib/utils";

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "md" | "lg";
}

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  size = "md",
}: QtyStepperProps) {
  const inc = () => onChange(Math.min(max, value + 1));
  const dec = () => onChange(Math.max(min, value - 1));

  const btn =
    size === "lg"
      ? "h-16 w-16 text-3xl"
      : "h-12 w-12 text-2xl";
  const display =
    size === "lg"
      ? "h-16 min-w-[80px] text-2xl"
      : "h-12 min-w-[56px] text-xl";

  return (
    <div className="inline-flex items-stretch rounded-2xl border-2 border-[var(--border)] bg-white">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Kurangi"
        className={cn(
          "flex items-center justify-center rounded-l-[14px] font-bold text-[var(--primary)] hover:bg-[var(--muted)] active:scale-[0.95] disabled:opacity-30",
          btn,
        )}
      >
        −
      </button>
      <div
        className={cn(
          "flex items-center justify-center border-x-2 border-[var(--border)] font-bold text-[var(--foreground)]",
          display,
        )}
      >
        {value}
      </div>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Tambah"
        className={cn(
          "flex items-center justify-center rounded-r-[14px] font-bold text-[var(--primary)] hover:bg-[var(--muted)] active:scale-[0.95] disabled:opacity-30",
          btn,
        )}
      >
        +
      </button>
    </div>
  );
}
