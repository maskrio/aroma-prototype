"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { pastOrders, type PastOrder } from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

type Filter = "semua" | "nego" | "7hari";

function formatTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(d);
}

function formatDayLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function dateKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function RiwayatPage() {
  const [filter, setFilter] = useState<Filter>("semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo<PastOrder[]>(() => {
    const q = query.trim().toLowerCase();
    return pastOrders.filter((o) => {
      if (filter === "nego" && !o.lines.some((l) => l.adjusted) && o.potongan === 0) return false;
      if (filter === "7hari") {
        const age = Date.now() - new Date(o.approvedAt).getTime();
        if (age > 7 * 86400000) return false;
      }
      if (q) {
        const hay = (o.nomor + " " + o.kasirNama + " " + o.catatan).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filter, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, PastOrder[]>();
    for (const o of filtered) {
      const key = dateKey(o.approvedAt);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(o);
    }
    return Array.from(map.entries()); // already sorted desc by source order
  }, [filtered]);

  const totals = useMemo(() => {
    const omset = filtered.reduce((s, o) => s + o.totalAkhir, 0);
    const items = filtered.reduce(
      (s, o) => s + o.lines.reduce((ss, l) => ss + l.qty, 0),
      0,
    );
    return { omset, items, orders: filtered.length };
  }, [filtered]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Riwayat Struk"
        subtitle={`${totals.orders} pesanan · ${rupiah(totals.omset)}`}
        back="/pemilik"
        variant="accent"
      />

      <div className="flex-1 overflow-auto">
        {/* Filters */}
        <div className="shrink-0 bg-white p-4 space-y-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-3 focus-within:border-[var(--primary)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--muted-foreground)]">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nomor, kasir, atau catatan…"
              className="h-12 min-w-0 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {(
              [
                { key: "semua", label: `Semua (${pastOrders.length})` },
                { key: "7hari", label: "7 hari terakhir" },
                { key: "nego", label: "💬 Ada nego" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-3 text-sm font-semibold",
                  filter === f.key
                    ? "bg-[var(--accent)] text-white"
                    : "bg-white border border-[var(--border)]",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped list */}
        <div className="p-4 space-y-5">
          {grouped.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)]">
              <div className="mb-2 text-5xl">📜</div>
              Belum ada struk di rentang ini.
            </div>
          ) : (
            grouped.map(([day, orders]) => {
              const dayOmset = orders.reduce((s, o) => s + o.totalAkhir, 0);
              return (
                <section key={day}>
                  <div className="mb-2 flex items-baseline justify-between px-1">
                    <div className="text-sm font-semibold text-[var(--muted-foreground)]">
                      {formatDayLabel(day)}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {orders.length} struk · {rupiah(dayOmset)}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {orders.map((o) => {
                      const anyNego = o.lines.some((l) => l.adjusted) || o.potongan > 0;
                      const itemCount = o.lines.reduce((s, l) => s + l.qty, 0);
                      return (
                        <li key={o.id}>
                          <Link
                            href={`/pemilik/struk/${o.id}`}
                            className="block rounded-2xl border border-[var(--border)] bg-white p-3 transition active:scale-[0.99] hover:border-[var(--accent)]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">{o.nomor}</span>
                                  {anyNego ? (
                                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-white">
                                      NEGO
                                    </span>
                                  ) : null}
                                </div>
                                <div className="text-xs text-[var(--muted-foreground)]">
                                  {o.kasirNama} · {formatTime(o.approvedAt)} · {itemCount} item
                                </div>
                                {o.catatan ? (
                                  <div className="mt-1 truncate text-xs italic text-[var(--muted-foreground)]">
                                    "{o.catatan}"
                                  </div>
                                ) : null}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-[var(--primary)]">
                                  {rupiah(o.totalAkhir)}
                                </div>
                                <div className="text-xs text-[var(--accent)]">
                                  {anyNego && o.totalAkhir < o.subtotalAsli
                                    ? `hemat ${rupiah(o.subtotalAsli - o.totalAkhir)}`
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
