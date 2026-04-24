"use client";

import { BottomBar, type BottomBarItem } from "@/components/BottomBar";
import { useCart } from "@/lib/cart";
import { usePathname } from "next/navigation";

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Hide the bottom bar on login and on the receipt screen (fullscreen).
  const hideBottomBar =
    pathname === "/kasir/login" ||
    pathname?.startsWith("/kasir/struk/") ||
    pathname === "/kasir/tunggu";

  const items: BottomBarItem[] = [
    {
      href: "/kasir",
      label: "Jualan",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      activeMatch: (p) => p === "/kasir" || p.startsWith("/kasir/produk"),
    },
    {
      href: "/kasir/keranjang",
      label: "Keranjang",
      badge: totalItems,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1.5" />
          <circle cx="18" cy="21" r="1.5" />
          <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L22 7H6" />
        </svg>
      ),
      activeMatch: (p) => p.startsWith("/kasir/keranjang"),
    },
    {
      href: "/kasir/login",
      label: "Akun",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
      activeMatch: (p) => p === "/kasir/login",
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      {!hideBottomBar ? <BottomBar items={items} /> : null}
    </div>
  );
}
