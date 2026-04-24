"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/fake-data";

interface CategoryTileProps {
  category: Category;
  href: string;
  count?: number;
}

export function CategoryTile({ category, href, count }: CategoryTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-[110px] flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-center transition active:scale-[0.97] hover:border-[var(--primary)]",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
          category.warna,
        )}
        aria-hidden
      >
        {category.ikon}
      </div>
      <div className="text-sm font-semibold leading-tight text-[var(--foreground)]">
        {category.nama}
      </div>
      {typeof count === "number" ? (
        <div className="text-xs text-[var(--muted-foreground)]">{count} item</div>
      ) : null}
    </Link>
  );
}
