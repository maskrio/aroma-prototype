"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BigButton } from "@/components/BigButton";

const KASIRS = [
  { id: "k1", nama: "Budi", pin: "1234" },
  { id: "k2", nama: "Siti", pin: "1234" },
  { id: "k3", nama: "Rudi", pin: "1234" },
  { id: "k4", nama: "Ani", pin: "1234" },
];

export default function KasirLoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [pin, setPin] = useState("");

  const kasir = KASIRS.find((k) => k.id === selected);

  function pressDigit(d: string) {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      // Any 4-digit pin works in the prototype.
      setTimeout(() => router.push("/kasir"), 200);
    }
  }

  function backspace() {
    setPin((p) => p.slice(0, -1));
  }

  if (!selected) {
    return (
      <div className="flex flex-1 flex-col bg-[var(--background)] p-6">
        <div className="mb-2 text-sm">
          <Link href="/" className="text-[var(--muted-foreground)]">
            ← Ganti peran
          </Link>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Pilih nama kamu</h1>
        <p className="mb-6 text-[var(--muted-foreground)]">
          Siapa yang pakai HP ini sekarang?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {KASIRS.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelected(k.id)}
              className="flex h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white transition active:scale-[0.97] hover:border-[var(--primary)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-2xl font-bold text-white">
                {k.nama[0]}
              </div>
              <div className="text-lg font-semibold">{k.nama}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div className="flex flex-1 flex-col bg-[var(--background)] p-6">
      <div className="mb-2 text-sm">
        <button onClick={() => { setSelected(null); setPin(""); }} className="text-[var(--muted-foreground)]">
          ← Ganti nama
        </button>
      </div>
      <h1 className="mb-1 text-2xl font-bold">Halo, {kasir?.nama}</h1>
      <p className="mb-8 text-[var(--muted-foreground)]">Masukkan PIN 4 angka.</p>

      <div className="mb-8 flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-16 w-14 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold ${
              pin.length > i
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--border)] bg-white text-transparent"
            }`}
          >
            {pin.length > i ? "●" : "·"}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-xs grid-cols-3 gap-3">
        {digits.map((d) => (
          <button
            key={d}
            onClick={() => pressDigit(d)}
            className="h-16 rounded-2xl bg-white text-2xl font-bold shadow-sm border border-[var(--border)] active:scale-[0.95]"
          >
            {d}
          </button>
        ))}
        <div />
        <button
          onClick={() => pressDigit("0")}
          className="h-16 rounded-2xl bg-white text-2xl font-bold shadow-sm border border-[var(--border)] active:scale-[0.95]"
        >
          0
        </button>
        <button
          onClick={backspace}
          aria-label="Hapus"
          className="h-16 rounded-2xl bg-[var(--muted)] text-xl font-bold active:scale-[0.95]"
        >
          ⌫
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
        Prototipe: PIN apa saja akan masuk.
      </div>

      <div className="mt-6">
        <BigButton variant="outline" onClick={() => router.push("/kasir")}>
          Lewati (demo)
        </BigButton>
      </div>
    </div>
  );
}
