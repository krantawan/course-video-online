import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
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

    const courseId = Number(params.id);
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        courseSessions: {
          orderBy: { order: "asc" },
        },
        Instructor: {
          select: {
            name: true,
            image: true,
          },
        },
        reviews: {
          orderBy: { rating: "desc" },
          include: {
            User: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        enrollments: true,
      },
    });

    if (!course) {
      return new NextResponse(
        JSON.stringify({ message: "Course not found." }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
