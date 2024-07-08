import Link from "next/link";

export default function VideoCourse({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <div className="container flex flex-col gap-8 w-full mx-auto py-12 px-4 md:px-6">
        <div className="rounded-lg overflow-hidden aspect-video relative">
          <video className="w-full h-full object-cover">
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-transparent hover:bg-black/50 flex items-center justify-center rounded-full">
                <PlayIcon className="w-6 h-6 fill-white" />
              </button>
              <button className="w-9 h-9 bg-transparent hover:bg-black/50 flex items-center justify-center rounded-full">
                <Volume2Icon className="w-6 h-6 fill-white" />
              </button>
              <div className="flex-1 h-1 bg-white/30 relative">
                <div
                  className="bg-white w-3 h-3 rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                  style={{ left: "40%" }}
                />
              </div>
              <div className="text-sm">1:20 / 3:45</div>
            </div>
            <button className="w-9 h-9 bg-transparent hover:bg-black/50 flex items-center justify-center rounded-full">
              <MaximizeIcon className="w-6 h-6 fill-white" />
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-3xl font-bold">
              Introduction to Web Development
            </h1>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src="/placeholder-user.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>John Doe, Instructor</div>
            </div>
            <p className="mt-4 text-gray-500">
              In this course, you will learn the fundamentals of web
              development, including HTML, CSS, and JavaScript. We'll cover
              topics like responsive design, web accessibility, and modern
              front-end frameworks.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Chapters</h2>
            <div className="grid gap-4 mt-4">
              <Link
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 rounded-md p-2"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={120}
                  height={80}
                  alt="Thumbnail"
                  className="rounded-md object-cover"
                />
                <div>
                  <div className="font-medium line-clamp-2">
                    Introduction to HTML and CSS
                  </div>
                  <div className="text-sm text-gray-500">John Doe • 45 min</div>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 rounded-md p-2"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={120}
                  height={80}
                  alt="Thumbnail"
                  className="rounded-md object-cover"
                />
                <div>
                  <div className="font-medium line-clamp-2">
                    JavaScript Fundamentals
                  </div>
                  <div className="text-sm text-gray-500">John Doe • 1 hr</div>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:bg-gray-200 rounded-md p-2"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={120}
                  height={80}
                  alt="Thumbnail"
                  className="rounded-md object-cover"
                />
                <div>
                  <div className="font-medium line-clamp-2">
                    Responsive Web Design
                  </div>
                  <div className="text-sm text-gray-500">
                    John Doe • 1 hr 30 min
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaximizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
