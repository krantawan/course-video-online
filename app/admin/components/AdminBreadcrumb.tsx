"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminBreadcrumb() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    const pathWithoutQuery = pathname.split("?")[0];
    const pathArray = pathWithoutQuery.split("/").filter((path) => path);
    setBreadcrumbs(pathArray);
  }, [pathname]);

  return (
    <nav className="" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center text-sm font-medium">
          <Link href="/">Home</Link>
        </li>
        {breadcrumbs.map((path, index) => {
          const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
          return (
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <li key={index} className="inline-flex items-center">
                <Link
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  href={href}
                >
                  {path}
                </Link>
              </li>
            </div>
          );
        })}
      </ol>
    </nav>
  );
}
