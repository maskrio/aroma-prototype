// Fake data for prototype — no backend, everything is client-side sample data.

export interface Category {
  id: string;
  nama: string;
  ikon: string; // emoji as placeholder for real icons
  warna: string; // tailwind bg class
}

export interface Unit {
  id: string;
  nama: string;
  singkatan: string;
}

export interface VariantPrice {
  unitId: string;
  harga: number;
  konversi: number; // to base unit (pcs)
}

export interface Variant {
  id: string;
  nama: string; // e.g. "Indomie Goreng 85gr"
  namaPendek: string; // e.g. "Indomie Goreng"
  brand: string;
  kategoriId: string;
  emoji: string; // visual placeholder for product photo
  warnaBg: string; // tile background color
  harga: VariantPrice[];
  stok: number; // in base unit (pcs)
  barcode?: string;
}

export const categories: Category[] = [
  { id: "mie", nama: "Mie Instan", ikon: "🍜", warna: "bg-amber-100 text-amber-900" },
  { id: "minuman", nama: "Minuman", ikon: "🥤", warna: "bg-blue-100 text-blue-900" },
  { id: "snack", nama: "Snack", ikon: "🍪", warna: "bg-pink-100 text-pink-900" },
  { id: "sabun", nama: "Sabun & Deterjen", ikon: "🧼", warna: "bg-cyan-100 text-cyan-900" },
  { id: "plastik", nama: "Plastik & Kertas", ikon: "🛍️", warna: "bg-slate-100 text-slate-900" },
  { id: "rokok", nama: "Rokok", ikon: "🚬", warna: "bg-stone-100 text-stone-900" },
  { id: "bumbu", nama: "Bumbu Dapur", ikon: "🧂", warna: "bg-yellow-100 text-yellow-900" },
  { id: "beras", nama: "Beras & Minyak", ikon: "🌾", warna: "bg-emerald-100 text-emerald-900" },
];

export const units: Unit[] = [
  { id: "pcs", nama: "Pieces", singkatan: "pcs" },
  { id: "pak", nama: "Pak", singkatan: "pak" },
  { id: "lusin", nama: "Lusin", singkatan: "lusin" },
  { id: "bak", nama: "Bak", singkatan: "bak" },
  { id: "kg", nama: "Kilogram", singkatan: "kg" },
  { id: "btl", nama: "Botol", singkatan: "btl" },
];

