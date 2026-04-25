"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { QtyStepper } from "@/components/QtyStepper";
import {
  distributors,
  findCategory,
  findDistributor,
  findUnit,
  findVariant,
  searchVariants,
  type Variant,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Line {
  variantId: string;
  qty: number;
  unitId: string;
  hargaSatuan: number;
}

export default function PembelianBaruPage() {
  return (
    <Suspense fallback={null}>
      <PembelianBaruInner />
    </Suspense>
  );
}

function PembelianBaruInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("distributor");

  const [distributorId, setDistributorId] = useState<string | null>(preselected);
  const [showPicker, setShowPicker] = useState(!preselected);
  const [items, setItems] = useState<Line[]>([]);
  const [itemQuery, setItemQuery] = useState("");
  const [catatan, setCatatan] = useState("");
  const [saved, setSaved] = useState(false);

  const dist = distributorId ? findDistributor(distributorId) : null;
  const itemResults = useMemo(
    () => (itemQuery.trim() ? searchVariants(itemQuery).slice(0, 6) : []),
    [itemQuery],
  );

  function pickDistributor(id: string) {
    setDistributorId(id);
    setShowPicker(false);
  }

  function addItem(v: Variant) {
    // Default to first bulk-friendly unit if available, else the first listed.
    const bulk = v.harga.find((p) => ["pak", "bal", "bak"].includes(p.unitId));
    const priceRow = bulk ?? v.harga[0];
    // Suggest a buy price ~ 78% of sell price (rounded to 100).
    const suggested = priceRow ? Math.round((priceRow.harga * 0.78) / 100) * 100 : 0;
    setItems((arr) => [
      ...arr,
      {
        variantId: v.id,
        qty: 1,
        unitId: priceRow?.unitId ?? "pcs",
        hargaSatuan: suggested,
      },
    ]);
    setItemQuery("");
  }

  function updateLine(i: number, patch: Partial<Line>) {
    setItems((arr) => arr.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function removeLine(i: number) {
    setItems((arr) => arr.filter((_, idx) => idx !== i));
  }

  const total = items.reduce((s, l) => s + l.hargaSatuan * l.qty, 0);
  const valid = !!distributorId && items.length > 0 && total > 0;

  function handleSave() {
    if (!valid) return;
    setSaved(true);
    setTimeout(
      () => router.push(`/pemilik/distributor/${distributorId}`),
      900,
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Catat Pembelian"
        subtitle={dist?.nama ?? "Pilih distributor"}
        back={preselected ? `/pemilik/distributor/${preselected}` : "/pemilik/distributor"}
        variant="accent"
      />

      {saved ? (
        <div className="bg-[var(--primary)] p-3 text-center font-semibold text-white">
          ✓ Pembelian dicatat (simulasi)
        </div>
      ) : null}

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Distributor section */}
        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            DISTRIBUTOR
          </div>
          {dist && !showPicker ? (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold leading-snug">{dist.nama}</div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  {dist.kontakNama} · {dist.telepon}
                </div>
              </div>
              <button
                onClick={() => setShowPicker(true)}
                className="shrink-0 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                Ganti
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {distributors.map((d) => {
                const cats = d.spesialisasi
                  .map((id) => findCategory(id))
                  .filter((c) => !!c);
                return (
                  <button
                    key={d.id}
                    onClick={() => pickDistributor(d.id)}
                    className="block w-full rounded-xl border-2 border-[var(--border)] bg-white p-3 text-left transition active:scale-[0.99] hover:border-[var(--accent)]"
                  >
                    <div className="font-semibold leading-snug">{d.nama}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {d.kontakNama} · {d.telepon}
                    </div>
                    {cats.length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1">
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
                  </button>
                );
              })}
              <Link
                href="/pemilik/distributor/baru"
                className="block rounded-xl border-2 border-dashed border-[var(--border)] bg-white p-3 text-center text-sm font-semibold text-[var(--accent)] hover:border-[var(--accent)]"
              >
                + Tambah Distributor Baru
              </Link>
            </div>
          )}
        </section>

        {/* Items section */}
        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            BARANG ({items.length})
          </div>

          {items.length > 0 ? (
            <ul className="mb-3 space-y-2">
              {items.map((line, i) => {
                const v = findVariant(line.variantId);
                if (!v) return null;
                const subtotal = line.hargaSatuan * line.qty;
                return (
                  <li
                    key={i}
                    className="rounded-xl border border-[var(--border)] p-3"
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
                        <div className="line-clamp-2 font-semibold leading-snug">
                          {v.namaPendek}
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {v.brand}
                        </div>
                      </div>
                      <button
                        onClick={() => removeLine(i)}
                        aria-label="Hapus"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--destructive)] hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase text-[var(--muted-foreground)]">
                          Satuan
                        </div>
                        <select
                          value={line.unitId}
                          onChange={(e) => updateLine(i, { unitId: e.target.value })}
                          className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-white px-2 text-sm font-semibold"
                        >
                          {v.harga.map((p) => {
                            const u = findUnit(p.unitId);
                            return (
                              <option key={p.unitId} value={p.unitId}>
                                {u?.nama ?? p.unitId}
                                {p.konversi > 1 ? ` (${p.konversi} pcs)` : ""}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-[var(--muted-foreground)]">
                          Qty
                        </div>
                        <div className="mt-1">
                          <QtyStepper
                            value={line.qty}
                            onChange={(n) => updateLine(i, { qty: n })}
                            size="md"
                          />
                        </div>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <div className="text-[10px] font-bold uppercase text-[var(--muted-foreground)]">
                          Harga beli / satuan
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-sm">Rp</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={line.hargaSatuan}
                            onChange={(e) => {
                              const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                              updateLine(i, { hargaSatuan: isNaN(n) ? 0 : n });
                            }}
                            className="h-10 min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-white px-2 text-right text-sm font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex justify-between border-t border-dashed border-[var(--border)] pt-2 text-sm">
                      <span className="text-[var(--muted-foreground)]">Subtotal</span>
                      <span className="font-bold text-[var(--primary)]">
                        {rupiah(subtotal)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mb-3 rounded-xl bg-[var(--muted)] p-4 text-center text-sm text-[var(--muted-foreground)]">
              Belum ada barang. Cari di bawah untuk menambah.
            </div>
          )}

          {/* Add item search */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white px-3 focus-within:border-[var(--primary)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--muted-foreground)]">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                value={itemQuery}
                onChange={(e) => setItemQuery(e.target.value)}
                placeholder="Cari barang untuk ditambah…"
                className="h-12 min-w-0 w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>
            {itemResults.length > 0 ? (
              <ul className="space-y-1">
                {itemResults.map((v) => (
                  <li key={v.id}>
                    <button
                      onClick={() => addItem(v)}
                      className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-2 text-left transition active:scale-[0.99] hover:border-[var(--primary)]"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl",
                          v.warnaBg,
                        )}
                      >
                        {v.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-1 text-sm font-semibold">
                          {v.namaPendek}
                        </div>
                        <div className="truncate text-xs text-[var(--muted-foreground)]">
                          {v.brand}
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-[var(--primary)]">
                        + Tambah
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : itemQuery ? (
              <div className="rounded-xl bg-[var(--muted)] p-3 text-center text-xs text-[var(--muted-foreground)]">
                Tidak ada hasil untuk "{itemQuery}".
              </div>
            ) : null}
          </div>
        </section>

        {/* Catatan */}
        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            CATATAN (opsional)
          </div>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={2}
            placeholder="Contoh: bayar tempo 2 minggu, antar besok pagi"
            className="w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--accent)]"
          />
        </section>

        {/* Summary */}
        {items.length > 0 ? (
          <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-semibold text-[var(--muted-foreground)]">
                Total belanja
              </div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {rupiah(total)}
              </div>
            </div>
            <div className="mt-1 text-xs text-[var(--muted-foreground)]">
              {items.length} jenis barang ·{" "}
              {items.reduce((s, l) => s + l.qty, 0)} unit
            </div>
          </section>
        ) : null}
      </div>

      <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4">
        <BigButton variant="primary" disabled={!valid} onClick={handleSave}>
          {valid
            ? `Simpan Pembelian — ${rupiah(total)}`
            : !distributorId
            ? "Pilih distributor dulu"
            : "Tambah barang dulu"}
        </BigButton>
      </div>
    </div>
  );
}
