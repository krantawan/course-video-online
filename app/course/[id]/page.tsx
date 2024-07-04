"use client";
import { useParams } from "next/navigation";

export default function Courses() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container mx-auto">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse mb-5">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600  "
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
              >
                Course
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                React for Beginners
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="text-2xl font-bold mb-4">React for Beginners</h2>
      <div className="grid grid-cols-[30%,70%]">
        <div className="pr-5">
          <img
            src="https://i.imgur.com/rvjKcka.png"
            alt="card-image"
            className="object-cover w-fullrounded-md"
          />
          <div className="mt-5">
            <button
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Enroll
            </button>
          </div>
          <div className="mt-5">
            Master modern React from beginner to advanced! Next.js, Context API,
            React Query, Redux, Tailwind, advanced patterns
          </div>
        </div>
        <div className="pl-5 gap-5">
          <div>
            Session: 1 Introduce
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
          </div>

          <div>
            Session: 2 Introduce
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
          </div>

          <div>
            Session: 2 Introduce
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
          </div>

          <div>
            Session: 2 Introduce
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
            <div className="bg-slate-50 p-5 mb-2">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
