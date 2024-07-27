"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  extractYouTubeID,
  fetchYouTubeVideoDuration,
} from "../../../../utils/youtubeUtils";

export default function AddVideo() {
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("");

  const [alert, setAlert] = useState("");
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/Courses", {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });

      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoYoutubeID = extractYouTubeID(video);
    //console.log("Extracted Video ID:", videoYoutubeID);
    const videoDuration = await fetchYouTubeVideoDuration(videoYoutubeID);

    //console.log("Video duration:", videoDuration);

    try {
      const response = await axios.post(
        `/api/admin/Courses/addVideo`,
        {
          title,
          description,
          video: videoYoutubeID,
          courseId,
          duration: videoDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );

      console.log("API Response:", response.status);

      if (response.status === 200) {
        setAlert("Video added successfully");
        setAlertType("success");
        setTimeout(() => {
          router.push(`/admin/CourseManagement`);
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data.message;
        setAlert(serverMessage);
        setAlertType("error");
      } else {
        setAlert("An error occurred");
        setAlertType("error");
      }

      console.error("Error adding video:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">Add Video Course</h1>
      {alert && (
        <p
          className={`mb-4 border rounded-md p-2 ${
            alertType === "success"
              ? "text-green-600 border-green-600 bg-green-50"
              : "text-red-600 border-red-600 bg-red-50"
          }`}
        >
          {alert}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="courseId"
            className="block text-sm font-medium text-gray-700"
          >
            Select Course
          </label>

          <select
            name="courseId"
            id="courseId"
            onChange={(e) => setCourseId(Number(e.target.value))}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course: any) => (
              <option key={course.id} value={course.id}>
                {course.id} : {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={10}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            Video Course URL
          </label>
          <input
            type="text"
            name="video"
            id="video"
            onChange={(e) => setVideo(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p className="text-gray-500">
            Youtube video link Example : <br></br> (
            https://www.youtube.com/watch?v=zxD8ghOy7Uo , zxD8ghOy7Uo )
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Video Course!
        </button>
      </form>
    </div>
  );
}
