import { PrismaClient } from '@prisma/client';
import slugify from './slugify';

const prisma = new PrismaClient();

const products = [
  {
    name: "Premium Dog Chew Toys",
    description: "Durable, non-toxic chew toys to keep dogs entertained and support dental health.",
    price: 12.99,
    originalPrice: 19.99,
    category: "Toys",
    images: ["/images/chew-toy-1.jpg"],
  },
  {
    name: "Cozy Pet House",
    description: "Warm, comfortable pet house for small to medium pets with removable cushion.",
    price: 45.99,
    originalPrice: 69.99,
    category: "Beds",
    images: ["/images/pet-house-1.jpg"],
  },
  {
    name: "Smart Feeding Bowl",
    description: "Anti-slip bowl with measurement markings for portion control.",
    price: 28.99,
    category: "Feeding",
    images: ["/images/feeding-bowl-1.jpg"],
  },
  {
    name: "Interactive Ball Launcher",
    description: "Automatic ball launcher to keep your dog active and happy.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Toys",
    images: ["/images/ball-launcher-1.jpg"],
  },
  {
    name: "LED Safety Collar",
    description: "USB-rechargeable LED collar for nighttime walks. Adjustable sizes.",
    price: 19.99,
    category: "Accessories",
    images: ["/images/led-collar-1.jpg"],
  },
  {
    name: "Pet Grooming Kit",
    description: "Complete grooming set with brushes, nail clipper, and comb.",
    price: 34.99,
    category: "Grooming",
    images: ["/images/grooming-kit-1.jpg"],
  }
];

async function main() {
  // Upsert an admin
  await prisma.user.upsert({
    where: { email: "admin@poppyhappy.com" },
    update: {},
    create: {
      email: "admin@poppyhappy.com",
      name: "Admin",
      role: "ADMIN",
      password: "$2a$10$FJQWq3C6Vg7uK3b9B8VZAuH8nZrjB5L7Qm4eQ4Ew4Yd8X5o5I1xgq" // "admin123" (bcrypt)
    }
  });

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: slugify(p.name) },
      update: {},
      create: {
        name: p.name,
        slug: slugify(p.name),
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        category: p.category,
        images: p.images,
        variants: { size: ["S","M","L"], color: ["Red","Blue","Black"] },
        inStock: true,
        rating: 4.7,
        reviews: 120
      }
    });
  }

  console.log("Seed completed");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
