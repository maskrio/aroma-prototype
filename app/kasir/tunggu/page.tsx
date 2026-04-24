"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { rupiah } from "@/lib/format";
import { BigButton } from "@/components/BigButton";

// Simulated wait time before owner "confirms" (random 3-6s in demo).
const SIM_WAIT_MS = 4000;
const ORDER_ID = "demo-1";

export default function TungguPage() {
  const router = useRouter();
  const { totalHarga, totalItems, clear } = useCart();
  const [seconds, setSeconds] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const int = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 250);
    const to = setTimeout(() => {
      // Simulate owner approval — push to "selesai" screen, keep cart items in URL state by preserving them briefly.
      // For the prototype, we finalize: snapshot cart to sessionStorage then clear and navigate.
      if (typeof window !== "undefined") {
        const snapshot = window.localStorage.getItem("toko-demo-cart");
        window.sessionStorage.setItem(`toko-demo-order-${ORDER_ID}`, snapshot ?? "[]");
      }
      clear();
      router.replace(`/kasir/selesai/${ORDER_ID}`);
    }, SIM_WAIT_MS);
    return () => {
      clearInterval(int);
      clearTimeout(to);
    };
  }, [router, clear]);

  if (cancelled) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-[var(--background)] p-8 text-center">
        <div className="mb-3 text-6xl">↩️</div>
        <div className="mb-2 text-xl font-semibold">Dibatalkan</div>
        <div className="mb-6 text-[var(--muted-foreground)]">
          Barang-barang masih di keranjang.
        </div>
        <BigButton onClick={() => router.replace("/kasir/keranjang")}>
          Kembali ke Keranjang
        </BigButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[var(--background)] p-8 text-center">
      <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)]/20" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)] text-5xl text-white">
          ⏳
        </div>
      </div>

      <h1 className="mb-2 text-2xl font-bold">Menunggu persetujuan…</h1>
      <p className="mb-6 max-w-sm text-[var(--muted-foreground)]">
        Pemilik sedang memeriksa pesanan kamu di HP-nya.
      </p>

      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-white px-6 py-4">
        <div className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
          Pesanan kamu
        </div>
        <div className="text-2xl font-bold text-[var(--primary)]">
          {rupiah(totalHarga)}
        </div>
        <div className="text-sm text-[var(--muted-foreground)]">
          {totalItems} item · {seconds}s
        </div>
      </div>

      <BigButton
        variant="outline"
        onClick={() => setCancelled(true)}
      >
        Batalkan
      </BigButton>
    </div>
  );
}
