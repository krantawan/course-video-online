export default function Categories() {
  const categories = ["Web Development", "Data Science", "Design", "Marketing"];
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category} className="bg-gray-100 p-2 rounded">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
