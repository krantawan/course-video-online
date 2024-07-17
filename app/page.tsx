import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import CourseList from "./components/CourseList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Categories />
        <CourseList />
      </main>
      <Footer />
    </div>
  );
}
