import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
      <header className="sticky top-0 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent">🐕 PoppyHappy</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="hover:text-rose-500">Products</Link>
            <Link href="/cart" className="hover:text-rose-500">Cart</Link>
            <Link href="/admin" className="hover:text-rose-500">Admin</Link>
          </nav>
        </div>
      </header>
      <section className="text-white text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Happy Pets, Happy Life! 🎉</h1>
        <p className="text-lg max-w-2xl mx-auto">Premium pet products designed for joy and durability. Trusted by pet owners worldwide.</p>
        <div className="mt-8">
          <Link href="/products" className="inline-block px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-rose-500 to-amber-400 hover:shadow-xl">Shop Now</Link>
        </div>
      </section>
    </main>
  );
}
