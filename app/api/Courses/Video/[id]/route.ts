import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = Number(params.id);
    const course = await prisma.courseSession.findUnique({
      where: {
        id: videoId,
        //courseId: videoId,
      },
      include: {
        course: true,
      },
    });

    if (!course) {
      throw {
        status: 404,
        message: "Course not found.",
      };
    }

    return Response.json(course);
  } catch (error) {
    console.log(error);
  }
}
