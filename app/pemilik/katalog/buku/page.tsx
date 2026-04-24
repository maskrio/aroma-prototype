"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { cn } from "@/lib/utils";

type Stage = "intro" | "kamera" | "proses" | "review" | "selesai";

type Extracted = {
  nama: string;
  brand?: string;
  harga: number;
  satuan: string;
  confidence: number; // 0-1
  accepted: boolean;
};

const FAKE_EXTRACTED: Extracted[] = [
  { nama: "Indomie Goreng", brand: "Indofood", harga: 3500, satuan: "pcs", confidence: 0.97, accepted: true },
  { nama: "Indomie Soto", brand: "Indofood", harga: 3500, satuan: "pcs", confidence: 0.95, accepted: true },
  { nama: "Sarimie Ayam Bawang", brand: "Sarimi", harga: 3000, satuan: "pcs", confidence: 0.88, accepted: true },
  { nama: "Aqua 600ml", brand: "Aqua", harga: 4000, satuan: "btl", confidence: 0.91, accepted: true },
  { nama: "Teh Pucuk 350ml", brand: "Mayora", harga: 5000, satuan: "btl", confidence: 0.82, accepted: true },
  { nama: "Kopi Kapal Api Sachet", brand: "Kapal Api", harga: 1500, satuan: "pcs", confidence: 0.71, accepted: true },
  { nama: "Beng Beng coklat", brand: "Mayora", harga: 2000, satuan: "pcs", confidence: 0.92, accepted: true },
  { nama: "(tidak terbaca)", harga: 0, satuan: "?", confidence: 0.32, accepted: false },
  { nama: "Silver Queen 65gr", brand: "Silver Queen", harga: 15000, satuan: "pcs", confidence: 0.84, accepted: true },
  { nama: "Chitato 68gr", brand: "Indofood", harga: 10000, satuan: "pcs", confidence: 0.9, accepted: true },
  { nama: "Milkita permen susu", harga: 500, satuan: "pcs", confidence: 0.76, accepted: true },
  { nama: "Kopiko permen kopi", harga: 500, satuan: "pcs", confidence: 0.79, accepted: true },
];

