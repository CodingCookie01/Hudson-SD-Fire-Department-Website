import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "3rem", fontFamily: "sans-serif" }}>
      <h1>Hudson Fire Department</h1>
      <p>Public website content remains here.</p>
      <div style={{ marginTop: "1.5rem" }}>
        <Link href="/admin/login">Admin Login</Link>
      </div>
    </main>
  );
}
