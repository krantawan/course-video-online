import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
    const VideoCourseById = await prisma.courseSession.findFirst({
      where: {
        id: videoId,
      },
    });

    if (!VideoCourseById) {
      throw {
        status: 404,
        message: "Course not found.",
      };
    }
    //console.log(VideoCourseById);

    return new NextResponse(JSON.stringify(VideoCourseById), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
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

    const body = await request.json();
    const { title, videoUrl, description } = body;

    //console.log(body);

    await prisma.courseSession.update({
      where: {
        id: videoId,
      },
      data: {
        title,
        description,
        videoUrl,
      },
    });

    return new NextResponse(JSON.stringify({ message: "Video updated!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
