import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create reviews for course1
  await prisma.Review.create({
    data: {
      rating: 5,
      comment: "Great course!",
      courseId: 1,
      userId: 1,
    },
  });

  await prisma.Review.create({
    data: {
      rating: 4,
      comment: "Very informative.",
      courseId: 1,
      userId: 2,
    },
  });

  // Create reviews for course2
  await prisma.Review.create({
    data: {
      rating: 3,
      comment: "Good content but can be improved.",
      courseId: 2,
      userId: 2,
    },
  });

  await prisma.Review.create({
    data: {
      rating: 5,
      comment: "Excellent material!",
      courseId: 2,
      userId: 5,
    },
  });

  console.log("Mock data has been added. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
