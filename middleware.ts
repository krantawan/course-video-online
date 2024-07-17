// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.error("Middleware is running"); // Log นี้จะช่วยยืนยันว่า middleware ทำงานหรือไม่

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.error("Token:", token); // Add this line for debugging

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
