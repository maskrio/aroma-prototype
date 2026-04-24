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
  { id: "plastik", nama: "Plastik & Kemasan", ikon: "🛍️", warna: "bg-slate-100 text-slate-900" },
  { id: "minuman", nama: "Minuman", ikon: "🥤", warna: "bg-blue-100 text-blue-900" },
  { id: "bahan-kue", nama: "Bahan Kue", ikon: "🎂", warna: "bg-pink-100 text-pink-900" },
  { id: "snack", nama: "Snack & Coklat", ikon: "🍫", warna: "bg-amber-100 text-amber-900" },
];

export const units: Unit[] = [
  { id: "pcs", nama: "Pieces", singkatan: "pcs" },
  { id: "pak", nama: "Pak", singkatan: "pak" },
  { id: "lusin", nama: "Lusin", singkatan: "lusin" },
  { id: "bak", nama: "Bak / Karton", singkatan: "bak" },
  { id: "kg", nama: "Kilogram", singkatan: "kg" },
  { id: "btl", nama: "Botol", singkatan: "btl" },
  { id: "sachet", nama: "Sachet", singkatan: "sachet" },
  { id: "bal", nama: "Bal", singkatan: "bal" },
];

export const variants: Variant[] = [
  // --- PLASTIK & KEMASAN ---
  {
    id: "plk001",
    nama: "Gelas Plastik 12oz Clear pak 50",
    namaPendek: "Gelas 12oz Merapi",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🧋",
    warnaBg: "bg-slate-100",
    stok: 800,
    barcode: "8990123412001",
    harga: [
      { unitId: "pcs", harga: 400, konversi: 1 },
      { unitId: "pak", harga: 18000, konversi: 50 },
      { unitId: "bal", harga: 340000, konversi: 1000 },
    ],
  },
  {
    id: "plk002",
    nama: "Gelas Plastik 14oz Clear pak 50",
    namaPendek: "Gelas 14oz Merapi",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🥤",
    warnaBg: "bg-slate-100",
    stok: 650,
    harga: [
      { unitId: "pcs", harga: 500, konversi: 1 },
      { unitId: "pak", harga: 22000, konversi: 50 },
      { unitId: "bal", harga: 420000, konversi: 1000 },
    ],
  },
  {
    id: "plk003",
    nama: "Gelas Plastik 16oz Clear pak 50",
    namaPendek: "Gelas 16oz Merapi",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🥤",
    warnaBg: "bg-stone-100",
    stok: 500,
    harga: [
      { unitId: "pcs", harga: 600, konversi: 1 },
      { unitId: "pak", harga: 26000, konversi: 50 },
    ],
  },
  {
    id: "plk004",
    nama: "Gelas Plastik 22oz Clear pak 50",
    namaPendek: "Gelas 22oz Merapi",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🥤",
    warnaBg: "bg-zinc-100",
    stok: 300,
    harga: [
      { unitId: "pcs", harga: 700, konversi: 1 },
      { unitId: "pak", harga: 32000, konversi: 50 },
    ],
  },
  {
    id: "plk005",
    nama: "Gelas Plastik 12oz Clear pak 50 Star Cup",
    namaPendek: "Gelas 12oz Star",
    brand: "Star Cup",
    kategoriId: "plastik",
    emoji: "🧋",
    warnaBg: "bg-slate-100",
    stok: 450,
    harga: [
      { unitId: "pcs", harga: 380, konversi: 1 },
      { unitId: "pak", harga: 17000, konversi: 50 },
    ],
  },
  {
    id: "plk006",
    nama: "Tutup Gelas Flat 12oz pak 100",
    namaPendek: "Tutup Flat 12oz",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "⚪",
    warnaBg: "bg-slate-100",
    stok: 600,
    harga: [
      { unitId: "pcs", harga: 150, konversi: 1 },
      { unitId: "pak", harga: 14000, konversi: 100 },
    ],
  },
  {
    id: "plk007",
    nama: "Tutup Gelas Dome 14oz pak 100",
    namaPendek: "Tutup Dome 14oz",
    brand: "Merapi",
    kategoriId: "plastik",
    emoji: "🔘",
    warnaBg: "bg-stone-100",
    stok: 400,
    harga: [
      { unitId: "pcs", harga: 180, konversi: 1 },
      { unitId: "pak", harga: 16500, konversi: 100 },
    ],
  },
  {
    id: "plk008",
    nama: "Sedotan Boba Plastik pak 100",
    namaPendek: "Sedotan Boba",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "🥢",
    warnaBg: "bg-stone-100",
    stok: 800,
    harga: [
      { unitId: "pcs", harga: 200, konversi: 1 },
      { unitId: "pak", harga: 16000, konversi: 100 },
    ],
  },
  {
    id: "plk009",
    nama: "Sedotan Plastik Biasa pak 100",
    namaPendek: "Sedotan Biasa",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "🥢",
    warnaBg: "bg-slate-100",
    stok: 1200,
    harga: [
      { unitId: "pcs", harga: 80, konversi: 1 },
      { unitId: "pak", harga: 7500, konversi: 100 },
    ],
  },
  {
    id: "plk010",
    nama: "Kantong Kresek L Hitam pak 100",
    namaPendek: "Kresek L Hitam",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "🛍️",
    warnaBg: "bg-stone-200",
    stok: 350,
    harga: [
      { unitId: "pcs", harga: 350, konversi: 1 },
      { unitId: "pak", harga: 32000, konversi: 100 },
    ],
  },
  {
    id: "plk011",
    nama: "Kantong Plastik HD 20x35 pak 100",
    namaPendek: "Plastik HD 20x35",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "📦",
    warnaBg: "bg-slate-100",
    stok: 500,
    harga: [
      { unitId: "pcs", harga: 200, konversi: 1 },
      { unitId: "pak", harga: 19000, konversi: 100 },
    ],
  },
  {
    id: "plk012",
    nama: "Mangkuk Plastik 650ml pak 25",
    namaPendek: "Mangkuk 650ml",
    brand: "Generik",
    kategoriId: "plastik",
    emoji: "🥣",
    warnaBg: "bg-stone-100",
    stok: 200,
    harga: [
      { unitId: "pcs", harga: 1200, konversi: 1 },
      { unitId: "pak", harga: 28000, konversi: 25 },
    ],
  },
  // --- MINUMAN ---
  {
    id: "mnm001",
    nama: "Aqua Botol 600ml",
    namaPendek: "Aqua 600ml",
    brand: "Aqua",
    kategoriId: "minuman",
    emoji: "💧",
    warnaBg: "bg-blue-100",
    stok: 240,
    barcode: "8992713001119",
    harga: [
      { unitId: "btl", harga: 3500, konversi: 1 },
      { unitId: "pak", harga: 42000, konversi: 12 },
      { unitId: "bak", harga: 72000, konversi: 24 },
    ],
  },
  {
    id: "mnm002",
    nama: "Aqua Botol 1500ml",
    namaPendek: "Aqua 1500ml",
    brand: "Aqua",
    kategoriId: "minuman",
    emoji: "💧",
    warnaBg: "bg-blue-100",
    stok: 96,
    harga: [
      { unitId: "btl", harga: 7000, konversi: 1 },
      { unitId: "pak", harga: 80000, konversi: 12 },
    ],
  },
  {
    id: "mnm003",
    nama: "Le Minerale 600ml",
    namaPendek: "Le Minerale",
    brand: "Le Minerale",
    kategoriId: "minuman",
    emoji: "💧",
    warnaBg: "bg-cyan-100",
    stok: 144,
    harga: [
      { unitId: "btl", harga: 4000, konversi: 1 },
      { unitId: "pak", harga: 46000, konversi: 12 },
    ],
  },
  {
    id: "mnm004",
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
    id: "mnm005",
    nama: "Teh Pucuk Harum 350ml",
    namaPendek: "Teh Pucuk",
    brand: "Mayora",
    kategoriId: "minuman",
    emoji: "🍵",
    warnaBg: "bg-green-100",
    stok: 72,
    harga: [
      { unitId: "btl", harga: 4000, konversi: 1 },
      { unitId: "pak", harga: 44000, konversi: 12 },
    ],
  },
  {
    id: "mnm006",
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
    id: "mnm007",
    nama: "Pocari Sweat 500ml",
    namaPendek: "Pocari Sweat",
    brand: "Otsuka",
    kategoriId: "minuman",
    emoji: "🧃",
    warnaBg: "bg-sky-100",
    stok: 36,
    harga: [
      { unitId: "btl", harga: 8000, konversi: 1 },
      { unitId: "pak", harga: 90000, konversi: 12 },
    ],
  },
  {
    id: "mnm008",
    nama: "Good Day Mocacinno sachet",
    namaPendek: "Good Day Moca",
    brand: "Mayora",
    kategoriId: "minuman",
    emoji: "☕",
    warnaBg: "bg-amber-200",
    stok: 300,
    harga: [
      { unitId: "pcs", harga: 2000, konversi: 1 },
      { unitId: "lusin", harga: 22000, konversi: 10 },
    ],
  },
  // --- BAHAN KUE ---
  {
    id: "kue001",
    nama: "Tepung Terigu Segitiga Biru 1kg",
    namaPendek: "Terigu Segitiga",
    brand: "Bogasari",
    kategoriId: "bahan-kue",
    emoji: "🌾",
    warnaBg: "bg-amber-100",
    stok: 60,
    harga: [
      { unitId: "pcs", harga: 13000, konversi: 1 },
      { unitId: "lusin", harga: 150000, konversi: 12 },
    ],
  },
  {
    id: "kue002",
    nama: "Tepung Terigu Cakra Kembar 1kg",
    namaPendek: "Terigu Cakra",
    brand: "Bogasari",
    kategoriId: "bahan-kue",
    emoji: "🌾",
    warnaBg: "bg-orange-100",
    stok: 40,
    harga: [
      { unitId: "pcs", harga: 15000, konversi: 1 },
      { unitId: "lusin", harga: 175000, konversi: 12 },
    ],
  },
  {
    id: "kue003",
    nama: "Gula Pasir Gulaku 1kg",
    namaPendek: "Gulaku 1kg",
    brand: "Gulaku",
    kategoriId: "bahan-kue",
    emoji: "🍚",
    warnaBg: "bg-yellow-50",
    stok: 50,
    harga: [
      { unitId: "pcs", harga: 16500, konversi: 1 },
      { unitId: "lusin", harga: 195000, konversi: 12 },
    ],
  },
  {
    id: "kue004",
    nama: "Blue Band Margarin Serbaguna 250gr",
    namaPendek: "Blue Band 250gr",
    brand: "Blue Band",
    kategoriId: "bahan-kue",
    emoji: "🧈",
    warnaBg: "bg-yellow-100",
    stok: 48,
    harga: [
      { unitId: "pcs", harga: 12000, konversi: 1 },
      { unitId: "lusin", harga: 140000, konversi: 12 },
    ],
  },
  {
    id: "kue005",
    nama: "Koepoe-Koepoe Ovalet 100gr",
    namaPendek: "Ovalet KPKP",
    brand: "Koepoe-Koepoe",
    kategoriId: "bahan-kue",
    emoji: "🥚",
    warnaBg: "bg-yellow-100",
    stok: 30,
    harga: [
      { unitId: "pcs", harga: 14000, konversi: 1 },
    ],
  },
  {
    id: "kue006",
    nama: "Koepoe-Koepoe Pewarna Merah 30ml",
    namaPendek: "Pewarna Merah",
    brand: "Koepoe-Koepoe",
    kategoriId: "bahan-kue",
    emoji: "🎨",
    warnaBg: "bg-red-100",
    stok: 40,
    harga: [
      { unitId: "pcs", harga: 7500, konversi: 1 },
      { unitId: "lusin", harga: 85000, konversi: 12 },
    ],
  },
  {
    id: "kue007",
    nama: "Koepoe-Koepoe Baking Powder 45gr",
    namaPendek: "Baking Powder",
    brand: "Koepoe-Koepoe",
    kategoriId: "bahan-kue",
    emoji: "🧪",
    warnaBg: "bg-slate-100",
    stok: 35,
    harga: [
      { unitId: "pcs", harga: 8000, konversi: 1 },
      { unitId: "lusin", harga: 92000, konversi: 12 },
    ],
  },
  {
    id: "kue008",
    nama: "Fermipan Ragi Instan 11gr",
    namaPendek: "Ragi Fermipan",
    brand: "Fermipan",
    kategoriId: "bahan-kue",
    emoji: "🍞",
    warnaBg: "bg-amber-100",
    stok: 60,
    harga: [
      { unitId: "pcs", harga: 4500, konversi: 1 },
      { unitId: "lusin", harga: 50000, konversi: 12 },
    ],
  },
  {
    id: "kue009",
    nama: "Pondan Brownies Kukus 400gr",
    namaPendek: "Pondan Brownies",
    brand: "Pondan",
    kategoriId: "bahan-kue",
    emoji: "🧁",
    warnaBg: "bg-amber-200",
    stok: 24,
    harga: [
      { unitId: "pcs", harga: 22000, konversi: 1 },
      { unitId: "lusin", harga: 250000, konversi: 12 },
    ],
  },
  {
    id: "kue010",
    nama: "Pondan Bolu Kukus Ketan Hitam 200gr",
    namaPendek: "Pondan Bolu",
    brand: "Pondan",
    kategoriId: "bahan-kue",
    emoji: "🧁",
    warnaBg: "bg-stone-100",
    stok: 30,
    harga: [
      { unitId: "pcs", harga: 13000, konversi: 1 },
      { unitId: "lusin", harga: 145000, konversi: 12 },
    ],
  },
  {
    id: "kue011",
    nama: "Frisian Flag SKM Putih 385gr",
    namaPendek: "SKM Frisian",
    brand: "Frisian Flag",
    kategoriId: "bahan-kue",
    emoji: "🥫",
    warnaBg: "bg-blue-100",
    stok: 36,
    harga: [
      { unitId: "pcs", harga: 14000, konversi: 1 },
      { unitId: "lusin", harga: 160000, konversi: 12 },
    ],
  },
  {
    id: "kue012",
    nama: "Ceres Meses Coklat 90gr",
    namaPendek: "Ceres Meses",
    brand: "Ceres",
    kategoriId: "bahan-kue",
    emoji: "🍫",
    warnaBg: "bg-amber-100",
    stok: 45,
    harga: [
      { unitId: "pcs", harga: 10500, konversi: 1 },
      { unitId: "lusin", harga: 120000, konversi: 12 },
    ],
  },
  // --- SNACK ---
  {
    id: "snk001",
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
    id: "snk002",
    nama: "SilverQueen Milk Chocolate 65gr",
    namaPendek: "SilverQueen",
    brand: "Silver Queen",
    kategoriId: "snack",
    emoji: "🍫",
    warnaBg: "bg-stone-200",
    stok: 30,
    harga: [
      { unitId: "pcs", harga: 16000, konversi: 1 },
      { unitId: "lusin", harga: 185000, konversi: 12 },
    ],
  },
  {
    id: "snk003",
    nama: "Beng Beng Wafer 20gr",
    namaPendek: "Beng Beng",
    brand: "Mayora",
    kategoriId: "snack",
    emoji: "🍫",
    warnaBg: "bg-amber-100",
    stok: 120,
    harga: [
      { unitId: "pcs", harga: 2500, konversi: 1 },
      { unitId: "lusin", harga: 28000, konversi: 12 },
    ],
  },
];

