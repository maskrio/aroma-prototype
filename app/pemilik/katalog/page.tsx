"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import {
  categories,
  findCategory,
  searchVariants,
  variants as allVariants,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function KatalogListPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | "semua">("semua");

  const list = useMemo(() => {
    const base = query.trim()
      ? searchVariants(query)
      : allVariants;
    return cat === "semua" ? base : base.filter((v) => v.kategoriId === cat);
  }, [query, cat]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Katalog"
        subtitle={`${allVariants.length} barang`}
        back="/pemilik"
        variant="accent"
      />

      {/* Bulk-input CTAs */}
      <div className="grid grid-cols-3 gap-2 px-4 pt-4">
        <Link
          href="/pemilik/katalog/baru"
          className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-center text-sm hover:border-[var(--primary)]"
        >
          <span className="text-2xl">➕</span>
          <span className="font-semibold leading-tight">Tambah satu</span>
        </Link>
        <Link
          href="/pemilik/katalog/impor"
          className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-center text-sm hover:border-[var(--primary)]"
        >
          <span className="text-2xl">📊</span>
          <span className="font-semibold leading-tight">Impor Excel</span>
        </Link>
        <Link
          href="/pemilik/katalog/buku"
          className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-center text-sm hover:border-[var(--primary)]"
        >
          <span className="text-2xl">📓</span>
          <span className="font-semibold leading-tight">Foto buku catatan</span>
        </Link>
      </div>

      {/* Distributor & Pembelian shortcut */}
      <div className="grid grid-cols-2 gap-2 px-4 pt-2">
        <Link
          href="/pemilik/distributor"
          className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-sm hover:border-[var(--accent)]"
        >
          <span className="text-2xl">🚚</span>
          <span className="font-semibold leading-tight">Daftar Distributor</span>
        </Link>
        <Link
          href="/pemilik/pembelian/baru"
          className="flex items-center gap-2 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent)] p-3 text-sm text-white hover:brightness-110"
        >
          <span className="text-2xl">🧾</span>
          <span className="font-semibold leading-tight">Catat Pembelian</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-4 focus-within:border-[var(--primary)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted-foreground)]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari barang, brand, atau barcode…"
            className="h-12 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        <button
          onClick={() => setCat("semua")}
          className={cn(
            "h-10 shrink-0 rounded-full px-3 text-sm font-semibold",
            cat === "semua"
              ? "bg-[var(--primary)] text-white"
              : "bg-white border border-[var(--border)]",
          )}
        >
          Semua
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "flex h-10 shrink-0 items-center gap-1 rounded-full px-3 text-sm font-semibold",
              cat === c.id
                ? "bg-[var(--primary)] text-white"
                : "bg-white border border-[var(--border)]",
            )}
          >
            <span>{c.ikon}</span>
            <span>{c.nama}</span>
          </button>
        ))}
      </div>

      {/* Product rows */}
      <div className="flex-1 overflow-auto px-4 pb-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {list.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)] md:col-span-2 xl:col-span-3">
              Tidak ada barang cocok.
            </div>
          ) : (
            list.map((v) => {
              const category = findCategory(v.kategoriId);
              return (
                <Link
                  key={v.id}
                  href={`/pemilik/katalog/${v.id}`}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-3 transition active:scale-[0.99] hover:border-[var(--primary)]"
                >
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl",
                      v.warnaBg,
                    )}
                    aria-hidden
                  >
                    {v.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 font-semibold leading-snug break-words">
                      {v.namaPendek}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--muted-foreground)] break-words">
                      {v.brand} · {category?.nama ?? "Tanpa kategori"}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {v.harga.length} satuan · Stok {v.stok}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-bold">{rupiah(v.harga[0]?.harga ?? 0)}</div>
                    <div className="text-[10px] text-[var(--muted-foreground)]">
                      /{v.harga[0]?.unitId ?? "pcs"}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
