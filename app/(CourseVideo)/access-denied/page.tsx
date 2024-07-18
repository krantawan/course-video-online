"use client";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <Link
        href="/"
        className="bg-black text-white font-semibold py-2 px-4 rounded"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
