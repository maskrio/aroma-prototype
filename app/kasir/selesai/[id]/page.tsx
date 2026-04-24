"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BigButton } from "@/components/BigButton";
import { findUnit, findVariant, hargaUntuk } from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import type { CartItem } from "@/lib/cart";

export default function SelesaiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [items, setItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(`toko-demo-order-${id}`);
    try {
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      setItems(parsed);
    } catch {
      setItems([]);
    }
  }, [id]);

  if (items === null) return null;

  const lines = items
    .map((it) => {
      const v = findVariant(it.variantId);
      if (!v) return null;
      const harga = hargaUntuk(v, it.unitId);
      return { ...it, variant: v, harga, subtotal: harga * it.qty };
    })
    .filter((l): l is NonNullable<typeof l> => !!l);

  const totalHarga = lines.reduce((s, l) => s + l.subtotal, 0);
  const totalItems = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <div className="flex flex-1 flex-col items-center p-6 pt-8 text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)] text-5xl text-white shadow-lg">
          ✓
        </div>
        <h1 className="mb-1 text-2xl font-bold">Pesanan disetujui!</h1>
        <p className="mb-6 text-[var(--muted-foreground)]">
          Pemilik sudah setuju. Cetak struk untuk pembeli.
        </p>

        <div className="mb-6 w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-4 text-left">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-[var(--muted-foreground)]">
              Ringkasan
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">#{id}</div>
          </div>
          <ul className="space-y-1 text-sm">
            {lines.map((l, i) => {
              const u = findUnit(l.unitId);
              return (
                <li key={i} className="flex justify-between gap-2">
                  <span className="truncate">
                    {l.variant.namaPendek} × {l.qty} {u?.singkatan ?? l.unitId}
                  </span>
                  <span className="shrink-0">{rupiah(l.subtotal)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
            <div className="font-semibold">Total ({totalItems} item)</div>
            <div className="text-xl font-bold text-[var(--primary)]">
              {rupiah(totalHarga)}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3">
          <Link
            href={`/kasir/struk/${id}`}
            className="flex h-[72px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] text-xl font-semibold text-white hover:brightness-110 active:scale-[0.98]"
          >
            🧾 Lihat Struk
          </Link>
          <BigButton variant="outline" onClick={() => router.replace("/kasir")}>
            Kembali Jualan
          </BigButton>
        </div>
      </div>
    </div>
  );
}
