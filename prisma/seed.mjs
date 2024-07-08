// prisma/seed.mjs

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: "alice123", // Ensure to hash passwords in a real application
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: "bob123", // Ensure to hash passwords in a real application
    },
  });

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: "React Basics",
      description: "Learn the basics of React.",
      image: "react_basics.png",
      courseSessions: {
        create: [
          {
            title: "Introduction to React",
            videoUrl: "https://example.com/video1",
          },
          {
            title: "React Components",
            videoUrl: "https://example.com/video2",
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Advanced React",
      description: "Learn advanced concepts of React.",
      image: "advanced_react.png",
      courseSessions: {
        create: [
          {
            title: "React Hooks",
            videoUrl: "https://example.com/video3",
          },
          {
            title: "React Context API",
            videoUrl: "https://example.com/video4",
          },
        ],
      },
    },
  });

  // Enroll users in courses
  await prisma.courseEnrollment.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user2.id,
      courseId: course2.id,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user1.id,
      courseId: course2.id,
    },
  });

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
