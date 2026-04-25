"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import {
  distributorStats,
  findCategory,
  findDistributor,
  findUnit,
  findVariant,
  pembelianFor,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function fmtTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(d);
}
function monthKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function fmtMonth(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
}

export default function DistributorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dist = findDistributor(id);

  const purchases = useMemo(() => pembelianFor(id), [id]);
  const stats = useMemo(() => distributorStats(id), [id]);
  const grouped = useMemo(() => {
    const map = new Map<string, typeof purchases>();
    for (const p of purchases) {
      const k = monthKey(p.tanggal);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    }
    return [...map.entries()];
  }, [purchases]);

  if (!dist) {
    return (
      <div className="flex flex-1 flex-col">
        <TopBar title="Tidak ditemukan" back="/pemilik/distributor" variant="accent" />
        <div className="p-6 text-center text-[var(--muted-foreground)]">
          Distributor tidak ditemukan.
        </div>
      </div>
    );
  }

  const cats = dist.spesialisasi.map((cid) => findCategory(cid)).filter((c) => !!c);
  // strip non-digits for tel: and wa.me URIs
  const digits = dist.telepon.replace(/\D/g, "");
  const waNumber = digits.startsWith("0") ? "62" + digits.slice(1) : digits;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title={dist.nama}
        subtitle={dist.kontakNama}
        back="/pemilik/distributor"
        variant="accent"
      />

      <div className="flex-1 overflow-auto pb-8">
        {/* Contact actions */}
        <section className="bg-white p-4 border-b border-[var(--border)]">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${digits}`}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] font-semibold text-white active:scale-[0.98] hover:brightness-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Telepon
            </a>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-semibold text-white active:scale-[0.98] hover:brightness-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.49 0 .14 5.34.14 11.92c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.65a11.94 11.94 0 0 0 5.76 1.47h.01c6.57 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.17-3.48-8.42zM12.07 21.8a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.74.98 1-3.65-.23-.37a9.83 9.83 0 0 1-1.5-5.26c0-5.46 4.45-9.9 9.9-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15s-.76.97-.93 1.17-.34.22-.64.07c-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51l-.56-.01a1.07 1.07 0 0 0-.78.37c-.27.3-1.03 1-1.03 2.45s1.06 2.85 1.21 3.04c.15.2 2.09 3.18 5.06 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </section>

        {/* Contact info */}
        <section className="p-4">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-[var(--muted-foreground)]">Telepon</span>
              <span className="font-semibold">{dist.telepon}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-[var(--muted-foreground)]">Kontak</span>
              <span>{dist.kontakNama}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-[var(--muted-foreground)]">Alamat</span>
              <span className="break-words">{dist.alamat}</span>
            </div>
            {cats.length > 0 ? (
              <div className="flex gap-2">
                <span className="w-20 shrink-0 text-[var(--muted-foreground)]">Suplai</span>
                <div className="flex flex-wrap gap-1">
                  {cats.map((c) => (
                    <span
                      key={c!.id}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        c!.warna,
                      )}
                    >
                      {c!.ikon} {c!.nama}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {dist.catatan ? (
              <div className="mt-2 rounded-xl bg-[var(--muted)] p-3 text-xs italic text-[var(--muted-foreground)]">
                "{dist.catatan}"
              </div>
            ) : null}
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Total belanja
            </div>
            <div className="mt-1 text-xl font-bold text-[var(--primary)]">
              {rupiah(stats.totalSpent)}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Jumlah pembelian
            </div>
            <div className="mt-1 text-xl font-bold">{stats.count}</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Pembelian terakhir
            </div>
            <div className="mt-1 text-base font-semibold">
              {stats.lastDate
                ? stats.lastDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                : "—"}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Jenis barang
            </div>
            <div className="mt-1 text-xl font-bold">{stats.uniqueItems}</div>
          </div>
        </section>

        {/* Top items */}
        {stats.topVariantIds.length > 0 ? (
          <section className="p-4">
            <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
              BARANG YANG SERING DIBELI
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.topVariantIds.map((vid) => {
                const v = findVariant(vid);
                if (!v) return null;
                return (
                  <span
                    key={vid}
                    className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm"
                  >
                    <span aria-hidden>{v.emoji}</span>
                    {v.namaPendek}
                  </span>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Record purchase CTA */}
        <section className="px-4">
          <Link
            href={`/pemilik/pembelian/baru?distributor=${dist.id}`}
            className="flex h-[64px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] text-white text-lg font-semibold hover:brightness-110 active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Catat Pembelian dari {dist.kontakNama}
          </Link>
        </section>

        {/* Purchase history grouped by month */}
        <section className="p-4 space-y-5">
          <div className="text-sm font-semibold text-[var(--muted-foreground)]">
            RIWAYAT PEMBELIAN ({purchases.length})
          </div>
          {grouped.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[var(--muted-foreground)]">
              Belum ada pembelian dari distributor ini.
            </div>
          ) : (
            grouped.map(([month, list]) => {
              const monthTotal = list.reduce((s, p) => s + p.total, 0);
              return (
                <div key={month}>
                  <div className="mb-2 flex items-baseline justify-between px-1">
                    <div className="text-sm font-semibold text-[var(--muted-foreground)]">
                      {fmtMonth(month)}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {list.length} pembelian · {rupiah(monthTotal)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {list.map((p) => {
                      const totalQty = p.items.reduce((s, it) => s + it.qty, 0);
                      return (
                        <div
                          key={p.id}
                          className="rounded-2xl border border-[var(--border)] bg-white p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-bold">{p.nomor}</div>
                              <div className="text-xs text-[var(--muted-foreground)]">
                                {fmtDate(p.tanggal)} · {fmtTime(p.tanggal)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-[var(--primary)]">
                                {rupiah(p.total)}
                              </div>
                              <div className="text-xs text-[var(--muted-foreground)]">
                                {totalQty} unit · {p.items.length} jenis
                              </div>
                            </div>
                          </div>
                          <ul className="mt-2 space-y-1 border-t border-dashed border-[var(--border)] pt-2 text-sm">
                            {p.items.map((it, i) => {
                              const v = findVariant(it.variantId);
                              const u = findUnit(it.unitId);
                              if (!v) return null;
                              return (
                                <li key={i} className="flex justify-between gap-2">
                                  <span className="truncate">
                                    {v.namaPendek}
                                  </span>
                                  <span className="shrink-0 text-[var(--muted-foreground)]">
                                    {it.qty} {u?.singkatan ?? it.unitId} × {rupiah(it.hargaSatuan)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
