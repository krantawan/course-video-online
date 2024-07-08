"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type CourseListProps = {
  courses: { id: number; title: string; description: string; image: string }[];
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

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Course Videos</h2>
      <div className="flex flex-cols-3 gap-2">
        {courseList.map((course, index) => (
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
              <img
                src={course.image}
                alt="card-image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {course.title}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Free
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {course.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                href={`/course/${course.id}`}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
                type="button"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
