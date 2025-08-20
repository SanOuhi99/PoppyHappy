import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const form = await req.formData();
  const name = String(form.get("name") ?? "");
  const description = String(form.get("description") ?? "");
  const price = Number(form.get("price") ?? 0);
  const category = String(form.get("category") ?? "");

  const updated = await db.product.update({
    where: { id: params.id },
    data: { name, description, price, category }
  });
  return Response.json(updated);
}
