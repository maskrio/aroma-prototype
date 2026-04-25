"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import {
  categories,
  distributorStats,
  distributors,
  findCategory,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

function fmtDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function DistributorListPage() {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return distributors.filter((d) => {
      if (!q) return true;
      const hay = (d.nama + " " + d.kontakNama + " " + d.telepon).toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  // Aggregate totals across all distributors.
  const aggregate = useMemo(() => {
    return distributors.reduce(
      (acc, d) => {
        const s = distributorStats(d.id);
        acc.totalSpent += s.totalSpent;
        acc.totalPurchases += s.count;
        return acc;
      },
      { totalSpent: 0, totalPurchases: 0 },
    );
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Distributor"
        subtitle={`${distributors.length} suplier · ${aggregate.totalPurchases} pembelian`}
        back="/pemilik/katalog"
        variant="accent"
        right={
          <Link
            href="/pemilik/distributor/baru"
            className="flex h-11 items-center gap-1 rounded-full bg-white/15 px-3 text-white text-sm font-semibold hover:bg-white/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Tambah
          </Link>
        }
      />

      <div className="flex-1 overflow-auto">
        {/* Quick CTA + KPIs */}
        <section className="bg-white border-b border-[var(--border)] p-4 space-y-3">
          <Link
            href="/pemilik/pembelian/baru"
            className="flex h-[64px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] text-white text-lg font-semibold hover:brightness-110 active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3 6-6" />
              <path d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4l-2-2H9L7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
            </svg>
            Catat Pembelian Baru
          </Link>
          <div className="rounded-2xl border border-[var(--border)] p-3 text-sm">
            <div className="flex items-baseline justify-between">
              <div className="text-[var(--muted-foreground)]">Total belanja semua distributor</div>
              <div className="text-lg font-bold text-[var(--primary)]">
                {rupiah(aggregate.totalSpent)}
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="bg-white border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-3 focus-within:border-[var(--primary)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--muted-foreground)]">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama distributor / kontak…"
              className="h-12 min-w-0 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
            />
          </div>
        </section>

        {/* List */}
        <section className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
          {list.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)] md:col-span-2 xl:col-span-3">
              Tidak ada distributor cocok.
            </div>
          ) : (
            list.map((d) => {
              const stats = distributorStats(d.id);
              const cats = d.spesialisasi.map((id) => findCategory(id)).filter((c) => !!c);
              return (
                <Link
                  key={d.id}
                  href={`/pemilik/distributor/${d.id}`}
                  className="block rounded-2xl border border-[var(--border)] bg-white p-4 transition active:scale-[0.99] hover:border-[var(--accent)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 font-semibold leading-snug">
                        {d.nama}
                      </div>
                      <div className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                        {d.kontakNama} · {d.telepon}
                      </div>
                    </div>
                  </div>

                  {cats.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {cats.map((c) => (
                        <span
                          key={c!.id}
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            c!.warna,
                          )}
                        >
                          {c!.ikon} {c!.nama}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-dashed border-[var(--border)] pt-3 text-xs">
                    <div>
                      <div className="text-[var(--muted-foreground)]">Total belanja</div>
                      <div className="text-base font-bold text-[var(--primary)]">
                        {rupiah(stats.totalSpent)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--muted-foreground)]">{stats.count} pembelian</div>
                      <div className="text-base font-semibold">
                        {fmtDate(stats.lastDate)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
