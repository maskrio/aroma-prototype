"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { rupiah, waktuLalu } from "@/lib/format";
import {
  findVariant,
  findUnit,
  hargaUntuk,
  type FakeOrder,
} from "@/lib/fake-data";

interface OrderCardProps {
  order: FakeOrder;
  href: string;
  variant?: "pending" | "confirmed" | "cancelled";
}

export function OrderCard({ order, href, variant = "pending" }: OrderCardProps) {
  const total = order.items.reduce((sum, it) => {
    const v = findVariant(it.variantId);
    if (!v) return sum;
    return sum + hargaUntuk(v, it.unitId) * it.qty;
  }, 0);

  const totalItems = order.items.reduce((s, it) => s + it.qty, 0);

  const ring =
    variant === "pending"
      ? "border-[var(--accent)] shadow-[0_0_0_2px_rgba(234,88,12,0.12)]"
      : variant === "confirmed"
      ? "border-[var(--primary)]"
      : "border-[var(--border)]";

  const badge = {
    pending: { label: "Menunggu", cls: "bg-[var(--accent)] text-white" },
    confirmed: { label: "Disetujui", cls: "bg-[var(--primary)] text-white" },
    cancelled: { label: "Dibatalkan", cls: "bg-[var(--muted)] text-[var(--foreground)]" },
  }[variant];

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-2xl border-2 bg-white p-4 transition active:scale-[0.99] hover:shadow-sm",
        ring,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--foreground)]">
              {order.nomor}
            </span>
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold", badge.cls)}>
              {badge.label}
            </span>
          </div>
          <div className="mt-1 text-sm text-[var(--muted-foreground)]">
            {order.kasirNama} · {waktuLalu(order.waktu)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-[var(--foreground)]">
            {rupiah(total)}
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            {totalItems} item
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-1 text-sm text-[var(--foreground)]">
        {order.items.slice(0, 3).map((it, i) => {
          const v = findVariant(it.variantId);
          const u = findUnit(it.unitId);
          if (!v) return null;
          return (
            <li key={i} className="flex justify-between gap-2">
              <span className="truncate">
                {v.namaPendek}
              </span>
              <span className="shrink-0 text-[var(--muted-foreground)]">
                {it.qty} {u?.singkatan ?? it.unitId}
              </span>
            </li>
          );
        })}
        {order.items.length > 3 ? (
          <li className="text-xs text-[var(--muted-foreground)]">
            + {order.items.length - 3} item lagi…
          </li>
        ) : null}
      </ul>
    </Link>
  );
}
