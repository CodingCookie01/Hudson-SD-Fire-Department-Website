import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user?.name || session.user?.email}.</p>

      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <Link href="/admin/fundraisers">Manage Fundraisers</Link>
        <Link href="/admin/staff">Manage Staff</Link>
        <form action="/api/auth/signout" method="post">
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </main>
  );
}
