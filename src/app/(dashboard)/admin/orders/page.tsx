import { db } from "@/lib/db";

export default async function AdminOrders() {
  const orders = await db.order.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">${Number(o.total).toFixed(2)}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