export const variants: Variant[] = [
  {
    id: "v001",
    nama: "Indomie Goreng 85gr",
    namaPendek: "Indomie Goreng",
    brand: "Indofood",
    kategoriId: "mie",
    emoji: "🍜",
    warnaBg: "bg-amber-100",
    stok: 240,
    barcode: "8992388101010",
    harga: [
      { unitId: "pcs", harga: 3500, konversi: 1 },
      { unitId: "lusin", harga: 40000, konversi: 12 },
      { unitId: "bak", harga: 155000, konversi: 48 },
    ],
  },
  {
    id: "v002",
    nama: "Indomie Soto 75gr",
    namaPendek: "Indomie Soto",
    brand: "Indofood",
    kategoriId: "mie",
    emoji: "🍲",
    warnaBg: "bg-orange-100",
    stok: 180,
    harga: [
      { unitId: "pcs", harga: 3500, konversi: 1 },
      { unitId: "lusin", harga: 40000, konversi: 12 },
    ],
  },
  {
    id: "v003",
    nama: "Mie Sedaap Goreng 90gr",
    namaPendek: "M. Sedaap Goreng",
    brand: "Wings",
    kategoriId: "mie",
    emoji: "🍝",
    warnaBg: "bg-red-100",
    stok: 120,
    harga: [
      { unitId: "pcs", harga: 3200, konversi: 1 },
      { unitId: "lusin", harga: 37000, konversi: 12 },
    ],
  },
  {
    id: "v004",
    nama: "Aqua Botol 600ml",
    namaPendek: "Aqua 600ml",
    brand: "Aqua",
    kategoriId: "minuman",
    emoji: "💧",
    warnaBg: "bg-blue-100",
    stok: 96,
    harga: [
      { unitId: "btl", harga: 4000, konversi: 1 },
      { unitId: "pak", harga: 45000, konversi: 12 },
    ],
  },
  {
    id: "v005",
    nama: "Teh Botol Sosro 450ml",
    namaPendek: "Teh Botol",
    brand: "Sosro",
    kategoriId: "minuman",
    emoji: "🍵",
    warnaBg: "bg-amber-100",
    stok: 60,
    harga: [
      { unitId: "btl", harga: 5000, konversi: 1 },
      { unitId: "pak", harga: 55000, konversi: 12 },
    ],
  },
  {
    id: "v006",
    nama: "Coca Cola 390ml",
    namaPendek: "Coca Cola",
    brand: "Coca Cola",
    kategoriId: "minuman",
    emoji: "🥤",
    warnaBg: "bg-red-100",
    stok: 48,
    harga: [
      { unitId: "btl", harga: 6000, konversi: 1 },
      { unitId: "pak", harga: 68000, konversi: 12 },
    ],
  },
  {
    id: "v007",
    nama: "Chitato Sapi Panggang 68gr",
    namaPendek: "Chitato Sapi",
    brand: "Indofood",
    kategoriId: "snack",
    emoji: "🍟",
    warnaBg: "bg-yellow-100",
    stok: 40,
    harga: [
      { unitId: "pcs", harga: 10000, konversi: 1 },
      { unitId: "lusin", harga: 115000, konversi: 12 },
    ],
  },
  {
    id: "v008",
    nama: "Chiki Balls Keju 55gr",
    namaPendek: "Chiki Balls",
    brand: "Indofood",
    kategoriId: "snack",
    emoji: "🧀",
    warnaBg: "bg-yellow-200",
    stok: 72,
    harga: [
      { unitId: "pcs", harga: 5000, konversi: 1 },
      { unitId: "lusin", harga: 58000, konversi: 12 },
    ],
  },
  {
    id: "v009",
    nama: "Rinso Bubuk 800gr",
    namaPendek: "Rinso 800gr",
    brand: "Unilever",
    kategoriId: "sabun",
    emoji: "🧺",
    warnaBg: "bg-cyan-100",
    stok: 30,
    harga: [
      { unitId: "pcs", harga: 18000, konversi: 1 },
      { unitId: "lusin", harga: 210000, konversi: 12 },
    ],
  },
  {
    id: "v010",
    nama: "Sunlight 800ml",
    namaPendek: "Sunlight 800ml",
    brand: "Unilever",
    kategoriId: "sabun",
    emoji: "🍋",
    warnaBg: "bg-lime-100",
    stok: 24,
    harga: [
      { unitId: "btl", harga: 15000, konversi: 1 },
      { unitId: "pak", harga: 170000, konversi: 12 },
    ],
  },
  {
    id: "v011",
    nama: "Gelas Plastik 12oz Clear pak 50",
    namaPendek: "Gelas 12oz pak 50",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🥤",
    warnaBg: "bg-slate-100",
    stok: 60,
    harga: [
      { unitId: "pcs", harga: 400, konversi: 1 },
      { unitId: "pak", harga: 15000, konversi: 50 },
      { unitId: "lusin", harga: 170000, konversi: 600 },
    ],
  },
  {
    id: "v012",
    nama: "Gelas Plastik 8oz Clear pak 50",
    namaPendek: "Gelas 8oz pak 50",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🧊",
    warnaBg: "bg-slate-100",
    stok: 40,
    harga: [
      { unitId: "pcs", harga: 300, konversi: 1 },
      { unitId: "pak", harga: 12000, konversi: 50 },
    ],
  },
  {
    id: "v013",
    nama: "Sedotan Plastik pak 100",
    namaPendek: "Sedotan pak 100",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "🥤",
    warnaBg: "bg-stone-100",
    stok: 80,
    harga: [
      { unitId: "pak", harga: 8000, konversi: 100 },
      { unitId: "lusin", harga: 90000, konversi: 1200 },
    ],
  },
  {
    id: "v014",
    nama: "Gudang Garam Surya 16",
    namaPendek: "GG Surya 16",
    brand: "Gudang Garam",
    kategoriId: "rokok",
    emoji: "🚬",
    warnaBg: "bg-stone-100",
    stok: 36,
    harga: [
      { unitId: "pak", harga: 32000, konversi: 16 },
      { unitId: "lusin", harga: 380000, konversi: 192 },
    ],
  },
  {
    id: "v015",
    nama: "Sampoerna Mild 16",
    namaPendek: "Sampoerna Mild",
    brand: "Sampoerna",
    kategoriId: "rokok",
    emoji: "🚬",
    warnaBg: "bg-red-100",
    stok: 24,
    harga: [
      { unitId: "pak", harga: 35000, konversi: 16 },
    ],
  },
  {
    id: "v016",
    nama: "Garam Halus 250gr",
    namaPendek: "Garam 250gr",
    brand: "Cap Kapal",
    kategoriId: "bumbu",
    emoji: "🧂",
    warnaBg: "bg-slate-100",
    stok: 50,
    harga: [
      { unitId: "pcs", harga: 3000, konversi: 1 },
      { unitId: "lusin", harga: 35000, konversi: 12 },
    ],
  },
  {
    id: "v017",
    nama: "Kecap Manis ABC 600ml",
    namaPendek: "Kecap ABC 600ml",
    brand: "ABC",
    kategoriId: "bumbu",
    emoji: "🍶",
    warnaBg: "bg-amber-100",
    stok: 20,
    harga: [
      { unitId: "btl", harga: 22000, konversi: 1 },
    ],
  },
  {
    id: "v018",
    nama: "Bimoli Minyak Goreng 1L",
    namaPendek: "Bimoli 1L",
    brand: "Bimoli",
    kategoriId: "beras",
    emoji: "🫒",
    warnaBg: "bg-yellow-100",
    stok: 15,
    harga: [
      { unitId: "btl", harga: 22000, konversi: 1 },
      { unitId: "pak", harga: 250000, konversi: 12 },
    ],
  },
  {
    id: "v019",
    nama: "Beras Premium 5kg",
    namaPendek: "Beras 5kg",
    brand: "Rojolele",
    kategoriId: "beras",
    emoji: "🌾",
    warnaBg: "bg-emerald-100",
    stok: 12,
    harga: [
      { unitId: "pcs", harga: 75000, konversi: 1 },
    ],
  },
  {
    id: "v020",
    nama: "Good Day Mocacinno sachet",
    namaPendek: "Good Day Moca",
    brand: "Mayora",
    kategoriId: "minuman",
    emoji: "☕",
    warnaBg: "bg-amber-200",
    stok: 200,
    harga: [
      { unitId: "pcs", harga: 2000, konversi: 1 },
      { unitId: "lusin", harga: 22000, konversi: 10 },
    ],
  },
];

