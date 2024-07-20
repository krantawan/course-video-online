import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const token = request.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.API_SECRET_KEY}`) {
    console.log("Token mismatch or not provided");
    return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  const session = await getServerSession({
    req: request,
    ...authOptions,
  });

  if (!session || !session.user || !("id" in session.user)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, image } = body;
    const userId = Number(session.user.id);

    await prisma.course.create({
      data: {
        title,
        description,
        image,
        Instructor: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Course added successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
