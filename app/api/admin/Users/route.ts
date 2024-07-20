import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getServerSession({
    req: request,
    ...authOptions,
  });

  if (!session || !session.user || !("id" in session.user)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const token = request.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.API_SECRET_KEY}`) {
    console.log("Token mismatch or not provided");
    return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  try {
    const UserResponseAdmin = await prisma.user.findMany();
    //console.log(UserResponseAdmin);
    return new NextResponse(JSON.stringify(UserResponseAdmin), { status: 201 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
