"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { QtyStepper } from "@/components/QtyStepper";
import { BigButton } from "@/components/BigButton";
import { findVariant, findUnit, hargaUntuk } from "@/lib/fake-data";
import { useCart } from "@/lib/cart";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ProdukDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const variant = findVariant(id);
  const { add } = useCart();

  const defaultUnit = variant?.harga[0]?.unitId ?? "pcs";
  const [unitId, setUnitId] = useState(defaultUnit);
  const [qty, setQty] = useState(1);

  if (!variant) {
    return (
      <div className="flex flex-1 flex-col">
        <TopBar title="Tidak ditemukan" back="/kasir" />
        <div className="p-6 text-center text-[var(--muted-foreground)]">
          Barang tidak ditemukan.
        </div>
      </div>
    );
  }

  const harga = hargaUntuk(variant, unitId);
  const subtotal = harga * qty;
  const unit = findUnit(unitId);

  function handleTambah() {
    add(variant!.id, unitId, qty);
    router.push("/kasir/keranjang");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar title={variant.namaPendek} subtitle={variant.brand} back="/kasir" />

      <div className="flex-1 overflow-auto p-4">
        <div
          className={cn(
            "mb-4 flex h-48 items-center justify-center rounded-2xl text-7xl",
            variant.warnaBg,
          )}
          aria-hidden
        >
          {variant.emoji}
        </div>

        <h1 className="text-xl font-bold leading-snug">{variant.nama}</h1>
        <div className="mt-1 text-sm text-[var(--muted-foreground)]">
          {variant.brand} · Stok: {variant.stok} pcs
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            PILIH SATUAN
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {variant.harga.map((h) => {
              const u = findUnit(h.unitId);
              const active = unitId === h.unitId;
              return (
                <button
                  key={h.unitId}
                  onClick={() => setUnitId(h.unitId)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-3 transition active:scale-[0.97]",
                    active
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] bg-white text-[var(--foreground)]",
                  )}
                >
                  <div className="text-lg font-bold">
                    {u?.nama ?? h.unitId}
                  </div>
                  <div className={cn("text-sm", active ? "text-white/90" : "text-[var(--muted-foreground)]")}>
                    {h.konversi > 1 ? `= ${h.konversi} pcs` : ""}
                  </div>
                  <div className="mt-1 text-base font-bold">
                    {rupiah(h.harga)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            JUMLAH
          </div>
          <div className="flex items-center justify-between gap-4">
            <QtyStepper value={qty} onChange={setQty} size="lg" />
            <div className="text-right">
              <div className="text-xs text-[var(--muted-foreground)]">Subtotal</div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {rupiah(subtotal)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <BigButton
          variant="primary"
          onClick={handleTambah}
          leading={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          }
        >
          Tambah {qty} {unit?.singkatan ?? unitId} · {rupiah(subtotal)}
        </BigButton>
      </div>
    </div>
  );
}
