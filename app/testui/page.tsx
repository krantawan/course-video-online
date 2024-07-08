export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20 mx-auto">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-black px-3 py-1 text-sm text-white">
              Course Video
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Introduction to React.js
            </h1>
            <p className="max-w-lg text-gray-600 md:text-xl lg:text-base xl:text-xl">
              Learn the fundamentals of React.js, one of the most popular
              JavaScript libraries for building user interfaces.
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
              <button className="text-white">
                <svg
                  className="w-10 h-10"
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
              </button>
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
                {curriculumItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-gray-100 p-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-gray-600">{item.duration}</div>
                  </div>
                ))}
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
                {reviews.map((review, index) => (
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
                      <p className="mt-2">{review.text}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        - {review.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const curriculumItems = [
  {
    title: "Introduction to React.js",
    description:
      "Learn the basics of React.js and how to set up a development environment.",
    duration: "15 min",
  },
  {
    title: "Components and Props",
    description:
      "Understand the concept of components and how to pass data between them using props.",
    duration: "30 min",
  },
  {
    title: "State Management",
    description:
      "Learn how to manage the state of your React.js application using hooks and state management techniques.",
    duration: "45 min",
  },
  {
    title: "Routing",
    description:
      "Understand how to set up client-side routing in your React.js application using React Router.",
    duration: "30 min",
  },
  {
    title: "Fetching Data with APIs",
    description:
      "Learn how to fetch data from APIs and display it in your React.js application.",
    duration: "45 min",
  },
];

const reviews = [
  {
    stars: 4.5,
    rating: "4.5",
    text: "This course is amazing! The instructor explains everything clearly and the examples are really helpful. I highly recommend it to anyone who wants to learn React.js.",
    author: "John Doe",
  },
  {
    stars: 5,
    rating: "5",
    text: "This is the best React.js course I've ever taken. The instructor is knowledgeable and the content is well-structured. I feel confident in my React.js skills after completing this course.",
    author: "Jane Smith",
  },
  {
    stars: 3.5,
    rating: "3.5",
    text: "The course is good, but I felt that some topics were covered too quickly. I would have liked more hands-on exercises and examples.",
    author: "Sarah Lee",
  },
];
