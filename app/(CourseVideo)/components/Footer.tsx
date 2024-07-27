import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container px-4 md:px-6 flex items-center justify-between mx-auto">
        <p className="text-sm">&copy; 2024 CourseHub. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
