import CourseList from "./components/CourseList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <CourseList />
      </main>
    </div>
  );
}
