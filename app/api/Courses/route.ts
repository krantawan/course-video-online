import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return Response.json(courses);
  } catch (error) {}
}
