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
      <div className="flex flex-1 flex-col">
        <TopBar title="Keranjang" back="/kasir" />
      </div>
    );
  }

  function handleKirim() {
    // Push to waiting screen — owner will confirm there (simulated).
    router.push("/kasir/tunggu");
  }

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
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
          <div className="flex-1 overflow-auto p-4 pb-40">
            <div className="space-y-3">
              {lines.map((line) => {
                const u = findUnit(line.unitId);
                return (
                  <div
                    key={`${line.variantId}-${line.unitId}`}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-3"
                  >
                    <div
                      className={cn(
                        "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl",
                        line.variant.warnaBg,
                      )}
                      aria-hidden
                    >
                      {line.variant.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">
                        {line.variant.namaPendek}
                      </div>
                      <div className="text-sm text-[var(--muted-foreground)]">
                        {rupiah(line.hargaSatuan)} / {u?.singkatan ?? line.unitId}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QtyStepper
                          value={line.qty}
                          onChange={(n) => setQty(line.variantId, line.unitId, n)}
                          size="md"
                        />
                        <div className="text-right">
                          <div className="text-lg font-bold text-[var(--primary)]">
                            {rupiah(line.subtotal)}
                          </div>
                          <button
                            onClick={() => remove(line.variantId, line.unitId)}
                            className="text-xs text-[var(--destructive)] hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky summary + submit */}
          <div className="no-print sticky bottom-0 z-10 border-t border-[var(--border)] bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
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