// IDs of items flagged as "Favorit" on the cashier main screen.
export const favoritIds: string[] = [
  "v001", "v004", "v006", "v011", "v007", "v009", "v018", "v014", "v020", "v002", "v010", "v005",
];

export function findVariant(id: string): Variant | undefined {
  return variants.find((v) => v.id === id);
}

export function findUnit(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}

export function findCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function variantsByCategory(catId: string): Variant[] {
  return variants.filter((v) => v.kategoriId === catId);
}

export function searchVariants(query: string): Variant[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return variants.filter((v) =>
    v.nama.toLowerCase().includes(q) ||
    v.namaPendek.toLowerCase().includes(q) ||
    v.brand.toLowerCase().includes(q),
  );
}

export function hargaUntuk(variant: Variant, unitId: string): number {
  return variant.harga.find((h) => h.unitId === unitId)?.harga ?? 0;
}

// -----------------------------------------------------------------------------
// Inventory movements (append-only ledger) — simulated for the last 60 days.
// In the real system this will live in Postgres; here we generate it client-side
// so the stock-comparison screen has something to chart.
// -----------------------------------------------------------------------------

export interface InventoryMovement {
  variantId: string;
  type: "BELI" | "JUAL"; // buy (masuk), sell (keluar)
  qty: number;           // always in base unit (pcs)
  date: string;          // YYYY-MM-DD (local)
  hargaSatuan: number;   // per pcs, for omset calculation
}

// Deterministic PRNG so the demo numbers don't change between renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const HISTORY_DAYS = 60;

