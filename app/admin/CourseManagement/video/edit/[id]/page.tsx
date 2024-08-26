"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  extractYouTubeID,
  fetchYouTubeVideoDuration,
} from "../../../../../utils/youtubeUtils";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [Video, setVideo] = useState<any>({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
  });

  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { id } = params;

  const fetchVideoById = async (id: string) => {
    try {
      const response = await axios.get(`/api/admin/Courses/video/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      setVideo(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const videoYoutubeID = extractYouTubeID(Video.videoUrl);
    if (!videoYoutubeID) {
      console.error("Invalid YouTube URL");
      return;
    }
    const videoDuration = await fetchYouTubeVideoDuration(videoYoutubeID);

    try {
      const response = await axios.put(
        `/api/admin/Courses/video/edit/${id}`,
        {
          title: Video.title,
          description: Video.description,
          videoUrl: videoYoutubeID,
          duration: videoDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        setAlertType("success");
        setAlert(response.data.message);
        setTimeout(() => {
          setAlert("");
          setDisabled(false);
          router.push(`/admin/CourseManagement/video/${Video.courseId}`);
        }, 3000);
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
    }
  };

  useEffect(() => {
    fetchVideoById(id);
  }, [id]);

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">Edit Video Course</h1>
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
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid gap-5">
          <div>
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
              value={Video.title || ""}
              onChange={(e) => setVideo({ ...Video, title: e.target.value })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={disabled}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={Video.description || ""}
              onChange={(e) =>
                setVideo({ ...Video, description: e.target.value })
              }
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={10}
              required
              disabled={disabled}
            />
          </div>
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700"
            >
              Video URL
            </label>
            <input
              type="text"
              name="videoUrl"
              id="videoUrl"
              value={Video.videoUrl || ""}
              onChange={(e) => setVideo({ ...Video, videoUrl: e.target.value })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={disabled}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
              Update Video
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
