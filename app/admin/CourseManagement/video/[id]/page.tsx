"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListVideo({ params }: { params: { id: string } }) {
  const { id } = params;
  const [video, setVideos] = useState<any[]>([]);

  const fetchVideoById = async (id: string) => {
    try {
      const response = await axios.get(`/api/Courses/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      //console.log(response.data.courseSessions);
      setVideos(response.data.courseSessions || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideoById(id);
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Video Courses : {id}</h1>

      <table className="min-w-full bg-white mt-2">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Title Video</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {video.map((chapter: any, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4">{chapter.id}</td>
              <td className="py-2 px-4">{chapter.title}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/video/${chapter.videoUrl}`}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
