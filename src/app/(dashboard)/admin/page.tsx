import Link from "next/link";
import { db } from "@/lib/db";

export default async function AdminHome() {
  const totalProducts = await db.product.count();
  const totalOrders = await db.order.count();
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 bg-white shadow">
          <div className="text-gray-500">Products</div>
          <div className="text-3xl font-bold">{totalProducts}</div>
          <Link className="text-indigo-600" href="/admin/products">Manage products →</Link>
        </div>
        <div className="rounded-xl p-6 bg-white shadow">
          <div className="text-gray-500">Orders</div>
          <div className="text-3xl font-bold">{totalOrders}</div>
          <Link className="text-indigo-600" href="/admin/orders">Manage orders →</Link>
        </div>
      </div>
    </main>
  );
}
