import { db } from "@/lib/db";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().optional(),
  category: z.string(),
  images: z.array(z.string()).default([]),
  variants: z.record(z.array(z.string())).optional(),
  inStock: z.boolean().optional()
});

export async function GET() {
  const products = await db.product.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = ProductSchema.parse(body);
  const created = await db.product.create({ data });
  return Response.json(created, { status: 201 });
}
