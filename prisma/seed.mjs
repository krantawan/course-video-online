// prisma/seed.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create mock users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: "password123",
    },
  });

  // Create mock video courses for user1
  await prisma.videoCourse.createMany({
    data: [
      {
        title: "React for Beginners",
        description: "Learn the basics of React.",
        image: "react-course.jpg",
        videoUrl: "https://example.com/react-course",
        userId: user1.id,
      },
      {
        title: "Advanced JavaScript",
        description: "Master JavaScript.",
        image: "js-course.jpg",
        videoUrl: "https://example.com/js-course",
        userId: user1.id,
      },
    ],
  });

  // Create mock video courses for user2
  await prisma.videoCourse.createMany({
    data: [
      {
        title: "UI/UX Design Principles",
        description: "Design beautiful interfaces.",
        image: "design-course.jpg",
        videoUrl: "https://example.com/design-course",
        userId: user2.id,
      },
      {
        title: "Marketing Strategies",
        description: "Learn effective marketing strategies.",
        image: "marketing-course.jpg",
        videoUrl: "https://example.com/marketing-course",
        userId: user2.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
