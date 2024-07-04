"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type CourseListProps = {
  courses: { title: string; description: string; image: string }[];
};
export default function CourseList() {
  const [courseList, setCourseList] = useState<CourseListProps["courses"]>([]);
  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/Courses");
      setCourseList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Mock data
  //   const courses = [
  //     { title: "React for Beginners", description: "Learn the basics of React." },
  //     { title: "Advanced JavaScript", description: "Master JavaScript." },
  //     {
  //       title: "UI/UX Design Principles",
  //       description: "Design beautiful interfaces.",
  //     },
  //   ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Course Videos</h2>
      <ul className="space-y-4">
        {courseList.map((course, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow">
            <Link href={`/courses/${index + 1}`}>
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <p>{course.image}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
