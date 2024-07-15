import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
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

    const videoId = Number(params.id);
    const course = await prisma.courseSession.findUnique({
      where: {
        id: videoId,
        //courseId: videoId,
      },
      include: {
        course: {
          select: {
            Instructor: {
              select: {
                name: true,
                image: true,
              },
            },
            courseSessions: true,
            enrollments: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw {
        status: 404,
        message: "Course not found.",
      };
    }
    //console.log(course);
    return Response.json(course);
  } catch (error) {
    console.log(error);
  }
}
