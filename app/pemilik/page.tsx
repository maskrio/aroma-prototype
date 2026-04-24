"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { OrderCard } from "@/components/OrderCard";
import { fakeOrders, findVariant, hargaUntuk, variants } from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

type Filter = "pending" | "semua";

export default function PemilikDashboardPage() {
  const [filter, setFilter] = useState<Filter>("pending");
  const [now, setNow] = useState<Date>(new Date());

  // Force re-render each 30s so "5 menit lalu" updates naturally.
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(i);
  }, []);

  const pending = fakeOrders.filter((o) => o.status === "PENDING");
  const all = fakeOrders;
  const shown = filter === "pending" ? pending : all;

  // Today's totals
  const omzet = fakeOrders.reduce((sum, o) => {
    return sum + o.items.reduce((s, it) => {
      const v = findVariant(it.variantId);
      return v ? s + hargaUntuk(v, it.unitId) * it.qty : s;
    }, 0);
  }, 0);
  const orderCount = fakeOrders.length;
  const lowStock = variants.filter((v) => v.stok <= 20).length;

  return (
    <div className="flex flex-1 flex-col">
      <TopBar
        title="Ringkasan"
        subtitle={`Hari ini · ${now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}`}
        variant="accent"
        right={
          <Link
            href="/pemilik/katalog"
            className="flex h-11 items-center rounded-full bg-white/15 px-4 text-white text-sm font-semibold hover:bg-white/25"
          >
            Kelola Katalog
          </Link>
        }
      />

      <div className="flex-1 overflow-auto bg-[var(--background)] pb-8">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[var(--border)]">
            <div className="text-xs text-[var(--muted-foreground)]">Omzet</div>
            <div className="mt-1 text-lg font-bold">{rupiah(omzet)}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[var(--border)]">
            <div className="text-xs text-[var(--muted-foreground)]">Pesanan</div>
            <div className="mt-1 text-lg font-bold">{orderCount}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[var(--border)]">
            <div className="text-xs text-[var(--muted-foreground)]">Stok Menipis</div>
            <div className="mt-1 text-lg font-bold text-[var(--destructive)]">{lowStock}</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <button
            onClick={() => setFilter("pending")}
            className={cn(
              "h-11 rounded-full px-4 text-sm font-semibold transition",
              filter === "pending"
                ? "bg-[var(--accent)] text-white"
                : "bg-white text-[var(--foreground)] border border-[var(--border)]",
            )}
          >
            Menunggu ({pending.length})
          </button>
          <button
            onClick={() => setFilter("semua")}
            className={cn(
              "h-11 rounded-full px-4 text-sm font-semibold transition",
              filter === "semua"
                ? "bg-[var(--accent)] text-white"
                : "bg-white text-[var(--foreground)] border border-[var(--border)]",
            )}
          >
            Semua ({all.length})
          </button>
        </div>

        <div className="space-y-3 px-4">
          {shown.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)]">
              <div className="mb-2 text-5xl">✅</div>
              Tidak ada pesanan yang menunggu.
            </div>
          ) : (
            shown.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                href={`/pemilik/pesanan/${o.id}`}
                variant={
                  o.status === "PENDING" ? "pending" :
                  o.status === "CONFIRMED" ? "confirmed" : "cancelled"
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
