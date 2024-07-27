"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { extractYouTubeID } from "../../../utils/youtubeUtils";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState("");
  const [video, setVideo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const videoYoutubeID = extractYouTubeID(video);

    try {
      const response = await axios.post(
        `/api/admin/Courses/add`,
        {
          title,
          description,
          image,
          preview: videoYoutubeID,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        setAlert("Course added successfully");
        setTimeout(() => {
          router.push(`/admin/CourseManagement`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">Add Course</h1>
      {alert && (
        <p className="text-green-600 mb-4 border border-green-600 rounded-md bg-green-50 p-2">
          {alert}
        </p>
      )}
      <form onSubmit={handleSubmit}>
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
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={10}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Peview Video
          </label>
          <input
            type="text"
            name="image"
            id="image"
            //value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p className="text-gray-500">
            Youtube video link <hr />
            Example : ( https://www.youtube.com/watch?v=zxD8ghOy7Uo ,
            zxD8ghOy7Uo )
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Course!
        </button>
      </form>
    </div>
  );
}
