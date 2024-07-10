"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Courses({ params }: { params: { id: string } }) {
  const { id } = params;
  const [course, setCourse] = useState<any>();

  const fetchCourseById = async (id: string) => {
    try {
      const response = await axios.get(`/api/Courses/${id}`);
      setCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20 mx-auto">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-black px-3 py-1 text-sm text-white">
              Course Video
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {course.title}
            </h1>
            <p className="max-w-lg text-gray-600 md:text-xl lg:text-base xl:text-xl">
              {course.description}
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video className="w-full h-full object-cover">
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              d
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
                {course.courseSessions.map(
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
                            {sessionCourse.title}
                          </h3>
                          <p className="text-gray-600">
                            {sessionCourse.description}
                          </p>
                        </div>
                        <div className="text-gray-600">
                          {sessionCourse.duration}
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="mt-6 grid grid-cols-[auto_1fr] items-start gap-6">
                <div>avatar</div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Colm Tuite (a.k.a. shadcn)
                  </h3>
                  <p className="text-gray-600">
                    Colm is a software engineer and the creator of the Shadcn UI
                    library. He has been working with React.js for over 5 years
                    and is passionate about building high-quality, accessible
                    user interfaces.
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
                      User: { id: number; name: string };
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-lg bg-gray-200 p-4"
                    >
                      <div>avatar</div>
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
