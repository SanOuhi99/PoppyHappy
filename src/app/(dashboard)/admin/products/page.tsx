import Link from "next/link";
import { db } from "@/lib/db";

export default async function AdminProducts() {
  const products = await db.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href="/admin/products/new" className="px-4 py-2 rounded bg-indigo-600 text-white">Add Product</Link>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">{p.inStock ? "In stock" : "Out of stock"}</td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="text-indigo-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
