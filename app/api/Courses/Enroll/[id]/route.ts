import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession({
      req: request,
      ...authOption,
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