function generateMovements(): InventoryMovement[] {
  const out: InventoryMovement[] = [];
  const rng = mulberry32(42);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const v of variants) {
    // Rough daily sell rate scaled to current stock.
    const baseSellRate = Math.max(1, Math.round(v.stok / 18));
    for (let back = HISTORY_DAYS; back >= 0; back--) {
      const d = new Date(today);
      d.setDate(today.getDate() - back);
      const dateStr = ymd(d);

      // Weekend bump (6=Sat, 0=Sun)
      const dow = d.getDay();
      const weekendMult = dow === 0 || dow === 6 ? 1.4 : 1;

      // Daily sales (sometimes zero for slow-movers).
      const saleQty = Math.floor(rng() * baseSellRate * 2 * weekendMult);
      if (saleQty > 0) {
        out.push({
          variantId: v.id,
          type: "JUAL",
          qty: saleQty,
          date: dateStr,
          hargaSatuan: v.harga[0]?.harga ?? 0,
        });
      }
      // Restock roughly once every 8-10 days.
      if (rng() < 0.11) {
        const buyQty = Math.floor(rng() * baseSellRate * 30) + 20;
        // Buy price is cheaper than sell price (~15-25% margin).
        const hargaBeli = Math.round((v.harga[0]?.harga ?? 0) * (0.7 + rng() * 0.15));
        out.push({
          variantId: v.id,
          type: "BELI",
          qty: buyQty,
          date: dateStr,
          hargaSatuan: hargaBeli,
        });
      }
    }
  }
  return out;
}

export const inventoryMovements: InventoryMovement[] = generateMovements();

/**
 * Stock of a variant at end-of-day on the given date.
 * Works by starting from current stock (today) and rewinding movements after `date`.
 */
export function stockOnDate(variantId: string, date: Date): number {
  const v = findVariant(variantId);
  if (!v) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() >= today.getTime()) return v.stok;

  const targetStr = ymd(target);
  // Movements strictly AFTER target date.
  let delta = 0;
  for (const m of inventoryMovements) {
    if (m.variantId !== variantId) continue;
    if (m.date > targetStr) {
      delta += m.type === "BELI" ? m.qty : -m.qty;
    }
  }
  return v.stok - delta;
}

/** Movements where targetDate > from and targetDate <= to (inclusive of `to`). */
export function movementsBetween(
  variantId: string,
  from: Date,
  to: Date,
): InventoryMovement[] {
  const fromStr = ymd(from);
  const toStr = ymd(to);
  return inventoryMovements.filter(
    (m) =>
      m.variantId === variantId &&
      m.date > fromStr &&
      m.date <= toStr,
  );
}

export interface StockCompareRow {
  variantId: string;
  stokA: number;
  stokB: number;
  beli: number;
  jual: number;
  omsetJual: number;
  biayaBeli: number;
}

export function buildStockCompare(
  from: Date,
  to: Date,
  variantIds: string[] = variants.map((v) => v.id),
): StockCompareRow[] {
  return variantIds.map((id) => {
    const moves = movementsBetween(id, from, to);
    const beli = moves.filter((m) => m.type === "BELI").reduce((s, m) => s + m.qty, 0);
    const jual = moves.filter((m) => m.type === "JUAL").reduce((s, m) => s + m.qty, 0);
    const omsetJual = moves
      .filter((m) => m.type === "JUAL")
      .reduce((s, m) => s + m.qty * m.hargaSatuan, 0);
    const biayaBeli = moves
      .filter((m) => m.type === "BELI")
      .reduce((s, m) => s + m.qty * m.hargaSatuan, 0);
    return {
      variantId: id,
      stokA: stockOnDate(id, from),
      stokB: stockOnDate(id, to),
      beli,
      jual,
      omsetJual,
      biayaBeli,
    };
  });
}

