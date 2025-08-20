import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL ?? ""}/api/products`, { cache: "no-store" });
  // For local dev (NEXT_PUBLIC_URL may not be set)
  if (!res.ok) {
    const res2 = await fetch("http://localhost:3000/api/products", { cache: "no-store" }).catch(() => null as any);
    return res2?.ok ? res2.json() : [];
  }
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="h-48 bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-5xl">🐾</div>
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <div className="text-rose-600 font-bold">${Number(p.price).toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
