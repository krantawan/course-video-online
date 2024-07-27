import { useSession } from "next-auth/react";

export default function Profile() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <hr className="mb-4" />
    </div>
  );
}
