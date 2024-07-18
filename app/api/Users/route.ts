import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  try {
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

    const UserId = Number(session.user.id);

    const UserResponse = await prisma.user.findFirst({
      where: {
        id: UserId,
      },
      select: {
        name: true,
        email: true,
        enrollments: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(UserResponse), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
