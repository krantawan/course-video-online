"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);

  const [notificationMessage, setNotificationMessage] = useState("");

  const handleDeleteSuccess = () => {
    setNotificationMessage("Delete successful!");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/Courses", {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });

      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await axios.delete(`/api/admin/Courses/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      fetchCourses();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>

      {notificationMessage && (
        <p className="text-green-600 mb-4 border border-green-600 rounded-md bg-green-50 p-2">
          {notificationMessage}
        </p>
      )}

      <Link
        className="bg-green-500 text-white py-1 px-2 rounded text-lg hover:bg-green-600"
        href="/admin/CourseManagement/add"
      >
        Add Course
      </Link>
      <table className="min-w-full bg-white mt-2">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Instructor</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: any) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.id}</td>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.Instructor?.name}</td>
              <td className="border px-4 py-2">
                <Link
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  href={`/admin/CourseManagement/edit/${course.id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => {
                    deleteCourse(course.id);
                    handleDeleteSuccess();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
