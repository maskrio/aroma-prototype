"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import {
  fakeOrders,
  findUnit,
  findVariant,
  hargaUntuk,
} from "@/lib/fake-data";
import { rupiah, waktuLalu } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function PesananDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const order = fakeOrders.find((o) => o.id === id);

  const [status, setStatus] = useState<"PENDING" | "CONFIRMED" | "CANCELLED">(
    order?.status ?? "PENDING",
  );
  const [negoMode, setNegoMode] = useState(false);
  // Map of line index -> overridden unit price (pengganti harga satuan).
  const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({});
  const [potongan, setPotongan] = useState(0);
  const [catatan, setCatatan] = useState("");

  if (!order) {
    return (
      <div className="flex flex-1 flex-col">
        <TopBar title="Tidak ditemukan" back="/pemilik" variant="accent" />
        <div className="p-6 text-center text-[var(--muted-foreground)]">
          Pesanan tidak ditemukan.
        </div>
      </div>
    );
  }

  const lines = order.items.map((it, i) => {
    const v = findVariant(it.variantId)!;
    const u = findUnit(it.unitId);
    const hargaAsli = hargaUntuk(v, it.unitId);
    const hargaNego =
      priceOverrides[i] !== undefined ? priceOverrides[i] : hargaAsli;
    return {
      ...it,
      variant: v,
      unit: u,
      hargaAsli,
      hargaNego,
      adjusted: hargaNego !== hargaAsli,
      subtotalAsli: hargaAsli * it.qty,
      subtotalNego: hargaNego * it.qty,
    };
  });

  const totalItems = lines.reduce((s, l) => s + l.qty, 0);
  const subtotalAsli = lines.reduce((s, l) => s + l.subtotalAsli, 0);
  const subtotalNego = lines.reduce((s, l) => s + l.subtotalNego, 0);
  const totalAkhir = Math.max(0, subtotalNego - potongan);
  const hemat = subtotalAsli - totalAkhir;
  const adaPerubahan =
    Object.keys(priceOverrides).length > 0 || potongan > 0 || catatan.trim() !== "";

  function updatePrice(i: number, value: string) {
    const n = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(n)) {
      resetPrice(i);
      return;
    }
    setPriceOverrides((p) => ({ ...p, [i]: n }));
  }
  function resetPrice(i: number) {
    setPriceOverrides((p) => {
      const next = { ...p };
      delete next[i];
      return next;
    });
  }

  function handleConfirm() {
    setStatus("CONFIRMED");
    // Snapshot to sessionStorage for the receipt screen.
    const snapshot = {
      orderId: order!.id,
      nomor: order!.nomor,
      kasirNama: order!.kasirNama,
      approvedAt: new Date().toISOString(),
      lines: lines.map((l) => ({
        variantId: l.variantId,
        unitId: l.unitId,
        qty: l.qty,
        hargaAsli: l.hargaAsli,
        hargaNego: l.hargaNego,
        adjusted: l.adjusted,
      })),
      subtotalAsli,
      subtotalNego,
      potongan,
      totalAkhir,
      catatan,
    };
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        `toko-demo-pemilik-struk-${id}`,
        JSON.stringify(snapshot),
      );
    }
    setTimeout(() => router.push(`/pemilik/struk/${id}`), 400);
  }

  function handleCancel() {
    if (!confirm("Batalkan pesanan ini? Kasir akan diberitahu.")) return;
    setStatus("CANCELLED");
    setTimeout(() => router.push("/pemilik"), 700);
  }

  function resetSemua() {
    setPriceOverrides({});
    setPotongan(0);
    setCatatan("");
  }

  const banner =
    status === "CONFIRMED"
      ? {
          cls: "bg-[var(--primary)] text-white",
          text: "✓ Disetujui. Membuka struk…",
        }
      : status === "CANCELLED"
      ? { cls: "bg-[var(--destructive)] text-white", text: "✕ Pesanan dibatalkan." }
      : null;

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <TopBar
        title={`Pesanan ${order.nomor}`}
        subtitle={`${order.kasirNama} · ${waktuLalu(order.waktu)}`}
        back="/pemilik"
        variant="accent"
      />

      {banner ? (
        <div className={cn("p-3 text-center font-semibold", banner.cls)}>
          {banner.text}
        </div>
      ) : null}

      <div className="flex-1 overflow-auto p-4 pb-40 space-y-4">
        {/* Nego toggle */}
        {status === "PENDING" ? (
          <div className="rounded-2xl border-2 border-[var(--border)] bg-white p-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={negoMode}
                onChange={(e) => {
                  setNegoMode(e.target.checked);
                  if (!e.target.checked) resetSemua();
                }}
                className="h-6 w-6 accent-[var(--accent)]"
              />
              <div className="flex-1">
                <div className="font-semibold">
                  💬 Mode Nego
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  Ubah harga kalau pembeli nawar. Struk akan pakai harga baru.
                </div>
              </div>
            </label>
          </div>
        ) : null}

        {/* Lines */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-3 text-sm font-semibold text-[var(--muted-foreground)]">
            RINCIAN ({totalItems} item)
          </div>
          <ul className="space-y-3">
            {lines.map((l, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl",
                    l.variant.warnaBg,
                  )}
                  aria-hidden
                >
                  {l.variant.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{l.variant.namaPendek}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    {l.qty} {l.unit?.singkatan ?? l.unitId} × {" "}
                    {l.adjusted ? (
                      <span>
                        <span className="line-through">
                          {rupiah(l.hargaAsli)}
                        </span>{" "}
                        <span className="font-semibold text-[var(--accent)]">
                          {rupiah(l.hargaNego)}
                        </span>
                      </span>
                    ) : (
                      <span>{rupiah(l.hargaAsli)}</span>
                    )}
                  </div>

                  {negoMode ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[var(--muted-foreground)]">
                        Harga / {l.unit?.singkatan ?? l.unitId}:
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Rp</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={
                            priceOverrides[i] !== undefined
                              ? priceOverrides[i]
                              : l.hargaAsli
                          }
                          onChange={(e) => updatePrice(i, e.target.value)}
                          className={cn(
                            "h-10 w-28 rounded-lg border-2 bg-white px-2 text-right text-base font-semibold outline-none focus:border-[var(--accent)]",
                            l.adjusted
                              ? "border-[var(--accent)]"
                              : "border-[var(--border)]",
                          )}
                        />
                      </div>
                      {l.adjusted ? (
                        <button
                          onClick={() => resetPrice(i)}
                          className="h-10 rounded-lg px-2 text-xs font-semibold text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                        >
                          ↺ Kembalikan
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="shrink-0 text-right">
                  {l.adjusted ? (
                    <>
                      <div className="text-xs text-[var(--muted-foreground)] line-through">
                        {rupiah(l.subtotalAsli)}
                      </div>
                      <div className="font-bold text-[var(--accent)]">
                        {rupiah(l.subtotalNego)}
                      </div>
                    </>
                  ) : (
                    <div className="font-bold text-[var(--primary)]">
                      {rupiah(l.subtotalNego)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Overall discount + note — visible in nego mode */}
        {negoMode ? (
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4 space-y-4">
            <div>
              <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
                POTONGAN KESELURUHAN
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={potongan}
                  onChange={(e) => {
                    const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                    setPotongan(isNaN(n) ? 0 : n);
                  }}
                  className="h-12 flex-1 rounded-lg border-2 border-[var(--border)] bg-white px-3 text-right text-lg font-semibold outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[2000, 5000, 10000, 20000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setPotongan((p) => p + v)}
                    className="h-9 rounded-full bg-[var(--muted)] px-3 text-sm font-semibold hover:bg-slate-200"
                  >
                    + {rupiah(v)}
                  </button>
                ))}
                <button
                  onClick={() => {
                    // Round down to nearest 5000.
                    const rounded = Math.floor(subtotalNego / 5000) * 5000;
                    setPotongan(Math.max(0, subtotalNego - rounded));
                  }}
                  className="h-9 rounded-full bg-[var(--muted)] px-3 text-sm font-semibold hover:bg-slate-200"
                >
                  Bulatkan ↓
                </button>
                <button
                  onClick={() => setPotongan(0)}
                  className="h-9 rounded-full bg-[var(--muted)] px-3 text-sm font-semibold hover:bg-slate-200"
                >
                  ✕ Hapus
                </button>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
                CATATAN (opsional)
              </div>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={2}
                placeholder="Contoh: pelanggan tetap, minta diskon"
                className="w-full rounded-lg border-2 border-[var(--border)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        ) : null}

        {/* Summary */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Subtotal harga asli</span>
              <span className={adaPerubahan ? "text-[var(--muted-foreground)] line-through" : ""}>
                {rupiah(subtotalAsli)}
              </span>
            </div>
            {Object.keys(priceOverrides).length > 0 ? (
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Subtotal setelah nego</span>
                <span>{rupiah(subtotalNego)}</span>
              </div>
            ) : null}
            {potongan > 0 ? (
              <div className="flex justify-between text-[var(--accent)]">
                <span>Potongan</span>
                <span>− {rupiah(potongan)}</span>
              </div>
            ) : null}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
            <div className="text-lg font-semibold">Total bayar</div>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {rupiah(totalAkhir)}
            </div>
          </div>
          {hemat > 0 ? (
            <div className="mt-1 text-right text-sm text-[var(--accent)]">
              Pembeli hemat {rupiah(hemat)}
            </div>
          ) : null}
        </div>
      </div>

      {status === "PENDING" ? (
        <div className="no-print sticky bottom-0 z-10 border-t border-[var(--border)] bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-3 gap-3">
            <BigButton variant="danger" size="lg" onClick={handleCancel} className="col-span-1">
              Batal
            </BigButton>
            <BigButton variant="primary" size="lg" onClick={handleConfirm} className="col-span-2">
              {adaPerubahan ? "Setujui & Cetak" : "Setujui"} — {rupiah(totalAkhir)}
            </BigButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
