import Image from "next/image";

export default function CourseList() {
  // Mock data
  const courses = [
    { title: "React for Beginners", description: "Learn the basics of React." },
    { title: "Advanced JavaScript", description: "Master JavaScript." },
    {
      title: "UI/UX Design Principles",
      description: "Design beautiful interfaces.",
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Course Videos</h2>
      <ul className="space-y-4">
        {courses.map((course, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