export default function KatalogBukuPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("intro");
  const [items, setItems] = useState<Extracted[]>(FAKE_EXTRACTED);
  const [progress, setProgress] = useState(0);

  function startCapture() { setStage("kamera"); }
  function onCapture() {
    setStage("proses");
    setProgress(0);
    const int = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(int);
          setStage("review");
          return 100;
        }
        return p + 7;
      });
    }, 150);
  }

  function toggleAccept(i: number) {
    setItems((arr) => arr.map((x, idx) => idx === i ? { ...x, accepted: !x.accepted } : x));
  }

  const acceptedCount = items.filter((x) => x.accepted).length;

  if (stage === "intro") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
        <TopBar title="Foto Buku Catatan" back="/pemilik/katalog" variant="accent" />
        <div className="flex flex-1 flex-col p-6 space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <div className="mb-3 text-5xl">📓</div>
            <h2 className="mb-2 text-xl font-bold">Foto halaman buku catatan</h2>
            <p className="mb-4 text-[var(--muted-foreground)]">
              Kami akan coba baca tulisan tangan kamu dan ubah jadi daftar barang.
              Kamu bisa perbaiki hasilnya sebelum simpan.
            </p>
            <ul className="mb-4 space-y-1 text-sm text-[var(--muted-foreground)]">
              <li>• Foto di tempat terang</li>
              <li>• Satu halaman penuh kelihatan</li>
              <li>• Tulisan tidak terhalang tangan</li>
            </ul>
          </div>
          <BigButton variant="primary" onClick={startCapture}>
            📷 Mulai foto
          </BigButton>
          <div className="text-center text-sm text-[var(--muted-foreground)]">
            Tip: Kalau tulisan susah terbaca, ketik saja manual lewat "Tambah satu".
          </div>
        </div>
      </div>
    );
  }

  if (stage === "kamera") {
    return (
      <div className="flex flex-1 flex-col bg-black">
        <TopBar title="Arahkan ke halaman buku" back="/pemilik/katalog/buku" variant="accent" />
        <div className="flex flex-1 flex-col items-center justify-center bg-black p-6 text-white">
          <div className="relative mb-6 flex h-[320px] w-full max-w-sm items-center justify-center rounded-2xl border-4 border-dashed border-white/60 bg-white/5">
            <div className="text-center opacity-80">
              <div className="mb-2 text-6xl">📄</div>
              <div className="text-sm">Letakkan halaman di dalam bingkai</div>
            </div>
            <div className="absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-[var(--primary)]" />
            <div className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-[var(--primary)]" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-[var(--primary)]" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-[var(--primary)]" />
          </div>
          <button
            onClick={onCapture}
            className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20 active:scale-95"
            aria-label="Foto"
          >
            <div className="h-14 w-14 rounded-full bg-white" />
          </button>
          <div className="mt-4 text-sm opacity-75">Tekan tombol putih untuk foto</div>
        </div>
      </div>
    );
  }

  if (stage === "proses") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
        <TopBar title="Memproses…" variant="accent" />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 text-7xl">🔎</div>
          <div className="mb-2 text-xl font-bold">Membaca tulisan tangan…</div>
          <div className="mb-6 max-w-sm text-[var(--muted-foreground)]">
            Ini bisa 10-30 detik. Jangan tutup aplikasi.
          </div>
          <div className="mb-2 h-3 w-full max-w-sm overflow-hidden rounded-full bg-[var(--muted)]">
            <div
              className="h-full bg-[var(--primary)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">{progress}%</div>
        </div>
      </div>
    );
  }

  if (stage === "review") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
        <TopBar
          title="Hasil Pembacaan"
          subtitle={`${items.length} baris terbaca · ${acceptedCount} akan disimpan`}
          back="/pemilik/katalog/buku"
          variant="accent"
        />
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {items.map((it, i) => {
            const lowConf = it.confidence < 0.75;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border bg-white p-3",
                  it.accepted ? "border-[var(--border)]" : "border-[var(--border)] opacity-50",
                  lowConf && it.accepted && "border-[var(--accent)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleAccept(i)}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2",
                      it.accepted
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border)] bg-white",
                    )}
                    aria-label="Setuju baris ini"
                  >
                    {it.accepted ? "✓" : ""}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        defaultValue={it.nama}
                        className="min-w-[120px] flex-1 rounded border-b border-transparent bg-transparent text-base font-semibold outline-none hover:border-[var(--border)] focus:border-[var(--primary)]"
                      />
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
                          it.confidence >= 0.9 ? "bg-emerald-100 text-emerald-900" :
                          it.confidence >= 0.75 ? "bg-amber-100 text-amber-900" :
                          "bg-red-100 text-red-900",
                        )}
                      >
                        {Math.round(it.confidence * 100)}% yakin
                      </span>
                    </div>
                    {it.brand ? (
                      <div className="text-xs text-[var(--muted-foreground)]">{it.brand}</div>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span>Rp</span>
                      <input
                        type="number"
                        defaultValue={it.harga}
                        className="h-9 w-24 rounded-lg border border-[var(--border)] bg-white px-2 text-right font-semibold"
                      />
                      <span>/</span>
                      <input
                        defaultValue={it.satuan}
                        className="h-9 w-16 rounded-lg border border-[var(--border)] bg-white px-2 font-semibold"
                      />
                    </div>
                    {lowConf ? (
                      <div className="mt-2 text-xs text-[var(--accent)]">
                        ⚠ Kepercayaan rendah — mohon periksa tulisan aslinya.
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4">
          <BigButton variant="primary" onClick={() => setStage("selesai")}>
            Simpan {acceptedCount} Barang
          </BigButton>
          <div className="mt-2 text-center text-xs text-[var(--muted-foreground)]">
            Kamu bisa edit lagi satu-satu setelah disimpan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)] text-4xl text-white">
        ✓
      </div>
      <h1 className="mb-2 text-2xl font-bold">{acceptedCount} barang disimpan</h1>
      <p className="mb-6 text-[var(--muted-foreground)]">
        Semua bisa diedit di halaman katalog.
      </p>
      <BigButton variant="primary" onClick={() => router.push("/pemilik/katalog")}>
        Kembali ke Katalog
      </BigButton>
    </div>
  );
}
