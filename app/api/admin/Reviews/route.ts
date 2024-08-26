import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.review.findMany({
      include: {
        User: {
          select: {
            name: true,
          },
        },
        course: {
          select: {
            title: true,
          },
        },
      },
    });
    //console.log(courses);
    return Response.json(courses);
  } catch (error) {
    console.log(error);
  }
}
