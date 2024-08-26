"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MyCourses() {
  const { data: session, status } = useSession();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/Users`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();

      const enrolledCourses = data.enrollments.map(
        (enrollment: any) => enrollment.course
      );

      setMyCourses(enrolledCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchMyCourses();
    }
  }, [status, session?.user?.id]);

  return (
    <div>
      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myCourses.map((course) => (
            <Link
              href={`/course/${course.id}`}
              key={course.id}
              prefetch={false}
            >
              <div
                key={course.id}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <h2 className="text-xl">{course.title}</h2>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You are not enrolled in any courses.</p>
      )}
    </div>
  );
}
