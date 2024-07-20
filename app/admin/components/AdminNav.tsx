"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavData = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/UserManagement", label: "Users" },
  { href: "/admin/CourseManagement", label: "Courses" },
  { href: "/admin/ReviewManagement", label: "Reviews" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    } else {
      return pathname.startsWith(path);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul>
          {NavData.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg text-gray-700 block mb-2 ${
                isActive(href)
                  ? "border-r-4 border-indigo-500 bg-slate-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <li className="p-5">{label}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
