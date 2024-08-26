"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

export default function EditCourse({ params }: { params: { id: string } }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const fetchCourses = async (id: string) => {
    try {
      const response = await axios.get(`/api/admin/Courses/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      setTitle(response.data.title);
      setDescription(response.data.description);
      setImage(response.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/admin/Courses/${id}`,
        {
          title,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        setAlert(response.data.message);
        setTimeout(() => {
          setAlert("");
          setDisabled(false);
        }, 3000);
        router.push(`/admin/CourseManagement/edit/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourses(id);
    }
  }, [id]);
  return (
    <div className="container mx-auto p-7">
      <h1 className="text-3xl font-bold mb-4">Edit Course Id : {id}</h1>
      {alert && (
        <p className="text-green-600 mb-4 border border-green-600 rounded-md bg-green-50 p-2">
          {alert}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={disabled}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={10}
            required
            disabled={disabled}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={disabled}
          />
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
