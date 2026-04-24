"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { ProductTile } from "@/components/ProductTile";
import {
  categories,
  favoritIds,
  findVariant,
  searchVariants,
  variantsByCategory,
  variants as allVariants,
} from "@/lib/fake-data";
import { cn } from "@/lib/utils";

type Tab = "favorit" | "kategori" | "semua";

export default function KasirHomePage() {
  const [tab, setTab] = useState<Tab>("favorit");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const favoriteVariants = useMemo(
    () => favoritIds.map((id) => findVariant(id)).filter((v) => !!v),
    [],
  );

  const searchResults = useMemo(
    () => (query.trim() ? searchVariants(query) : []),
    [query],
  );

  const catVariants = useMemo(
    () => (activeCat ? variantsByCategory(activeCat) : []),
    [activeCat],
  );

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const v of allVariants) {
      map[v.kategoriId] = (map[v.kategoriId] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <TopBar
        title="Toko Demo"
        subtitle="Kasir: Budi"
        right={
          <Link
            href="/kasir/keranjang"
            className="flex h-11 items-center gap-2 rounded-full bg-white/15 px-3 text-white text-sm font-semibold hover:bg-white/25"
            aria-label="Scan barcode"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="3" height="14" />
              <rect x="8" y="5" width="1.5" height="14" />
              <rect x="12" y="5" width="2" height="14" />
              <rect x="16" y="5" width="1.5" height="14" />
              <rect x="19" y="5" width="2" height="14" />
            </svg>
            Scan
          </Link>
        }
      />

      {/* Search bar — always present, dominant */}
      <div className="no-print sticky top-16 z-10 bg-[var(--background)] px-4 pb-3 pt-3 shadow-sm">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-4 focus-within:border-[var(--primary)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted-foreground)]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari barang… (contoh: indomie)"
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-[var(--muted-foreground)]"
            inputMode="search"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {/* Search results (override tabs when searching) */}
      {query.trim() ? (
        <div className="flex-1 overflow-auto px-4 pb-6">
          {searchResults.length === 0 ? (
            <div className="mt-12 text-center text-[var(--muted-foreground)]">
              <div className="mb-2 text-5xl">🔍</div>
              <div>Tidak ada barang yang cocok dengan "{query}".</div>
            </div>
          ) : (
            <>
              <div className="mb-3 mt-1 text-sm text-[var(--muted-foreground)]">
                {searchResults.length} hasil untuk "{query}"
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {searchResults.map((v) => (
                  <ProductTile key={v.id} variant={v} href={`/kasir/produk/${v.id}`} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="no-print flex gap-2 px-4 pb-3">
            {(
              [
                { key: "favorit", label: "⭐ Favorit" },
                { key: "kategori", label: "Kategori" },
                { key: "semua", label: "Semua" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  setActiveCat(null);
                }}
                className={cn(
                  "h-11 rounded-full px-4 text-sm font-semibold transition",
                  tab === t.key
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-[var(--foreground)] border border-[var(--border)]",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto px-4 pb-6">
            {tab === "favorit" ? (
              <>
                <div className="mb-2 text-sm text-[var(--muted-foreground)]">
                  Barang paling sering kamu jual.
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {favoriteVariants.map((v) => (
                    <ProductTile key={v!.id} variant={v!} href={`/kasir/produk/${v!.id}`} />
                  ))}
                </div>
              </>
            ) : null}

            {tab === "kategori" ? (
              <>
                {activeCat ? (
                  <>
                    <button
                      onClick={() => setActiveCat(null)}
                      className="mb-3 text-sm text-[var(--muted-foreground)]"
                    >
                      ← Semua kategori
                    </button>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {catVariants.map((v) => (
                        <ProductTile
                          key={v.id}
                          variant={v}
                          href={`/kasir/produk/${v.id}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveCat(c.id)}
                        className={cn(
                          "flex h-[110px] flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[var(--border)] bg-white p-3 text-center transition active:scale-[0.97] hover:border-[var(--primary)]",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
                            c.warna,
                          )}
                          aria-hidden
                        >
                          {c.ikon}
                        </div>
                        <div className="text-sm font-semibold leading-tight text-[var(--foreground)]">
                          {c.nama}
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {categoryCounts[c.id] ?? 0} item
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : null}

            {tab === "semua" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {allVariants.map((v) => (
                  <ProductTile key={v.id} variant={v} href={`/kasir/produk/${v.id}`} />
                ))}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
