import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    status: "pending",
    priority_score: 5,
  });

  const [categories, setCategories] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch all categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch task if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/tasks/${id}/`)
        .then((res) => res.json())
        .then((data) =>
          setTask({
            title: data.title,
            description: data.description,
            category: data.category?.id || "",
            deadline: data.deadline ? data.deadline.slice(0, 10) : "",
            status: data.status,
            priority_score: data.priority_score || 5,
          })
        );
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = id
    ? `http://localhost:8000/api/tasks/${id}/`
    : "http://localhost:8000/api/tasks/";
  const method = id ? "PUT" : "POST";

  const payload = {
    ...task,
    category_id: task.category ? Number(task.category) : null,
  };

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert(`Task ${id ? "updated" : "created"} successfully!`);
      router.push("/");
    } else {
      const error = await res.json();
      console.error("Failed:", error);
      alert("Failed to save task: " + JSON.stringify(error));
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Something went wrong while saving.");
  }
};


  const enhanceWithAI = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("http://localhost:8000/api/ai/enhance/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          context: task.description + " Estimate a realistic deadline.",
        }),
      });
      const data = await res.json();
      setTask({ ...task, description: data.enhanced_description });
    } catch (err) {
      alert("Failed to enhance with AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">{id ? "Edit Task" : "Create Task"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            required
          />

          {/* Description with spinner */}
          <div className="relative">
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 pr-10"
              rows={4}
            />
            {loadingAI && (
              <div className="absolute right-3 top-3 animate-spin h-5 w-5 border-2 border-t-transparent border-gray-500 rounded-full"></div>
            )}
          </div>

          {/* Category */}
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Deadline */}
          <input
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            type="date"
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />

          {/* Status */}
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={enhanceWithAI}
              disabled={loadingAI}
              className={`px-4 py-2 rounded text-white ${loadingAI ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600"}`}
            >
              {loadingAI ? "Enhancing..." : "Enhance with AI"}
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
