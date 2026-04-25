"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { BigButton } from "@/components/BigButton";
import { categories } from "@/lib/fake-data";
import { cn } from "@/lib/utils";

export default function DistributorBaruPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [kontakNama, setKontakNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [spesialisasi, setSpesialisasi] = useState<string[]>([]);
  const [catatan, setCatatan] = useState("");
  const [saved, setSaved] = useState(false);

  function toggleSpec(id: string) {
    setSpesialisasi((arr) =>
      arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
    );
  }

  const valid = nama.trim() && telepon.trim();

  function handleSave() {
    if (!valid) return;
    setSaved(true);
    setTimeout(() => router.push("/pemilik/distributor"), 800);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <TopBar
        title="Distributor Baru"
        subtitle="Tambah suplier"
        back="/pemilik/distributor"
        variant="accent"
      />

      {saved ? (
        <div className="bg-[var(--primary)] p-3 text-center font-semibold text-white">
          ✓ Distributor disimpan (simulasi)
        </div>
      ) : null}

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <section className="rounded-2xl border border-[var(--border)] bg-white p-4 space-y-3">
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">
              Nama distributor / toko *
            </div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: CV. Plastik Jaya"
              className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">
              Nama kontak (orang)
            </div>
            <input
              value={kontakNama}
              onChange={(e) => setKontakNama(e.target.value)}
              placeholder="Contoh: Pak Hartono"
              className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">
              Telepon / WhatsApp *
            </div>
            <input
              type="tel"
              inputMode="tel"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              placeholder="0812-3456-7890"
              className="h-14 w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 text-base outline-none focus:border-[var(--accent)]"
            />
            <div className="mt-1 text-xs text-[var(--muted-foreground)]">
              Bisa dipakai untuk telepon langsung atau WhatsApp.
            </div>
          </label>
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-[var(--muted-foreground)]">
              Alamat (opsional)
            </div>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows={2}
              placeholder="Contoh: Jl. Kemakmuran No. 12, Surabaya"
              className="w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--accent)]"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            JENIS BARANG YANG DISUPLAI
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleSpec(c.id)}
                className={cn(
                  "flex h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold transition",
                  spesialisasi.includes(c.id)
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white border-2 border-[var(--border)]",
                )}
              >
                <span>{c.ikon}</span>
                <span>{c.nama}</span>
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-[var(--muted-foreground)]">
            Pilih satu atau lebih.
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-[var(--muted-foreground)]">
            CATATAN (opsional)
          </div>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={3}
            placeholder="Contoh: Diskon 5% untuk order > 5 bal. Antar pagi."
            className="w-full rounded-xl border-2 border-[var(--border)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--accent)]"
          />
        </section>
      </div>

      <div className="no-print shrink-0 border-t border-[var(--border)] bg-white p-4">
        <BigButton variant="primary" disabled={!valid} onClick={handleSave}>
          Simpan Distributor
        </BigButton>
      </div>
    </div>
  );
}
