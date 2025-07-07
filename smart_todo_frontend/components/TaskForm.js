import { useEffect, useState } from "react";

export default function TaskForm({ existingTask = null }) {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [category, setCategory] = useState(existingTask?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description, category };
    const method = existingTask ? "PUT" : "POST";
    const url = existingTask
      ? `http://localhost:8000/api/tasks/${existingTask.id}/`
      : "http://localhost:8000/api/tasks/";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Task saved successfully");
        if (!existingTask) {
          setTitle("");
          setDescription("");
          setCategory("");
        }
      } else {
        alert("Error saving task");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{existingTask ? "Edit Task" : "Create Task"}</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border p-2 rounded mb-4"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full border p-2 rounded mb-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {existingTask ? "Update" : "Create"}
      </button>
    </form>
  );
}

