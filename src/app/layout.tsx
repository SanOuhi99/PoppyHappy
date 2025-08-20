import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PoppyHappy – Premium Pet Supplies",
  description: "Happy Pets, Happy Life! Premium toys, beds, grooming and more.",
  keywords: ["pets","dogs","cats","toys","grooming","collar","beds"],
  openGraph: { title: "PoppyHappy", description: "Premium Pet Supplies", url: "https://poppyhappy.com", siteName: "PoppyHappy" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