// IDs of items flagged as "Favorit" on the cashier main screen.
// Ordered roughly by "jual terbanyak" for a plastik-heavy grosir.
export const favoritIds: string[] = [
  "plk001", // Gelas 12oz Merapi
  "plk009", // Sedotan biasa
  "plk010", // Kresek L hitam
  "plk005", // Gelas 12oz Star
  "plk008", // Sedotan boba
  "mnm001", // Aqua 600ml
  "mnm006", // Coca Cola
  "kue001", // Terigu Segitiga
  "kue003", // Gulaku 1kg
  "kue009", // Pondan Brownies
  "mnm008", // Good Day
  "snk003", // Beng Beng
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
      { variantId: "plk001", unitId: "pak", qty: 2 }, // 2 pak gelas 12oz
      { variantId: "mnm001", unitId: "btl", qty: 6 }, // 6 botol Aqua
      { variantId: "plk010", unitId: "pak", qty: 1 }, // 1 pak kresek L
    ],
  },
  {
    id: "ord_2",
    nomor: "#0040",
    kasirNama: "Siti",
    waktu: new Date(Date.now() - 5 * 60000),
    status: "PENDING",
    items: [
      { variantId: "kue001", unitId: "pcs", qty: 3 }, // 3 kg terigu
      { variantId: "kue003", unitId: "pcs", qty: 2 }, // 2 kg gulaku
      { variantId: "kue009", unitId: "pcs", qty: 1 }, // 1 pondan brownies
      { variantId: "kue008", unitId: "pcs", qty: 4 }, // 4 ragi fermipan
    ],
  },
  {
    id: "ord_3",
    nomor: "#0039",
    kasirNama: "Budi",
    waktu: new Date(Date.now() - 8 * 60000),
    status: "PENDING",
    items: [
      { variantId: "plk008", unitId: "pak", qty: 1 }, // sedotan boba
      { variantId: "plk002", unitId: "pak", qty: 1 }, // gelas 14oz
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
