# Toko Demo — Prototipe

UI-only clickable mockup for the store management app.  100% Bahasa Indonesia, designed mobile-first for older/less-tech-savvy workers.  No backend, no real data — everything is stored in localStorage / sessionStorage on the device.

## Menjalankan (Running)

```bash
cd prototype
npm install
npm run dev
```

Then open <http://localhost:3000>.  Best viewed on a phone-sized viewport (~400px) — use Chrome DevTools → Device Toolbar (⌘ Shift M) and pick "iPhone 14" or "Pixel 7".

## Peta layar (Screen map)

Landing (`/`) → pick role.

### Kasir (Cashier)
| Path | Screen |
|---|---|
| `/kasir/login` | Pick name → 4-digit PIN (any PIN works) |
| `/kasir` | Main: Favorit / Kategori / Semua tabs + search + scan button |
| `/kasir/produk/[id]` | Product detail: unit selector + qty stepper + "Tambah N × Rp" |
| `/kasir/keranjang` | Cart review with per-line qty steppers |
| `/kasir/tunggu` | Waiting for owner approval (simulated 4s) |
| `/kasir/selesai/[id]` | Approved — summary + "Lihat Struk" |
| `/kasir/struk/[id]` | Printable receipt (⌘P works) |

### Pemilik (Owner)
| Path | Screen |
|---|---|
| `/pemilik/login` | 4-digit PIN |
| `/pemilik` | Dashboard: KPIs + pending orders queue |
| `/pemilik/pesanan/[id]` | Order detail with Setujui / Batal |
| `/pemilik/katalog` | Searchable product list + 3 bulk-input CTAs |
| `/pemilik/katalog/[id]` | Edit single variant: name, category, stock, per-unit pricing matrix |
| `/pemilik/katalog/baru` | 3-step wizard: info → axes (e.g. Ukuran × Rasa) → price grid |
| `/pemilik/katalog/impor` | Excel preview with ✓/⚠/✕ row status |
| `/pemilik/katalog/buku` | Notebook OCR mockup: camera → progress → review with confidence scores |

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (CSS variables in `app/globals.css`)
- Zero external component libs — everything in `components/` is hand-rolled so it can be re-skinned easily

## Design tokens

- Primary (`--primary`): emerald `#047857` — kasir brand
- Accent (`--accent`): orange `#ea580c` — pemilik brand + alerts
- Body: 18px — larger than default for older eyes
- All tap targets ≥ 56px high (primary buttons 72px)
- No reliance on hover states — everything works on touch
- Max one textual task per screen; favorites/icons reduce typing

## What's fake

- No backend.  Cart lives in localStorage, orders in sessionStorage.
- Login PIN always passes.  All 4 cashier names exist.
- Owner "approval" is a 4-second setTimeout inside `/kasir/tunggu`.
- Excel import shows a fixed 15-row preview; notebook OCR shows 12 fixed "extracted" items.
- Dashboard KPIs are computed from the fake order list.

## What's next after sign-off

See `../ARCHITECTURE.md` for the real-system data model and `../ROADMAP.md` for the phased build plan.
