"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [myUser, setMyUser] = useState<any>([]);

  const userId = session?.user?.id;

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/Users/`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();
      console.log(data); // Add this line to debug the response data
      setMyUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [session, session?.user?.id]);

  return (
    <div className="flex flex-col items-center">
      <img src={myUser.image} alt="Profile" className="rounded-full" />
      <p className="mt-4">Hello, {myUser.name}</p>
      <p className="mt-2">Email: {myUser.email}</p>
    </div>
  );
}
