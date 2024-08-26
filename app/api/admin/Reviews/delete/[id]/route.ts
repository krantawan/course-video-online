import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: any) {
  const deletReviewId = Number(params.id);
  const token = request.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.API_SECRET_KEY}`) {
    console.log("Token mismatch or not provided");
    return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  try {
    await prisma.review.delete({
      where: { id: deletReviewId },
    });
    return new NextResponse(
      JSON.stringify({ message: "Review deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
