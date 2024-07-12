"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-4 bg-white p-8 rounded-md border-gray-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-gray-600">
            Enter your email and password below to access your account.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-5">
              <div className="grid gap-2">
                <h5>Email</h5>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-100 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h5>Password</h5>
                  <Link
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-100 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-md"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="font-medium text-blue-600 hover:underline"
            prefetch={false}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
