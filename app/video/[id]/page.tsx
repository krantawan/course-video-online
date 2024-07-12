"use client";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Avatar from "/public/avatar_default.png";
import { useEffect, useState } from "react";

export default function VideoCourse({ params }: { params: { id: string } }) {
  const { id } = params;
  const [video, setVideo] = useState<any>("");

  const fetchVideoById = async (id: string) => {
    try {
      const response = await axios.get(`/api/Courses/Video/${id}`);
      setVideo(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVideoById(id);
    }
  }, [id]);

  return (
    <div>
      <div className="container flex flex-col gap-8 w-full mx-auto py-12 px-4 md:px-6">
        <div className="rounded-lg overflow-hidden aspect-video relative ">
          <div className="w-full h-full object-cover">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.videoUrl}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                {video.course?.Instructor?.image ? (
                  video.course?.Instructor?.image
                ) : (
                  <Image
                    src={Avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>{video.course?.Instructor?.name}, Instructor</div>
            </div>
            <p className="mt-4 text-gray-500">{video.description}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Chapters</h2>
            <div className="grid gap-4 mt-4">
              {video?.course?.courseSessions?.map(
                (chapter: any, index: number) => (
                  <Link
                    href={`/video/${chapter.id}`}
                    className={`flex items-center gap-3 hover:bg-gray-200 rounded-md p-2 ${
                      String(chapter.id) === String(id) ? "bg-gray-200" : ""
                    }`}
                    prefetch={false}
                    key={index}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${chapter.videoUrl}/mqdefault.jpg`}
                      width={120}
                      height={80}
                      alt="Thumbnail"
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium line-clamp-2">
                        {chapter.title} {chapter.id}
                      </div>
                      <div className="text-sm text-gray-500">{} • 45 min</div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
