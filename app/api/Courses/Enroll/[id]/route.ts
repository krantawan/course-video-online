import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession({
      req: request,
      ...authOptions,
    });

    if (!session || !session.user || !("id" in session.user)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseId = Number(params.id);
    const userId = Number(session.user.id);

    const courseEnroll = await prisma.courseEnrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    return new NextResponse(JSON.stringify(courseEnroll), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
