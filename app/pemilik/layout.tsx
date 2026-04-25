"use client";

import { BottomBar, type BottomBarItem } from "@/components/BottomBar";
import { fakeOrders } from "@/lib/fake-data";

export default function PemilikLayout({ children }: { children: React.ReactNode }) {
  const pendingCount = fakeOrders.filter((o) => o.status === "PENDING").length;

  const items: BottomBarItem[] = [
    {
      href: "/pemilik",
      label: "Pesanan",
      badge: pendingCount,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3 6-6" />
          <path d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4l-2-2H9L7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
        </svg>
      ),
      activeMatch: (p) =>
        p === "/pemilik" || p.startsWith("/pemilik/pesanan"),
    },
    {
      href: "/pemilik/katalog",
      label: "Katalog",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
      ),
      activeMatch: (p) => p.startsWith("/pemilik/katalog"),
    },
    {
      href: "/pemilik/stok",
      label: "Stok",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 3 5-7" />
        </svg>
      ),
      activeMatch: (p) => p.startsWith("/pemilik/stok"),
    },
    {
      href: "/pemilik/distributor",
      label: "Suplier",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h13l5 5v5h-3" />
          <path d="M3 7v10h2" />
          <circle cx="8" cy="17" r="2" />
          <circle cx="18" cy="17" r="2" />
        </svg>
      ),
      activeMatch: (p) =>
        p.startsWith("/pemilik/distributor") || p.startsWith("/pemilik/pembelian"),
    },
    {
      href: "/pemilik/riwayat",
      label: "Riwayat",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
      activeMatch: (p) =>
        p.startsWith("/pemilik/riwayat") || p.startsWith("/pemilik/struk"),
    },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden min-h-0">{children}</div>
      <BottomBar items={items} />
    </div>
  );
}
