"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface BottomBarItem {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  activeMatch?: (pathname: string) => boolean;
}

interface BottomBarProps {
  items: BottomBarItem[];
}

export function BottomBar({ items }: BottomBarProps) {
  const pathname = usePathname();
  return (
    <nav className="no-print sticky bottom-0 z-20 flex h-[72px] w-full items-stretch border-t border-[var(--border)] bg-white">
      {items.map((item) => {
        const active = item.activeMatch
          ? item.activeMatch(pathname ?? "")
          : pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 text-sm font-medium",
              active
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            <div className="relative flex h-7 w-7 items-center justify-center">
              {item.icon}
              {item.badge && item.badge > 0 ? (
                <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-xs font-bold text-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              ) : null}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
