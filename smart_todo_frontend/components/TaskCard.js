import { useRouter } from "next/router";

export default function TaskCard({ task }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/task?id=${task.id}`);
  };

  return (
    <div className="p-4 rounded shadow bg-gray-100 dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p>{task.description}</p>
      <p>Category: {task.category?.name || "N/A"}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority_score}</p>
      <button onClick={handleEdit} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
        Edit
      </button>
    </div>
  );
}
