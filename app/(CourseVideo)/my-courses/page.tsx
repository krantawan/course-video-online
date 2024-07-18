"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyCourses() {
  const { data: session, status } = useSession();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMyCourses();
    } else {
      setIsLoading(false);
    }
  }, [status]);

  const fetchMyCourses = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/Users`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();
      console.log(data); // Add this line to debug the response data

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to see your courses.</div>;
  }

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <hr className="mb-4" />
      {myCourses.length > 0 ? (
        <div>
          {myCourses.map((course) => (
            <div key={course.id} className="mb-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You are not enrolled in any courses.</p>
      )}
    </div>
  );
}
