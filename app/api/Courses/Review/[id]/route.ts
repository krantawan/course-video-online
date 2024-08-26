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

    const courseId = Number(params.id);
    const userId = Number(session.user.id);
    const { review, rating } = await request.json();

    const courseReview = await prisma.review.create({
      data: {
        rating: rating,
        comment: review,
        courseId: courseId,
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify(courseReview), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