// Fake "pending orders" queue for owner dashboard.
export interface FakeOrder {
  id: string;
  nomor: string;
  kasirNama: string;
  waktu: Date;
  items: Array<{ variantId: string; unitId: string; qty: number }>;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

export const fakeOrders: FakeOrder[] = [
  {
    id: "ord_1",
    nomor: "#0041",
    kasirNama: "Budi",
    waktu: new Date(Date.now() - 2 * 60000),
    status: "PENDING",
    items: [
      { variantId: "v001", unitId: "pcs", qty: 3 },
      { variantId: "v004", unitId: "btl", qty: 2 },
    ],
  },
  {
    id: "ord_2",
    nomor: "#0040",
    kasirNama: "Siti",
    waktu: new Date(Date.now() - 5 * 60000),
    status: "PENDING",
    items: [
      { variantId: "v011", unitId: "pak", qty: 1 },
      { variantId: "v009", unitId: "pcs", qty: 1 },
    ],
  },
  {
    id: "ord_3",
    nomor: "#0039",
    kasirNama: "Budi",
    waktu: new Date(Date.now() - 8 * 60000),
    status: "PENDING",
    items: [
      { variantId: "v020", unitId: "lusin", qty: 2 },
    ],
  },
];

// -----------------------------------------------------------------------------
// Receipt history — confirmed past orders spread over the last 14 days.
// Shape matches the snapshot written to sessionStorage by the owner-approve flow
// so /pemilik/struk/[id] can render historical orders with the same component.
// -----------------------------------------------------------------------------

export interface PastOrderLine {
  variantId: string;
  unitId: string;
  qty: number;
  hargaAsli: number;
  hargaNego: number;
  adjusted: boolean;
}

export interface PastOrder {
  id: string;
  nomor: string;
  kasirNama: string;
  approvedAt: string; // ISO
  lines: PastOrderLine[];
  subtotalAsli: number;
  subtotalNego: number;
  potongan: number;
  totalAkhir: number;
  catatan: string;
}

function generatePastOrders(): PastOrder[] {
  const orders: PastOrder[] = [];
  const rng = mulberry32(1337);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const kasirs = ["Budi", "Siti", "Ani", "Rudi"];
  let ordNum = 38; // numbering stops below the current pending #0039-#0041

  for (let back = 14; back >= 1; back--) {
    const date = new Date(today);
    date.setDate(today.getDate() - back);
    // Slightly busier on weekends.
    const dow = date.getDay();
    const weekendBoost = dow === 0 || dow === 6 ? 1 : 0;
    const ordersToday = Math.floor(rng() * 3) + 1 + weekendBoost; // 1-4

    for (let i = 0; i < ordersToday; i++) {
      const itemCount = Math.floor(rng() * 4) + 1; // 1-4 unique items
      const chosen = new Set<string>();
      for (let j = 0; j < itemCount * 2 && chosen.size < itemCount; j++) {
        chosen.add(variants[Math.floor(rng() * variants.length)].id);
      }

      let anyAdjusted = false;
      const lines: PastOrderLine[] = [...chosen].map((id) => {
        const v = findVariant(id)!;
        const priceRow = v.harga[Math.floor(rng() * v.harga.length)];
        const unitId = priceRow.unitId;
        const hargaAsli = priceRow.harga;
        const qty = Math.floor(rng() * 4) + 1;
        const doNego = rng() < 0.15;
        if (doNego) anyAdjusted = true;
        const hargaNego = doNego
          ? Math.floor((hargaAsli * (0.85 + rng() * 0.1)) / 500) * 500
          : hargaAsli;
        return { variantId: id, unitId, qty, hargaAsli, hargaNego, adjusted: doNego };
      });

      const subtotalAsli = lines.reduce((s, l) => s + l.hargaAsli * l.qty, 0);
      const subtotalNego = lines.reduce((s, l) => s + l.hargaNego * l.qty, 0);
      const doPotongan = rng() < 0.2;
      const potongan = doPotongan ? (Math.floor(rng() * 5) + 1) * 1000 : 0;
      const totalAkhir = Math.max(0, subtotalNego - potongan);

      const approved = new Date(date);
      approved.setHours(9 + Math.floor(rng() * 11), Math.floor(rng() * 60));
      const catatan = anyAdjusted ? "Pelanggan nego" : "";

      orders.push({
        id: `past_${ordNum}`,
        nomor: `#${String(ordNum).padStart(4, "0")}`,
        kasirNama: kasirs[Math.floor(rng() * kasirs.length)],
        approvedAt: approved.toISOString(),
        lines,
        subtotalAsli,
        subtotalNego,
        potongan,
        totalAkhir,
        catatan,
      });
      ordNum--;
    }
  }
  // Most recent first.
  return orders.sort((a, b) => b.approvedAt.localeCompare(a.approvedAt));
}

export const pastOrders: PastOrder[] = generatePastOrders();

export function findPastOrder(id: string): PastOrder | undefined {
  return pastOrders.find((o) => o.id === id);
}
