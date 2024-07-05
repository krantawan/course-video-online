import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = Number(params.id);
    const courses = await prisma.videoCourse.findUnique({
      where: {
        id: courseId,
      },
    });
    return Response.json(courses);
  } catch (error) {}
}
