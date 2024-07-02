import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" bg-blue-600 p-4">
      <ul className="flex space-x-4 container mx-auto">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="/categories" className="text-white">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
