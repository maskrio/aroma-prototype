"use client";

import { BottomBar, type BottomBarItem } from "@/components/BottomBar";
import { fakeOrders } from "@/lib/fake-data";
import { usePathname } from "next/navigation";

export default function PemilikLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pendingCount = fakeOrders.filter((o) => o.status === "PENDING").length;

  const hideBottomBar = pathname === "/pemilik/login";

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
      href: "/pemilik/login",
      label: "Akun",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
      activeMatch: (p) => p === "/pemilik/login",
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      {!hideBottomBar ? <BottomBar items={items} /> : null}
    </div>
  );
}
