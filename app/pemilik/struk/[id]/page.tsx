"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findUnit, findVariant } from "@/lib/fake-data";
import { rupiah, waktu } from "@/lib/format";
import { BigButton } from "@/components/BigButton";

interface StrukLine {
  variantId: string;
  unitId: string;
  qty: number;
  hargaAsli: number;
  hargaNego: number;
  adjusted: boolean;
}

interface Snapshot {
  orderId: string;
  nomor: string;
  kasirNama: string;
  approvedAt: string;
  lines: StrukLine[];
  subtotalAsli: number;
  subtotalNego: number;
  potongan: number;
  totalAkhir: number;
  catatan: string;
}

export default function PemilikStrukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [snap, setSnap] = useState<Snapshot | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(`toko-demo-pemilik-struk-${id}`);
    if (!raw) { setSnap(null); return; }
    try {
      setSnap(JSON.parse(raw) as Snapshot);
    } catch {
      setSnap(null);
    }
  }, [id]);

  if (snap === undefined) return null;

  if (snap === null) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-3 text-6xl">🔍</div>
        <div className="mb-2 text-xl font-semibold">Struk tidak ditemukan</div>
        <p className="mb-6 text-[var(--muted-foreground)]">
          Buka pesanan dulu dan setujui untuk membuat struk.
        </p>
        <BigButton variant="primary" onClick={() => router.push("/pemilik")}>
          Kembali ke Dashboard
        </BigButton>
      </div>
    );
  }

  const adaNego =
    snap.lines.some((l) => l.adjusted) || snap.potongan > 0;
  const hemat = snap.subtotalAsli - snap.totalAkhir;
  const approved = new Date(snap.approvedAt);

  return (
    <div className="flex flex-1 flex-col">
      {/* Non-print toolbar */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-white px-4 py-3">
        <button
          onClick={() => router.push("/pemilik")}
          className="flex h-11 items-center gap-2 rounded-full px-3 text-[var(--foreground)] hover:bg-[var(--muted)]"
        >
          ← Dashboard
        </button>
        <button
          onClick={() => window.print()}
          className="flex h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-white font-semibold hover:brightness-110"
        >
          🖨️ Cetak Struk
        </button>
      </div>

      {/* Approved banner (not shown in print) */}
      {adaNego ? (
        <div className="no-print bg-[var(--accent)] p-3 text-center font-semibold text-white">
          ✓ Disetujui dengan harga nego · Pembeli hemat {rupiah(hemat)}
        </div>
      ) : (
        <div className="no-print bg-[var(--primary)] p-3 text-center font-semibold text-white">
          ✓ Disetujui dengan harga normal
        </div>
      )}

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
            <span>{snap.nomor}</span>
            <span>{waktu(approved)} — {approved.toLocaleDateString("id-ID")}</span>
          </div>
          <div className="mb-1 text-xs text-[var(--muted-foreground)]">
            Kasir: {snap.kasirNama}
          </div>
          <div className="mb-2 border-t border-dashed border-[var(--border)]" />

          <table className="w-full">
            <tbody>
              {snap.lines.map((l, i) => {
                const v = findVariant(l.variantId);
                const u = findUnit(l.unitId);
                if (!v) return null;
                return (
                  <tr key={i} className="align-top">
                    <td className="py-1">
                      <div className="font-medium">{v.namaPendek}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">
                        {l.qty} {u?.singkatan ?? l.unitId} × {rupiah(l.hargaNego)}
                        {l.adjusted ? (
                          <span className="ml-1 text-[var(--accent)]">
                            (nego, dari {rupiah(l.hargaAsli)})
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-1 text-right">
                      {l.adjusted ? (
                        <>
                          <div className="text-xs text-[var(--muted-foreground)] line-through">
                            {rupiah(l.hargaAsli * l.qty)}
                          </div>
                          <div>{rupiah(l.hargaNego * l.qty)}</div>
                        </>
                      ) : (
                        rupiah(l.hargaNego * l.qty)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-2 border-t border-dashed border-[var(--border)]" />

          <div className="space-y-1">
            {adaNego ? (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--muted-foreground)]">Subtotal asli</span>
                <span className="text-[var(--muted-foreground)] line-through">
                  {rupiah(snap.subtotalAsli)}
                </span>
              </div>
            ) : null}
            {snap.subtotalNego !== snap.subtotalAsli ? (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--muted-foreground)]">Setelah nego</span>
                <span>{rupiah(snap.subtotalNego)}</span>
              </div>
            ) : null}
            {snap.potongan > 0 ? (
              <div className="flex justify-between text-xs text-[var(--accent)]">
                <span>Potongan</span>
                <span>− {rupiah(snap.potongan)}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-2 flex justify-between border-t border-dashed border-[var(--border)] pt-2 text-base font-bold">
            <span>TOTAL</span>
            <span>{rupiah(snap.totalAkhir)}</span>
          </div>

          {hemat > 0 ? (
            <div className="mt-1 text-right text-xs text-[var(--accent)]">
              HEMAT {rupiah(hemat)}
            </div>
          ) : null}

          {snap.catatan.trim() ? (
            <div className="mt-3 rounded border border-dashed border-[var(--border)] p-2 text-xs">
              <div className="font-semibold text-[var(--muted-foreground)]">Catatan:</div>
              <div>{snap.catatan}</div>
            </div>
          ) : null}

          <div className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
            Terima kasih · Simpan struk untuk penukaran
          </div>
        </div>
      </div>

      <div className="no-print p-4 grid grid-cols-2 gap-3">
        <BigButton variant="outline" onClick={() => router.push(`/pemilik/pesanan/${snap.orderId}`)}>
          Edit lagi
        </BigButton>
        <BigButton variant="primary" onClick={() => router.push("/pemilik")}>
          Selesai
        </BigButton>
      </div>
    </div>
  );
}
