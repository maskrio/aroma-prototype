"use client";

import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import {
  buildStockCompare,
  categories,
  findCategory,
  findVariant,
  variants,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function daysAgo(n: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}
function fmtId(d: Date): string {
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Sort = "jual" | "beli" | "stokB" | "nama";

export default function StokPage() {
  const [dateA, setDateA] = useState(() => ymd(daysAgo(7)));
  const [dateB, setDateB] = useState(() => ymd(daysAgo(0)));
  const [cat, setCat] = useState<string | "semua">("semua");
  const [sort, setSort] = useState<Sort>("jual");
  const [query, setQuery] = useState("");

  const from = useMemo(() => new Date(dateA), [dateA]);
  const to = useMemo(() => new Date(dateB), [dateB]);

  const filteredVariants = useMemo(() => {
    const q = query.trim().toLowerCase();
    return variants.filter((v) => {
      if (cat !== "semua" && v.kategoriId !== cat) return false;
      if (q && !v.nama.toLowerCase().includes(q) && !v.namaPendek.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [cat, query]);

  const rows = useMemo(() => {
    if (from.getTime() > to.getTime()) return [];
    return buildStockCompare(from, to, filteredVariants.map((v) => v.id));
  }, [from, to, filteredVariants]);

  const sortedRows = useMemo(() => {
    const arr = [...rows];
    if (sort === "jual") arr.sort((a, b) => b.jual - a.jual);
    else if (sort === "beli") arr.sort((a, b) => b.beli - a.beli);
    else if (sort === "stokB") arr.sort((a, b) => a.stokB - b.stokB);
    else if (sort === "nama") {
      arr.sort((a, b) => {
        const va = findVariant(a.variantId)?.namaPendek ?? "";
        const vb = findVariant(b.variantId)?.namaPendek ?? "";
        return va.localeCompare(vb);
      });
    }
    return arr;
  }, [rows, sort]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => ({
        beli: acc.beli + r.beli,
        jual: acc.jual + r.jual,
        omset: acc.omset + r.omsetJual,
        biaya: acc.biaya + r.biayaBeli,
      }),
      { beli: 0, jual: 0, omset: 0, biaya: 0 },
    );
  }, [rows]);

  const daySpan = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400000));
  const invalidRange = from.getTime() > to.getTime();

  function applyPreset(days: number) {
    setDateA(ymd(daysAgo(days)));
    setDateB(ymd(daysAgo(0)));
  }

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <TopBar
        title="Bandingkan Stok"
        subtitle={invalidRange ? "Rentang tanggal tidak valid" : `${daySpan} hari`}
        back="/pemilik"
        variant="accent"
      />

      <div className="flex-1 overflow-auto pb-8">
        {/* Date range pickers */}
        <section className="bg-white border-b border-[var(--border)] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-[var(--muted-foreground)]">
                DARI TANGGAL
              </div>
              <input
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                max={dateB}
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base font-semibold outline-none focus:border-[var(--accent)]"
              />
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                {fmtId(from)}
              </div>
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-[var(--muted-foreground)]">
                SAMPAI TANGGAL
              </div>
              <input
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                min={dateA}
                max={ymd(new Date())}
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base font-semibold outline-none focus:border-[var(--accent)]"
              />
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                {fmtId(to)}
              </div>
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Kemarin", days: 1 },
              { label: "7 hari", days: 7 },
              { label: "30 hari", days: 30 },
              { label: "60 hari", days: 60 },
            ].map((p) => (
              <button
                key={p.days}
                onClick={() => applyPreset(p.days)}
                className="h-10 rounded-full bg-[var(--muted)] px-3 text-sm font-semibold hover:bg-slate-200"
              >
                {p.label} terakhir
              </button>
            ))}
          </div>
        </section>

        {invalidRange ? (
          <div className="p-6 text-center text-[var(--destructive)]">
            Tanggal awal harus sebelum tanggal akhir.
          </div>
        ) : (
          <>
            {/* Summary KPIs */}
            <section className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[var(--muted-foreground)]">
                    <span>⬇</span> BELI (MASUK)
                  </div>
                  <div className="mt-1 text-xl font-bold">{totals.beli.toLocaleString("id-ID")} pcs</div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Biaya {rupiah(totals.biaya)}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[var(--muted-foreground)]">
                    <span>⬆</span> JUAL (KELUAR)
                  </div>
                  <div className="mt-1 text-xl font-bold">{totals.jual.toLocaleString("id-ID")} pcs</div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Omset {rupiah(totals.omset)}
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-2xl border border-[var(--border)] bg-white p-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)]">
                      LABA KOTOR (omset − biaya)
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      Perkiraan — pakai harga beli rata-rata pada periode ini.
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-2xl font-bold",
                      totals.omset - totals.biaya >= 0 ? "text-[var(--primary)]" : "text-[var(--destructive)]",
                    )}
                  >
                    {rupiah(totals.omset - totals.biaya)}
                  </div>
                </div>
              </div>
            </section>

            {/* Search + filters */}
            <section className="px-4 space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-4 focus-within:border-[var(--primary)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted-foreground)]">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari barang…"
                  className="h-12 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
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
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--muted-foreground)]">Urutkan:</span>
                {([
                  { key: "jual", label: "Jual terbanyak" },
                  { key: "beli", label: "Beli terbanyak" },
                  { key: "stokB", label: "Stok tersedikit" },
                  { key: "nama", label: "Nama" },
                ] as const).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSort(s.key)}
                    className={cn(
                      "h-9 rounded-full px-3 text-xs font-semibold",
                      sort === s.key
                        ? "bg-[var(--accent)] text-white"
                        : "bg-white border border-[var(--border)]",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Rows */}
            <section className="p-4 space-y-2">
              {sortedRows.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)]">
                  Tidak ada barang sesuai filter.
                </div>
              ) : (
                sortedRows.map((r) => {
                  const v = findVariant(r.variantId);
                  const c = v ? findCategory(v.kategoriId) : null;
                  if (!v) return null;
                  const deltaStok = r.stokB - r.stokA;
                  return (
                    <div
                      key={r.variantId}
                      className="rounded-2xl border border-[var(--border)] bg-white p-3"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl",
                            v.warnaBg,
                          )}
                          aria-hidden
                        >
                          {v.emoji}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{v.namaPendek}</div>
                          <div className="truncate text-xs text-[var(--muted-foreground)]">
                            {v.brand}{c ? ` · ${c.nama}` : ""}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-5 gap-1 text-center">
                        <div className="rounded-lg bg-[var(--muted)] p-2">
                          <div className="text-[10px] font-semibold uppercase text-[var(--muted-foreground)]">
                            Stok A
                          </div>
                          <div className="text-lg font-bold">{r.stokA}</div>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-2">
                          <div className="text-[10px] font-semibold uppercase text-emerald-700">
                            Beli
                          </div>
                          <div className="text-lg font-bold text-emerald-700">
                            {r.beli > 0 ? `+${r.beli}` : "—"}
                          </div>
                        </div>
                        <div className="rounded-lg bg-rose-50 p-2">
                          <div className="text-[10px] font-semibold uppercase text-rose-700">
                            Jual
                          </div>
                          <div className="text-lg font-bold text-rose-700">
                            {r.jual > 0 ? `−${r.jual}` : "—"}
                          </div>
                        </div>
                        <div className="rounded-lg bg-[var(--muted)] p-2">
                          <div className="text-[10px] font-semibold uppercase text-[var(--muted-foreground)]">
                            Stok B
                          </div>
                          <div className="text-lg font-bold">{r.stokB}</div>
                        </div>
                        <div
                          className={cn(
                            "rounded-lg p-2",
                            deltaStok > 0 ? "bg-emerald-100" :
                            deltaStok < 0 ? "bg-rose-100" : "bg-slate-100",
                          )}
                        >
                          <div className="text-[10px] font-semibold uppercase text-[var(--muted-foreground)]">
                            Δ
                          </div>
                          <div className={cn(
                            "text-lg font-bold",
                            deltaStok > 0 ? "text-emerald-700" :
                            deltaStok < 0 ? "text-rose-700" : "text-[var(--muted-foreground)]",
                          )}>
                            {deltaStok > 0 ? `+${deltaStok}` : deltaStok}
                          </div>
                        </div>
                      </div>

                      {r.omsetJual > 0 ? (
                        <div className="mt-2 text-right text-xs text-[var(--muted-foreground)]">
                          Omset {rupiah(r.omsetJual)}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
