import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = Number(params.id);
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        courseSessions: true,
        Instructor: true,
        reviews: {
          include: {
            User: true,
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
