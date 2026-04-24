"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { rupiah } from "@/lib/format";
import { hargaUntuk, type Variant } from "@/lib/fake-data";

interface ProductTileProps {
  variant: Variant;
  href?: string;
  onClick?: () => void;
  lowStockThreshold?: number;
}

export function ProductTile({
  variant,
  href,
  onClick,
  lowStockThreshold = 20,
}: ProductTileProps) {
  // Pick the most "natural" default unit: first price entry.
  const defaultUnit = variant.harga[0]?.unitId ?? "pcs";
  const harga = hargaUntuk(variant, defaultUnit);
  const lowStock = variant.stok <= lowStockThreshold;
  const outOfStock = variant.stok === 0;

  const body = (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white transition active:scale-[0.97]",
        "hover:border-[var(--primary)]",
      )}
    >
      <div
        className={cn(
          "relative flex h-24 items-center justify-center text-5xl",
          variant.warnaBg,
        )}
      >
        <span aria-hidden>{variant.emoji}</span>
        {outOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
            HABIS
          </div>
        ) : lowStock ? (
          <div className="absolute right-2 top-2 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-bold text-white">
            Sisa {variant.stok}
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)]">
          {variant.namaPendek}
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-base font-bold text-[var(--primary)]">
            {rupiah(harga)}
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            /{defaultUnit}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {body}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      {body}
    </button>
  );
}
