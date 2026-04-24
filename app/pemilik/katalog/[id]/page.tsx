"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import {
  categories,
  findUnit,
  findVariant,
  units,
} from "@/lib/fake-data";
import { rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function KatalogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const variant = findVariant(id);

  const [nama, setNama] = useState(variant?.nama ?? "");
  const [brand, setBrand] = useState(variant?.brand ?? "");
  const [kategoriId, setKategoriId] = useState(variant?.kategoriId ?? "");
  const [stok, setStok] = useState(variant?.stok ?? 0);
  const [harga, setHarga] = useState(variant?.harga ?? []);
  const [saved, setSaved] = useState(false);

  if (!variant) {
    return (
      <div className="flex flex-1 flex-col">
        <TopBar title="Tidak ditemukan" back="/pemilik/katalog" variant="accent" />
      </div>
    );
  }

  function updateHarga(i: number, patch: Partial<(typeof harga)[number]>) {
    setHarga((h) => h.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function addHarga() {
    const used = new Set(harga.map((h) => h.unitId));
    const next = units.find((u) => !used.has(u.id));
    if (!next) return;
    setHarga((h) => [...h, { unitId: next.id, harga: 0, konversi: 1 }]);
  }
  function removeHarga(i: number) {
    setHarga((h) => h.filter((_, idx) => idx !== i));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/pemilik/katalog"), 700);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Edit Barang"
        subtitle={variant.brand}
        back="/pemilik/katalog"
        variant="accent"
      />

      {saved ? (
        <div className="bg-[var(--primary)] p-3 text-center font-semibold text-white">
          ✓ Tersimpan (simulasi)
        </div>
      ) : null}

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <section className="rounded-2xl border border-[var(--border)] bg-white p-4 space-y-3">
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Nama lengkap</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--primary)]"
            />
          </label>
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Brand</div>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--primary)]"
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
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">Stok (pcs)</div>
            <input
              type="number"
              value={stok}
              onChange={(e) => setStok(Number(e.target.value) || 0)}
              className="h-12 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--primary)]"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-[var(--muted-foreground)]">
              HARGA PER SATUAN
            </div>
            <button
              onClick={addHarga}
              className="h-9 rounded-full bg-[var(--muted)] px-3 text-sm font-semibold hover:bg-slate-200"
            >
              + Tambah satuan
            </button>
          </div>
          <div className="space-y-2">
            {harga.map((row, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] p-2"
                >
                  <select
                    value={row.unitId}
                    onChange={(e) => updateHarga(i, { unitId: e.target.value })}
                    className="h-10 rounded-lg border border-[var(--border)] bg-white px-2 text-sm font-semibold"
                  >
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nama} ({u.singkatan})
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1 text-sm">
                    =
                    <input
                      type="number"
                      value={row.konversi}
                      onChange={(e) => updateHarga(i, { konversi: Number(e.target.value) || 1 })}
                      className="h-10 w-20 rounded-lg border border-[var(--border)] bg-white px-2 text-right"
                    />
                    <span className="text-[var(--muted-foreground)]">pcs</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-sm">
                    Rp
                    <input
                      type="number"
                      value={row.harga}
                      onChange={(e) => updateHarga(i, { harga: Number(e.target.value) || 0 })}
                      className="h-10 w-28 rounded-lg border border-[var(--border)] bg-white px-2 text-right font-semibold"
                    />
                  </div>
                  <button
                    onClick={() => removeHarga(i)}
                    className="h-10 rounded-lg px-2 text-[var(--destructive)] hover:bg-red-50"
                    aria-label="Hapus"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
            {harga.length === 0 ? (
              <div className="text-sm text-[var(--muted-foreground)]">
                Belum ada harga. Tambahkan minimal satu satuan.
              </div>
            ) : null}
          </div>
          <div className="mt-3 text-xs text-[var(--muted-foreground)]">
            Contoh: 1 lusin = 12 pcs, 1 bak = 48 pcs. Harga bisa beda per satuan.
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            PRATINJAU KARTU KASIR
          </div>
          <div className="mx-auto w-40">
            <div className="overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white">
              <div className={cn("flex h-24 items-center justify-center text-5xl", variant.warnaBg)}>
                {variant.emoji}
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold">{nama || "Tanpa nama"}</div>
                <div className="mt-1 text-base font-bold text-[var(--primary)]">
                  {rupiah(harga[0]?.harga ?? 0)}
                  <span className="text-xs font-normal text-[var(--muted-foreground)]">
                    {" "}/{findUnit(harga[0]?.unitId ?? "pcs")?.singkatan ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4">
        <BigButton variant="primary" onClick={handleSave}>
          Simpan Perubahan
        </BigButton>
      </div>
    </div>
  );
}
