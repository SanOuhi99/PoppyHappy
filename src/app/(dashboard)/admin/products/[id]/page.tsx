import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const p = await db.product.findUnique({ where: { id: params.id } });
  if (!p) return notFound();

  return (
    <main>
      <Link href="/admin/products" className="text-indigo-600">← Back</Link>
      <h1 className="text-2xl font-bold my-4">Edit Product</h1>
      <form action={`/api/products/${p.id}`} method="post" className="grid gap-4 max-w-xl">
        <input name="name" defaultValue={p.name} className="border p-2 rounded" placeholder="Name" />
        <textarea name="description" defaultValue={p.description} className="border p-2 rounded" placeholder="Description" />
        <input name="price" defaultValue={Number(p.price)} className="border p-2 rounded" placeholder="Price" />
        <input name="category" defaultValue={p.category} className="border p-2 rounded" placeholder="Category" />
        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
      </form>
    </main>
  );
}
