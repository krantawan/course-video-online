"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Avatar from "/public/avatar_default.png";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Courses({ params }: { params: { id: string } }) {
  const { id } = params;
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchCourseById = async (id: string) => {
    try {
      const response = await axios.get(`/api/Courses/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });

      setCourse(response.data);

      // Check if the user is enrolled in the course
      if (session && response.data.enrollments) {
        //console.log("Session user ID:", session.user); // Debugging
        const isUserEnrolled = response.data.enrollments.some(
          (enrollment: { userId: number }) =>
            enrollment.userId === Number(session.user.id)
        );
        setIsEnrolled(isUserEnrolled);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnroll = async () => {
    if (!session) {
      alert("You need to be logged in to enroll");
      return;
    }

    try {
      await axios.post(
        `/api/Courses/Enroll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );
      setIsEnrolled(true); // Update the state to reflect enrollment
      router.push(`/course/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id, session, session?.user?.id]);

  if (!course) {
    return <div>Loading...</div>; // Show loading message if the course is not yet loaded
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black bg-opacity-95">
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20 mx-auto">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-black">
              Course Video
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-opacity-95">
              {course.title}
            </h1>
            <p className="max-w-lg text-gray-300 md:text-xl lg:text-base xl:text-xl text-justify">
              {course.description}
            </p>
            <div>
              {!isEnrolled && session && (
                <button
                  onClick={handleEnroll}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <div className="w-full h-full object-cover">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  course.preview == null ? "" : course.preview
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10">
            <div>
              <h2 className="text-2xl font-bold">Course Curriculum</h2>
              <div className="mt-6 grid gap-4">
                {isEnrolled ? (
                  course.courseSessions.map(
                    (
                      sessionCourse: {
                        id: number;
                        title: string;
                        description: string;
                        duration: string;
                      },
                      index: number
                    ) => (
                      <Link
                        href={`/video/${sessionCourse.id}`}
                        key={index + "_" + sessionCourse.title}
                      >
                        <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-gray-100 p-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {index + 1} - {sessionCourse.title}
                            </h3>
                            <p className="text-gray-600 text-justify">
                              {sessionCourse.description}
                            </p>
                          </div>
                          <div className="text-gray-600">
                            {sessionCourse.duration}
                          </div>
                        </div>
                      </Link>
                    )
                  )
                ) : (
                  <div className="text-red-500">
                    You must enroll to access the course sessions.
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="mt-6 grid grid-cols-[auto_1fr] items-start gap-6">
                <div>
                  {course.Instructor.image ? (
                    <Image
                      src={course.Instructor.image}
                      alt="Instructor image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image src={Avatar} alt="avatar" width={100} height={100} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {course.Instructor.name}
                  </h3>
                  <p className="text-gray-600">
                    {course.Instructor.bio ? course.Instructor.bio : "No bio"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="mt-6 grid gap-6">
                {course.reviews.map(
                  (
                    review: {
                      id: number;
                      comment: string;
                      rating: number;
                      User: { id: number; name: string; image: string };
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-lg bg-gray-200 p-4"
                    >
                      <div>
                        {review.User.image ? (
                          <Image
                            src={review.User.image}
                            alt="User image"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <Image src={Avatar} alt="avatar" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5"></div>
                          <div className="text-sm text-gray-600">
                            {review.rating} out of 5
                          </div>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          - {review.User.name}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
