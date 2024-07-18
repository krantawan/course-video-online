export default function Categories() {
  const categories = ["Web Development", "Data Science", "Design", "Marketing"];
  return (
    <div className="my-8">
      <div>
        {categories.map((category) => (
          <div
            key={category}
            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
