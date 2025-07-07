import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ category: "", status: "", priority: "" });
  const [quickTask, setQuickTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setFiltered(data);
      });

    fetch("http://localhost:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const exportTasks = async () => {
    const res = await fetch("http://localhost:8000/api/tasks/");
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
  };

  const importTasks = async (file) => {
    const text = await file.text();
    const tasks = JSON.parse(text);
    for (const task of tasks) {
      await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    }
    alert("Tasks imported!");
    window.location.reload();
  };

  const applyFilter = () => {
    let data = [...tasks];

    if (filter.category) {
      data = data.filter(
        (t) =>
          t.category &&
          typeof t.category.name === "string" &&
          t.category.name.toLowerCase() === filter.category.toLowerCase()
      );
    }

    if (filter.status) {
      data = data.filter((t) => t.status === filter.status);
    }

    if (filter.priority) {
      const p = parseInt(filter.priority);
      data = data.filter((t) => Math.round(t.priority_score) === p);
    }

    setFiltered(data);
    setCurrentPage(1);
  };

  const quickAdd = async () => {
  if (!quickTask.trim()) return;

 
  const defaultCategoryId = categories.length > 0 ? categories[0].id : null;

  if (!defaultCategoryId) {
    alert("No category available. Please add a category first.");
    return;
  }

  const payload = {
    title: quickTask,
    description: "",
    category_id: defaultCategoryId,  
    deadline: null,
    status: "pending",
    priority_score: 5,
  };

  try {
    const res = await fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setQuickTask("");
      window.location.reload();
    } else {
      const error = await res.json();
      alert("Failed to add task: " + JSON.stringify(error));
    }
  } catch (err) {
    alert("Network error while adding task.");
    console.error(err);
  }
};


  const paginatedTasks = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Smart Todo Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <button onClick={exportTasks} className="bg-gray-700 text-white px-4 py-2 rounded">
            Export Tasks
          </button>
          <input
            type="file"
            accept="application/json"
            onChange={(e) => importTasks(e.target.files[0])}
            className="bg-white dark:bg-gray-800 p-2 border rounded"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <select
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">All Priority</option>
            <option value="10">High (10)</option>
            <option value="5">Medium (5)</option>
            <option value="1">Low (1)</option>
          </select>

          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Filter
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            placeholder="Quick Add Task"
            value={quickTask}
            onChange={(e) => setQuickTask(e.target.value)}
            className="p-2 border rounded w-full bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={quickAdd}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {paginatedTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found</p>
          ) : (
            paginatedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
