"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserManagement({ params }: { params: { id: string } }) {
  const { id } = params;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [roles, setRoles] = useState<string[]>([]);
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/Users/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();

      setUser({
        name: data.user.name,
        email: data.user.email,
        password: data.user.password || "",
        role: data.user.role,
      });
      setRoles(data.roles);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const response = await fetch(`/api/admin/Users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok && response.status === 200) {
        setAlertType("success");
        setAlert(result.message);
        setTimeout(() => {
          setDisabled(false);
          setAlert("");
          router.push("/admin/UserManagement");
        }, 3000);
      } else {
        console.error("Failed to update user");
        setAlertType("error");
        setAlert(result.message);
        setTimeout(() => {
          setAlert("");
          router.push("/admin/UserManagement");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">Edit User Id : {id}</h1>

      {alert && (
        <p
          className={`mb-4 border rounded-md p-2 ${
            alertType === "success"
              ? "text-green-600 border-green-600 bg-green-50"
              : "text-red-600 border-red-600 bg-red-50"
          }`}
        >
          {alert}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={disabled}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={disabled}
          />
        </div>
        {user.password ? (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={disabled}
            />
          </div>
        ) : null}

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={disabled}
          >
            {roles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={disabled}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
