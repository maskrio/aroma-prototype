"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findUnit, findVariant, hargaUntuk } from "@/lib/fake-data";
import { rupiah, waktu } from "@/lib/format";
import type { CartItem } from "@/lib/cart";
import { BigButton } from "@/components/BigButton";

export default function StrukPage({
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
      setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
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

  const now = new Date();

  return (
    <div className="flex flex-1 flex-col">
      {/* Non-print toolbar */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-white px-4 py-3">
        <button
          onClick={() => router.back()}
          className="flex h-11 items-center gap-2 rounded-full px-3 text-[var(--foreground)] hover:bg-[var(--muted)]"
        >
          ← Kembali
        </button>
        <button
          onClick={() => window.print()}
          className="flex h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-white font-semibold hover:brightness-110"
        >
          🖨️ Cetak
        </button>
      </div>

      {/* Receipt paper */}
      <div className="flex flex-1 justify-center bg-[var(--muted)] p-4 print:bg-white print:p-0">
        <div className="w-full max-w-sm rounded-xl bg-white p-5 text-sm shadow-sm print:shadow-none print:rounded-none print:max-w-none">
          <div className="mb-3 text-center">
            <div className="text-lg font-bold">TOKO DEMO</div>
            <div className="text-xs text-[var(--muted-foreground)]">
              Jl. Contoh No. 123 · Prototipe
            </div>
          </div>
          <div className="mb-3 flex justify-between text-xs text-[var(--muted-foreground)]">
            <span>#{id}</span>
            <span>{waktu(now)} — {now.toLocaleDateString("id-ID")}</span>
          </div>
          <div className="mb-2 border-t border-dashed border-[var(--border)]" />
          <table className="w-full">
            <tbody>
              {lines.map((l, i) => {
                const u = findUnit(l.unitId);
                return (
                  <tr key={i} className="align-top">
                    <td className="py-1">
                      <div className="font-medium">{l.variant.namaPendek}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">
                        {l.qty} {u?.singkatan ?? l.unitId} × {rupiah(l.harga)}
                      </div>
                    </td>
                    <td className="py-1 text-right">{rupiah(l.subtotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="my-2 border-t border-dashed border-[var(--border)]" />
          <div className="flex justify-between text-base font-bold">
            <span>TOTAL</span>
            <span>{rupiah(totalHarga)}</span>
          </div>
          <div className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
            Terima kasih · Simpan struk untuk penukaran
          </div>
        </div>
      </div>

      <div className="no-print p-4">
        <BigButton variant="primary" onClick={() => router.replace("/kasir")}>
          Selesai — Kembali Jualan
        </BigButton>
      </div>
    </div>
  );
}
