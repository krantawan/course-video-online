"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { NextResponse } from "next/server";

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessageError, setNotificationMessageError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/admin/Reviews", {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const response = await axios.delete(`/api/admin/Reviews/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });

      if (response.status === 200) {
        setNotificationMessage(response.data.message);
      }
      fetchReviews();
    } catch (error) {
      setNotificationMessageError("Error deleting review");
    }
  };

  return (
    <div className="p-4">
      {notificationMessage && (
        <p className="text-green-600 mb-4 border border-green-600 rounded-md bg-green-50 p-2">
          {notificationMessage}
        </p>
      )}

      {notificationMessageError && (
        <p className="text-red-600 mb-4 border border-red-600 rounded-md bg-red-50 p-2">
          {notificationMessageError}
        </p>
      )}

      <h1 className="text-2xl font-bold mb-4">Review Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Comment</th>
            <th className="py-2 px-4">Rating</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review: any) => (
            <tr key={review.id}>
              <td className="border px-4 py-2">{review.User.name}</td>
              <td className="border px-4 py-2">{review.comment}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                  onClick={() => {
                    setNotificationMessageError("");
                    setNotificationMessage("");
                    deleteReview(review.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
