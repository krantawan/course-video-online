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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courseList.map((course, index) => (
          <Link href={`/course/${course.id}`} key={index}>
            <div className="border border-gray-200 rounded overflow-hidden hover:shadow-lg hover:-translate-y-2 transition duration-300 h-full flex flex-col">
              <img
                src={course.image}
                width="300"
                height="200"
                alt="Course Thumbnail"
                className="rounded-t-md object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64"
              />
              <div className="p-4 space-y-2 flex-grow flex flex-col">
                <div className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                  {course.title}
                </div>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg line-clamp-3 overflow-hidden">
                  {course.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
