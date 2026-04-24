"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { categories, units } from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

// Simple matrix editor: pick one or two "axes" (e.g. Ukuran × Rasa) and
// generate a grid of variants. Prototype simulates the common case.

const PRESET_AXES = [
  { id: "ukuran", label: "Ukuran", options: ["S", "M", "L", "XL"] },
  { id: "rasa", label: "Rasa", options: ["Original", "Keju", "Pedas", "BBQ"] },
  { id: "warna", label: "Warna", options: ["Bening", "Putih", "Hitam"] },
  { id: "kemasan", label: "Kemasan", options: ["Sachet", "Botol", "Pouch"] },
];

export default function KatalogBaruPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nama, setNama] = useState("");
  const [brand, setBrand] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [axisA, setAxisA] = useState<string | null>(null);
  const [axisB, setAxisB] = useState<string | null>(null);
  const [priceGrid, setPriceGrid] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);

  const axesUsed = [axisA, axisB].filter(Boolean) as string[];
  const combos = useMemo(() => {
    const list = axesUsed.map((id) => PRESET_AXES.find((a) => a.id === id)!);
    if (list.length === 0) return [{ label: nama || "Varian tunggal", key: "default" }];
    if (list.length === 1) {
      return list[0].options.map((o) => ({ label: o, key: o }));
    }
    const [a, b] = list;
    return a.options.flatMap((oa) =>
      b.options.map((ob) => ({ label: `${oa} · ${ob}`, key: `${oa}__${ob}` })),
    );
  }, [axesUsed, nama]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/pemilik/katalog"), 800);
  }

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <TopBar
        title="Barang Baru"
        subtitle={`Langkah ${step} dari 3`}
        back="/pemilik/katalog"
        variant="accent"
      />

      {saved ? (
        <div className="bg-[var(--primary)] p-3 text-center font-semibold text-white">
          ✓ {combos.length} varian dibuat (simulasi)
        </div>
      ) : null}

      {/* Step indicator */}
      <div className="flex gap-2 px-4 pt-3">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "h-2 flex-1 rounded-full",
              step >= s ? "bg-[var(--primary)]" : "bg-[var(--muted)]",
            )}
          />
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4 pb-36">
        {step === 1 ? (
          <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-lg font-semibold">1. Info dasar</div>
            <label className="block">
              <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Nama barang</div>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Indomie"
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="block">
              <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Brand</div>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Contoh: Indofood"
                className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--primary)]"
              />
            </label>
            <div>
              <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Kategori</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setKategoriId(c.id)}
                    className={cn(
                      "flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold",
                      kategoriId === c.id
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white border border-[var(--border)]",
                    )}
                  >
                    <span>{c.ikon}</span>
                    <span>{c.nama}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-lg font-semibold">2. Varian (opsional)</div>
            <div className="text-sm text-[var(--muted-foreground)]">
              Kalau barang punya banyak varian (rasa, ukuran, dll), pilih sumbu di bawah.
              Kalau cuma satu varian, lewati saja.
            </div>
            <div>
              <div className="mb-1 text-sm font-semibold">Sumbu A</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAxisA(null)}
                  className={cn(
                    "h-10 rounded-full px-3 text-sm font-semibold",
                    axisA === null ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)]",
                  )}
                >
                  (tidak ada)
                </button>
                {PRESET_AXES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAxisA(a.id)}
                    disabled={axisB === a.id}
                    className={cn(
                      "h-10 rounded-full px-3 text-sm font-semibold disabled:opacity-40",
                      axisA === a.id ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)]",
                    )}
                  >
                    {a.label} ({a.options.length})
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1 text-sm font-semibold">Sumbu B</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAxisB(null)}
                  className={cn(
                    "h-10 rounded-full px-3 text-sm font-semibold",
                    axisB === null ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)]",
                  )}
                >
                  (tidak ada)
                </button>
                {PRESET_AXES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAxisB(a.id)}
                    disabled={axisA === a.id}
                    className={cn(
                      "h-10 rounded-full px-3 text-sm font-semibold disabled:opacity-40",
                      axisB === a.id ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)]",
                    )}
                  >
                    {a.label} ({a.options.length})
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-[var(--muted)] p-3 text-sm">
              <div className="font-semibold">
                Total varian yang akan dibuat: {combos.length}
              </div>
              <div className="text-[var(--muted-foreground)]">
                Contoh: {combos.slice(0, 3).map((c) => c.label).join(", ")}
                {combos.length > 3 ? `, +${combos.length - 3} lagi…` : ""}
              </div>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="space-y-3">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-lg font-semibold">3. Harga per varian</div>
              <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                Isi harga per pcs untuk {combos.length} varian.
                Kamu bisa tambahkan satuan lain (lusin, bak) setelah simpan.
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <table className="w-full text-sm">
                <thead className="bg-[var(--muted)]">
                  <tr>
                    <th className="p-3 text-left font-semibold">Varian</th>
                    <th className="p-3 text-right font-semibold">Harga / pcs</th>
                  </tr>
                </thead>
                <tbody>
                  {combos.map((c) => (
                    <tr key={c.key} className="border-t border-[var(--border)]">
                      <td className="p-3">{c.label}</td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          Rp
                          <input
                            type="number"
                            value={priceGrid[c.key] ?? ""}
                            onChange={(e) => setPriceGrid((g) => ({ ...g, [c.key]: Number(e.target.value) || 0 }))}
                            className="h-10 w-28 rounded-lg border border-[var(--border)] bg-white px-2 text-right font-semibold"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4 text-sm text-[var(--muted-foreground)]">
              Satuan default: <span className="font-semibold">pcs</span> ({units.find((u) => u.id === "pcs")?.nama}).
              Nanti bisa ditambah lusin, bak, pak dsb per varian.
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">RINGKASAN</div>
              <div className="text-sm">
                <div><span className="font-semibold">{nama || "—"}</span> · {brand || "—"}</div>
                <div className="text-[var(--muted-foreground)]">
                  {categories.find((c) => c.id === kategoriId)?.nama ?? "Tanpa kategori"} · {combos.length} varian
                </div>
                <div className="mt-2">
                  Harga pcs rata-rata: {rupiah(
                    Object.values(priceGrid).length
                      ? Object.values(priceGrid).reduce((a, b) => a + b, 0) / Object.values(priceGrid).length
                      : 0,
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>

      {/* Footer nav */}
      <div className="no-print sticky bottom-0 z-10 border-t border-[var(--border)] bg-white p-4">
        <div className="flex gap-3">
          {step > 1 ? (
            <BigButton variant="outline" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}>
              ← Mundur
            </BigButton>
          ) : null}
          {step < 3 ? (
            <BigButton
              variant="primary"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
            >
              Lanjut →
            </BigButton>
          ) : (
            <BigButton variant="primary" onClick={handleSave}>
              Simpan {combos.length} Varian
            </BigButton>
          )}
        </div>
      </div>
    </div>
  );
}
