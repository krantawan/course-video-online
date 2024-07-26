"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [monthlySignups, setMonthlySignups] = useState<number>(0);
  const [signupTrends, setSignupTrends] = useState<number[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/admin/Users`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();
      setTotalUsers(data.length);

      // Calculate Monthly Signups
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlySignups = data.filter((user: any) => {
        const userDate = new Date(user.createdAt);
        return (
          userDate.getMonth() === currentMonth &&
          userDate.getFullYear() === currentYear
        );
      }).length;
      setMonthlySignups(monthlySignups);

      // Calculate signups for each month
      const monthlyData = new Array(12).fill(0);
      data.forEach((user: any) => {
        const userDate = new Date(user.createdAt);
        if (userDate.getFullYear() === currentYear) {
          monthlyData[userDate.getMonth()] += 1;
        }
      });
      setSignupTrends(monthlyData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/Courses`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();
      setTotalCourses(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/admin/Reviews`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      const data = await response.json();
      setTotalReviews(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchReviews();
  }, []);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "User Signups",
        data: signupTrends,
        fill: false,
        backgroundColor: "rgb(99,102,241)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly User Signup Trends",
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Courses</h2>
          <p className="text-3xl">{totalCourses}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Reviews</h2>
          <p className="text-3xl">{totalReviews}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Monthly Signups</h2>
          <p className="text-3xl">{monthlySignups}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">User Signup Trends</h2>
        <div className="p-4 bg-white rounded shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
