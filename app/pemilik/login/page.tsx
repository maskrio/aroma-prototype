"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BigButton } from "@/components/BigButton";

export default function PemilikLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");

  function pressDigit(d: string) {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => router.push("/pemilik"), 200);
    }
  }
  function backspace() { setPin((p) => p.slice(0, -1)); }

  const digits = ["1","2","3","4","5","6","7","8","9"];

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)] p-6">
      <div className="mb-2 text-sm">
        <Link href="/" className="text-[var(--muted-foreground)]">
          ← Ganti peran
        </Link>
      </div>
      <div className="mt-4 mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-white text-4xl font-bold">
          P
        </div>
        <h1 className="text-2xl font-bold">Halo, Pemilik</h1>
        <p className="mt-1 text-[var(--muted-foreground)]">Masukkan PIN 4 angka.</p>
      </div>

      <div className="mb-8 flex justify-center gap-3">
        {[0,1,2,3].map((i) => (
          <div key={i} className={`h-16 w-14 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold ${pin.length > i ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] bg-white text-transparent"}`}>
            {pin.length > i ? "●" : "·"}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-xs grid-cols-3 gap-3">
        {digits.map((d) => (
          <button key={d} onClick={() => pressDigit(d)} className="h-16 rounded-2xl bg-white text-2xl font-bold shadow-sm border border-[var(--border)] active:scale-[0.95]">
            {d}
          </button>
        ))}
        <div />
        <button onClick={() => pressDigit("0")} className="h-16 rounded-2xl bg-white text-2xl font-bold shadow-sm border border-[var(--border)] active:scale-[0.95]">0</button>
        <button onClick={backspace} aria-label="Hapus" className="h-16 rounded-2xl bg-[var(--muted)] text-xl font-bold active:scale-[0.95]">⌫</button>
      </div>

      <div className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
        Prototipe: PIN apa saja akan masuk.
      </div>

      <div className="mt-6">
        <BigButton variant="outline" onClick={() => router.push("/pemilik")}>
          Lewati (demo)
        </BigButton>
      </div>
    </div>
  );
}
