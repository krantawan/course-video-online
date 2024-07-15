"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Avatar from "../../public/avatar_default.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userImage = session?.user?.image || Avatar.src;

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    } else {
      return pathname.startsWith(path);
    }
  };

  return (
    <>
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <PlayIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Video Courses</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              prefetch={false}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${isActive("/contact") ? "active" : ""}`}
              prefetch={false}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className={`nav-link ${isActive("/privacy") ? "active" : ""}`}
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>

          {status === "authenticated" && session.user ? (
            <div className="relative">
              <button onClick={toggleDropdown}>
                <img
                  src={userImage as string}
                  alt={session.user.name || "User"}
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 "
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/mycourses"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Courses
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hover:underline" prefetch={false}>
              Sign In
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
