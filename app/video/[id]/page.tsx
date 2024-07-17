"use client";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Avatar from "/public/avatar_default.png";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VideoCourse({ params }: { params: { id: string } }) {
  const { id } = params;
  const [video, setVideo] = useState<any>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchVideoById = async (id: string, userId: string) => {
    try {
      const response = await axios.get(`/api/Courses/Video/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });

      setVideo(response.data);
      //console.log("Video response:", response.data);

      // Check if the user is enrolled in the course
      if (response.data.course?.enrollments) {
        const isUserEnrolled = response.data.course.enrollments.some(
          (enrollment: { userId: number }) =>
            enrollment.userId === Number(userId)
        );

        //console.log("Session user ID:", userId);
        //console.log("isUserEnrolled:", isUserEnrolled);

        if (!isUserEnrolled) {
          router.push("/access-denied"); // Redirect to access denied page
          return;
        }
      } else {
        console.log("User not enrolled");
        router.push("/access-denied"); // Redirect to access denied page
      }
    } catch (error) {
      console.log(error);
      router.push("/error"); // Redirect to an error page
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id && id) {
      fetchVideoById(id, session.user.id);
    } else if (status === "unauthenticated") {
      router.push("/access-denied");
    }
  }, [id, status, session?.user?.id]);

  if (status === "loading" || !video) {
    return null;
  }

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
                  <Image
                    src={video.course.Instructor.image}
                    alt="Instructor Avatar"
                    className="w-full h-full object-cover"
                    width={32}
                    height={32}
                  />
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
                    href={`/video/${chapter.videoUrl}`}
                    className={`flex items-center gap-3 hover:bg-gray-200 rounded-md p-2 ${
                      String(chapter.videoUrl) === String(video.videoUrl)
                        ? "bg-gray-200"
                        : ""
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
                        {chapter.title}
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
