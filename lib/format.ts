export function rupiah(amount: number): string {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(amount));
}

export function waktu(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function waktuLalu(from: Date): string {
  const diffMs = Date.now() - from.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}
