import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
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
    const { title, video, courseId, duration, description } = body;

    // console.log(
    //   "Received data:",
    //   title,
    //   video,
    //   courseId,
    //   duration,
    //   description
    // );

    const existingVideo = await prisma.courseSession.findUnique({
      where: {
        videoUrl: video,
      },
    });

    if (existingVideo) {
      return new NextResponse(
        JSON.stringify({
          message: "Video URL already exists",
        }),
        {
          status: 409,
        }
      );
    }

    await prisma.courseSession.create({
      data: {
        title,
        description,
        duration,
        videoUrl: video,
        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Video added successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating course session:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
