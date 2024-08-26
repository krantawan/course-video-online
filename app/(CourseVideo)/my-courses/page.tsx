import { useSession } from "next-auth/react";
import Courses from "../components/MyCourses";

export default function MyCourses() {
  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <hr className="mb-4" />

      <Courses />
    </div>
  );
}
