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
function fmtShortId(d: Date): string {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

type Sort = "jual" | "beli" | "stokMenipis" | "nama";

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
    else if (sort === "stokMenipis") arr.sort((a, b) => a.stokB - b.stokB);
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
  const labelFrom = fmtShortId(from);
  const labelTo = fmtShortId(to);

  function applyPreset(days: number) {
    setDateA(ymd(daysAgo(days)));
    setDateB(ymd(daysAgo(0)));
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Bandingkan Stok"
        subtitle={invalidRange ? "Tanggal tidak valid" : `${labelFrom} → ${labelTo} (${daySpan} hari)`}
        back="/pemilik"
        variant="accent"
      />

      <div className="flex-1 overflow-auto pb-8">
        {/* Date range pickers */}
        <section className="bg-white border-b border-[var(--border)] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-[var(--muted-foreground)]">
                STOK AWAL (TANGGAL)
              </div>
              <input
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                max={dateB}
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base font-semibold outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-[var(--muted-foreground)]">
                STOK AKHIR (TANGGAL)
              </div>
              <input
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                min={dateA}
                max={ymd(new Date())}
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base font-semibold outline-none focus:border-[var(--accent)]"
              />
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
            <section className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center gap-1 text-xs font-semibold uppercase text-emerald-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                    Masuk (beli)
                  </div>
                  <div className="mt-1 text-xl font-bold text-emerald-700">
                    +{totals.beli.toLocaleString("id-ID")} <span className="text-sm font-normal">pcs</span>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Biaya {rupiah(totals.biaya)}
                  </div>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <div className="flex items-center gap-1 text-xs font-semibold uppercase text-rose-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    Keluar (jual)
                  </div>
                  <div className="mt-1 text-xl font-bold text-rose-700">
                    −{totals.jual.toLocaleString("id-ID")} <span className="text-sm font-normal">pcs</span>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Omset {rupiah(totals.omset)}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                      Laba kotor (perkiraan)
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)]">
                      Omset − biaya beli dalam periode ini.
                    </div>
                  </div>
                  <div
                    className={cn(
                      "shrink-0 text-2xl font-bold",
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
              <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-3 focus-within:border-[var(--primary)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--muted-foreground)]">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari barang…"
                  className="h-12 min-w-0 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
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
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="shrink-0 text-sm text-[var(--muted-foreground)]">Urutkan:</span>
                {([
                  { key: "jual", label: "Jual terbanyak" },
                  { key: "beli", label: "Beli terbanyak" },
                  { key: "stokMenipis", label: "Stok menipis" },
                  { key: "nama", label: "Nama A-Z" },
                ] as const).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSort(s.key)}
                    className={cn(
                      "h-9 shrink-0 rounded-full px-3 text-xs font-semibold",
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

            {/* Product rows */}
            <section className="p-4 space-y-3">
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
                  const deltaBadge =
                    deltaStok > 0 ? { cls: "bg-emerald-100 text-emerald-700", sym: `▲ +${deltaStok}` } :
                    deltaStok < 0 ? { cls: "bg-rose-100 text-rose-700", sym: `▼ ${deltaStok}` } :
                    { cls: "bg-slate-100 text-slate-600", sym: "• 0" };

                  return (
                    <div
                      key={r.variantId}
                      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 p-3">
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
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
                            deltaBadge.cls,
                          )}
                        >
                          {deltaBadge.sym}
                        </span>
                      </div>

                      {/* Timeline: Awal → Akhir */}
                      <div className="bg-[var(--muted)]/50 px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 text-center">
                            <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                              Stok awal
                            </div>
                            <div className="mt-0.5 text-2xl font-bold text-[var(--foreground)]">
                              {r.stokA.toLocaleString("id-ID")}
                            </div>
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              {labelFrom}
                            </div>
                          </div>
                          <div className="shrink-0 flex flex-col items-center">
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted-foreground)]">
                              <path d="M3 10h22" />
                              <path d="M19 4l6 6-6 6" />
                            </svg>
                            <div className="mt-0.5 text-[10px] font-semibold text-[var(--muted-foreground)]">
                              {daySpan} hari
                            </div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                              Stok akhir
                            </div>
                            <div className="mt-0.5 text-2xl font-bold text-[var(--foreground)]">
                              {r.stokB.toLocaleString("id-ID")}
                            </div>
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              {labelTo}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Movement stats */}
                      <div className="grid grid-cols-2 gap-2 p-3">
                        <div className="rounded-xl bg-emerald-50 px-3 py-2">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-700">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                            Masuk
                          </div>
                          <div className="mt-0.5 text-base font-bold text-emerald-700">
                            {r.beli > 0 ? `+${r.beli.toLocaleString("id-ID")}` : "0"}{" "}
                            <span className="text-xs font-normal">pcs</span>
                          </div>
                          {r.biayaBeli > 0 ? (
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              {rupiah(r.biayaBeli)}
                            </div>
                          ) : (
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              tidak ada pembelian
                            </div>
                          )}
                        </div>
                        <div className="rounded-xl bg-rose-50 px-3 py-2">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-rose-700">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                            Keluar
                          </div>
                          <div className="mt-0.5 text-base font-bold text-rose-700">
                            {r.jual > 0 ? `−${r.jual.toLocaleString("id-ID")}` : "0"}{" "}
                            <span className="text-xs font-normal">pcs</span>
                          </div>
                          {r.omsetJual > 0 ? (
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              {rupiah(r.omsetJual)}
                            </div>
                          ) : (
                            <div className="text-[10px] text-[var(--muted-foreground)]">
                              tidak ada penjualan
                            </div>
                          )}
                        </div>
                      </div>
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
