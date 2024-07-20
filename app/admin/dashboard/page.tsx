export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl">1200</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Courses</h2>
          <p className="text-3xl">75</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Total Reviews</h2>
          <p className="text-3xl">450</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl">Monthly Signups</h2>
          <p className="text-3xl">300</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">User Signup Trends</h2>
        {/* Add a graph component here */}
      </div>
    </div>
  );
}
