import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return <div className="p-8">Unauthorized. Please sign in as an admin.</div>;
  }
  return <div className="max-w-6xl mx-auto p-6">{children}</div>;
}
