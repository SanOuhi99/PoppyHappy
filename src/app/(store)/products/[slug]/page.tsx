import { db } from "@/lib/db";
import Link from "next/link";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await db.product.findUnique({ where: { slug: params.slug } });
  if (!p) return <div className="p-8">Not found</div>;
  return (
    <main className="max-w-5xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-tr from-rose-400 to-amber-300 rounded-2xl h-80 flex items-center justify-center text-7xl">🐶</div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{p.name}</h1>
        <p className="text-gray-600 mb-4">{p.description}</p>
        <div className="text-rose-600 text-2xl font-bold mb-6">${Number(p.price).toFixed(2)}</div>
        <form action="/cart" method="post">
          <button formAction="/api/cart" className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold">Add to Cart</button>
        </form>
        <div className="mt-6">
          <Link href="/products" className="text-indigo-600 hover:underline">← Back to products</Link>
        </div>
      </div>
    </main>
  );
}
