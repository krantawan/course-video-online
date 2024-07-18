import Link from "next/link";

export default function AdminNav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/user-management">User Management</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
