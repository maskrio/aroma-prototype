"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { cn } from "@/lib/utils";

type Row = {
  nama: string;
  brand: string;
  kategori: string;
  satuan: string;
  harga: number;
  status: "ok" | "warn" | "error";
  pesan?: string;
};

const FAKE_ROWS: Row[] = [
  { nama: "Indomie Goreng 85gr", brand: "Indofood", kategori: "Mie Instan", satuan: "pcs", harga: 3500, status: "ok" },
  { nama: "Indomie Soto 75gr", brand: "Indofood", kategori: "Mie Instan", satuan: "pcs", harga: 3500, status: "ok" },
  { nama: "Mie Sedaap Goreng 90gr", brand: "Wings", kategori: "Mie Instan", satuan: "pcs", harga: 3200, status: "ok" },
  { nama: "Aqua Botol 600", brand: "Aqua", kategori: "Minuman", satuan: "btl", harga: 4000, status: "warn", pesan: "Mirip dengan 'Aqua 600ml' yang sudah ada — gabung?" },
  { nama: "Teh Botol 450ml", brand: "Sosro", kategori: "Minuman", satuan: "btl", harga: 5000, status: "ok" },
  { nama: "Coca Cola 390", brand: "Coca Cola", kategori: "Minuman", satuan: "btl", harga: 6000, status: "ok" },
  { nama: "Chitato Sapi", brand: "Indofood", kategori: "Snack", satuan: "pcs", harga: 10000, status: "ok" },
  { nama: "?", brand: "?", kategori: "Snack", satuan: "pcs", harga: 0, status: "error", pesan: "Nama dan harga wajib diisi" },
  { nama: "Rinso 800gr", brand: "Unilever", kategori: "Sabun", satuan: "pcs", harga: 18000, status: "ok" },
  { nama: "Sunlight 800ml", brand: "Unilever", kategori: "Sabun", satuan: "btl", harga: 15000, status: "ok" },
  { nama: "Gelas Plastik 12oz pak 50", brand: "Merapi", kategori: "Plastik", satuan: "pak", harga: 15000, status: "ok" },
  { nama: "Sedotan Plastik pak 100", brand: "-", kategori: "Plastik", satuan: "pak", harga: 8000, status: "warn", pesan: "Brand kosong — akan disimpan sebagai 'Generik'" },
  { nama: "GG Surya 16", brand: "Gudang Garam", kategori: "Rokok", satuan: "pak", harga: 32000, status: "ok" },
  { nama: "Sampoerna Mild 16", brand: "Sampoerna", kategori: "Rokok", satuan: "pak", harga: 35000, status: "ok" },
  { nama: "Garam Halus 250gr", brand: "Cap Kapal", kategori: "Bumbu", satuan: "pcs", harga: 3000, status: "ok" },
];

export default function KatalogImporPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"pilih" | "preview" | "selesai">("pilih");
  const [filter, setFilter] = useState<"semua" | "ok" | "warn" | "error">("semua");

  const rows = FAKE_ROWS.filter((r) => filter === "semua" ? true : r.status === filter);
  const counts = {
    semua: FAKE_ROWS.length,
    ok: FAKE_ROWS.filter((r) => r.status === "ok").length,
    warn: FAKE_ROWS.filter((r) => r.status === "warn").length,
    error: FAKE_ROWS.filter((r) => r.status === "error").length,
  };

  if (stage === "selesai") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)] text-4xl text-white">
          ✓
        </div>
        <h1 className="mb-2 text-2xl font-bold">{counts.ok} barang diimpor</h1>
        <p className="mb-6 text-[var(--muted-foreground)]">
          {counts.warn} baris perlu ditinjau · {counts.error} baris dilewati.
        </p>
        <BigButton variant="primary" onClick={() => router.push("/pemilik/katalog")}>
          Kembali ke Katalog
        </BigButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Impor dari Excel"
        subtitle={stage === "pilih" ? "Pilih file" : "Tinjau sebelum simpan"}
        back="/pemilik/katalog"
        variant="accent"
      />

      {stage === "pilih" ? (
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-white p-8 text-center">
            <div className="mb-3 text-6xl">📊</div>
            <div className="mb-1 text-lg font-semibold">Tarik file Excel ke sini</div>
            <div className="mb-4 text-sm text-[var(--muted-foreground)]">
              Atau pilih dari galeri / cloud
            </div>
            <BigButton variant="primary" onClick={() => setStage("preview")}>
              Pilih File (demo)
            </BigButton>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="mb-2 text-sm font-semibold">Format yang didukung</div>
            <ul className="list-disc pl-5 text-sm text-[var(--muted-foreground)]">
              <li>Excel (.xlsx, .xls)</li>
              <li>CSV / Google Sheets export</li>
              <li>Kolom minimum: Nama, Harga. Lainnya opsional.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="mb-2 text-sm font-semibold">Tidak punya file Excel?</div>
            <div className="mb-3 text-sm text-[var(--muted-foreground)]">
              Kamu bisa download contoh format dan isi di HP atau komputer.
            </div>
            <BigButton size="md" variant="outline" onClick={() => {}}>
              📥 Download contoh format
            </BigButton>
          </div>
        </div>
      ) : null}

      {stage === "preview" ? (
        <>
          <div className="shrink-0 bg-white px-4 py-3 border-b border-[var(--border)]">
            <div className="mb-2 text-sm">
              File: <span className="font-semibold">katalog-baru.xlsx</span> · {counts.semua} baris
            </div>
            <div className="flex flex-wrap gap-2">
              {(["semua", "ok", "warn", "error"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "h-9 rounded-full px-3 text-sm font-semibold",
                    filter === f
                      ? "bg-[var(--primary)] text-white"
                      : "bg-white border border-[var(--border)]",
                  )}
                >
                  {f === "semua" ? `Semua (${counts.semua})` :
                    f === "ok" ? `✓ Siap (${counts.ok})` :
                    f === "warn" ? `⚠ Perlu cek (${counts.warn})` :
                    `✕ Gagal (${counts.error})`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <table className="w-full text-sm">
                <thead className="bg-[var(--muted)]">
                  <tr>
                    <th className="p-2 text-left font-semibold">Status</th>
                    <th className="p-2 text-left font-semibold">Nama</th>
                    <th className="p-2 text-left font-semibold">Kategori</th>
                    <th className="p-2 text-right font-semibold">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-t border-[var(--border)]",
                        r.status === "error" && "bg-red-50",
                        r.status === "warn" && "bg-amber-50",
                      )}
                    >
                      <td className="p-2 align-top">
                        {r.status === "ok" ? <span className="text-[var(--primary)]">✓</span>
                          : r.status === "warn" ? <span className="text-[var(--accent)]">⚠</span>
                          : <span className="text-[var(--destructive)]">✕</span>}
                      </td>
                      <td className="p-2 align-top">
                        <div className="font-semibold">{r.nama}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{r.brand}</div>
                        {r.pesan ? (
                          <div className="mt-1 text-xs italic text-[var(--muted-foreground)]">
                            {r.pesan}
                          </div>
                        ) : null}
                      </td>
                      <td className="p-2 align-top">{r.kategori}</td>
                      <td className="p-2 align-top text-right">
                        Rp {r.harga.toLocaleString("id-ID")} / {r.satuan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4">
            <BigButton variant="primary" onClick={() => setStage("selesai")}>
              Impor {counts.ok + counts.warn} Barang
            </BigButton>
            <div className="mt-2 text-center text-xs text-[var(--muted-foreground)]">
              {counts.error} baris dengan error akan dilewati.
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
