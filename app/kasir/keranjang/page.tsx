"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { QtyStepper } from "@/components/QtyStepper";
import { useCart } from "@/lib/cart";
import { findUnit } from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function KeranjangPage() {
  const router = useRouter();
  const { lines, ready, totalHarga, totalItems, setQty, remove, clear } = useCart();

  if (!ready) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title="Keranjang" back="/kasir" />
      </div>
    );
  }

  function handleKirim() {
    router.push("/kasir/tunggu");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Keranjang"
        subtitle={totalItems > 0 ? `${totalItems} item` : "Belum ada barang"}
        back="/kasir"
        right={
          lines.length > 0 ? (
            <button
              onClick={() => {
                if (confirm("Kosongkan semua barang di keranjang?")) clear();
              }}
              className="text-sm text-white/90 underline"
            >
              Kosongkan
            </button>
          ) : null
        }
      />

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-3 text-6xl">🛒</div>
          <div className="mb-2 text-xl font-semibold">Keranjang kosong</div>
          <div className="mb-6 text-[var(--muted-foreground)]">
            Tambahkan barang dari daftar jualan dulu.
          </div>
          <Link
            href="/kasir"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--primary)] px-6 text-lg font-semibold text-white"
          >
            Kembali ke Jualan
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto p-4">
            <ul className="space-y-3">
              {lines.map((line) => {
                const u = findUnit(line.unitId);
                return (
                  <li
                    key={`${line.variantId}-${line.unitId}`}
                    className="rounded-2xl border border-[var(--border)] bg-white p-3"
                  >
                    {/* Row 1: image + name + remove */}
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl",
                          line.variant.warnaBg,
                        )}
                        aria-hidden
                      >
                        {line.variant.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-2 font-semibold leading-snug break-words">
                          {line.variant.namaPendek}
                        </div>
                        <div className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                          {rupiah(line.hargaSatuan)} / {u?.singkatan ?? line.unitId}
                        </div>
                      </div>
                      <button
                        onClick={() => remove(line.variantId, line.unitId)}
                        aria-label="Hapus dari keranjang"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--destructive)] hover:bg-red-50"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        </svg>
                      </button>
                    </div>

                    {/* Row 2: stepper + subtotal */}
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-dashed border-[var(--border)] pt-3">
                      <QtyStepper
                        value={line.qty}
                        onChange={(n) => setQty(line.variantId, line.unitId, n)}
                        size="md"
                      />
                      <div className="min-w-0 text-right">
                        <div className="text-xs text-[var(--muted-foreground)]">Subtotal</div>
                        <div className="truncate text-xl font-bold text-[var(--primary)]">
                          {rupiah(line.subtotal)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom summary + submit */}
          <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-[var(--muted-foreground)]">
                Total ({totalItems} item)
              </div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {rupiah(totalHarga)}
              </div>
            </div>
            <BigButton variant="primary" onClick={handleKirim}>
              Kirim ke Pemilik →
            </BigButton>
            <div className="mt-2 text-center text-xs text-[var(--muted-foreground)]">
              Pemilik akan setuju di HP-nya dalam beberapa detik.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
