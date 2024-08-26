import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        Instructor: {
          select: {
            name: true,
          },
        },
      },
    });
    //console.log(courses);
    return Response.json(courses);
  } catch (error) {}
}
