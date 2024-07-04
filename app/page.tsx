import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import CourseList from "./components/CourseList";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-4">
        <main className="mt-8">
          <Categories />
          <CourseList />
        </main>
      </div>
    </>
  );
}
