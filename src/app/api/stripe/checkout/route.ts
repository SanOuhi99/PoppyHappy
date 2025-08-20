import Stripe from "stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_URL) {
    return new Response(JSON.stringify({ error: "Stripe not configured" }), { status: 400 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: process.env.NEXT_PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.NEXT_PUBLIC_URL + "/cart?canceled=1",
    line_items: (items ?? []).map((i:any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.name },
        unit_amount: Math.round(Number(i.price) * 100),
      },
      quantity: Number(i.quantity ?? 1)
    }))
  });
  return Response.json({ url: session.url });
}
