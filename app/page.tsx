import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[var(--background)] p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-[var(--border)]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--primary)] text-white text-4xl font-bold">
            T
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Toko Demo</h1>
          <p className="mt-2 text-base text-[var(--muted-foreground)]">
            Prototipe aplikasi toko — pilih peran untuk mulai mencoba.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/kasir"
            className="flex h-[72px] w-full items-center justify-center rounded-2xl bg-[var(--primary)] text-xl font-semibold text-white hover:brightness-110 active:scale-[0.98] transition"
          >
            Masuk sebagai Kasir
          </Link>
          <Link
            href="/pemilik"
            className="flex h-[72px] w-full items-center justify-center rounded-2xl bg-[var(--accent)] text-xl font-semibold text-white hover:brightness-110 active:scale-[0.98] transition"
          >
            Masuk sebagai Pemilik
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
          Prototipe UI — semua data adalah contoh.
          <br />
          Tidak ada data yang tersimpan.
        </div>
      </div>
    </div>
  );
}
