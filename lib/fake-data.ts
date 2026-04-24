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
