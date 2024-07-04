import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.videoCourse.findMany();
    return Response.json(courses);
  } catch (error) {}
}
