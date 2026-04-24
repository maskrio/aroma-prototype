// Client-side cart state — stored in localStorage so refreshes don't wipe it.
// Prototype only: no backend, no sync.
"use client";

import { useCallback, useEffect, useState } from "react";
import { findVariant, hargaUntuk, type Variant } from "./fake-data";

const CART_KEY = "toko-demo-cart";

export interface CartItem {
  variantId: string;
  unitId: string;
  qty: number;
}

export interface CartLine extends CartItem {
  variant: Variant;
  hargaSatuan: number;
  subtotal: number;
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Let other tabs / components react.
  window.dispatchEvent(new CustomEvent("toko-cart-changed"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setReady(true);
    function sync() { setItems(readCart()); }
    window.addEventListener("toko-cart-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("toko-cart-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((variantId: string, unitId: string, qty: number = 1) => {
    const current = readCart();
    const i = current.findIndex((x) => x.variantId === variantId && x.unitId === unitId);
    if (i >= 0) {
      current[i] = { ...current[i], qty: current[i].qty + qty };
    } else {
      current.push({ variantId, unitId, qty });
    }
    writeCart(current);
  }, []);

  const setQty = useCallback((variantId: string, unitId: string, qty: number) => {
    let current = readCart();
    if (qty <= 0) {
      current = current.filter((x) => !(x.variantId === variantId && x.unitId === unitId));
    } else {
      const i = current.findIndex((x) => x.variantId === variantId && x.unitId === unitId);
      if (i >= 0) current[i] = { ...current[i], qty };
      else current.push({ variantId, unitId, qty });
    }
    writeCart(current);
  }, []);

  const remove = useCallback((variantId: string, unitId: string) => {
    const current = readCart().filter((x) => !(x.variantId === variantId && x.unitId === unitId));
    writeCart(current);
  }, []);

  const clear = useCallback(() => { writeCart([]); }, []);

  const lines: CartLine[] = items
    .map((it) => {
      const variant = findVariant(it.variantId);
      if (!variant) return null;
      const hargaSatuan = hargaUntuk(variant, it.unitId);
      return {
        ...it,
        variant,
        hargaSatuan,
        subtotal: hargaSatuan * it.qty,
      };
    })
    .filter((l): l is CartLine => l !== null);

  const totalItems = lines.reduce((s, l) => s + l.qty, 0);
  const totalHarga = lines.reduce((s, l) => s + l.subtotal, 0);

  return { ready, items, lines, totalItems, totalHarga, add, setQty, remove, clear };
}
