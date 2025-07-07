import { useEffect, useState } from "react";

export default function ContextPage() {
  const [context, setContext] = useState({ source: "note", content: "" });
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setContext({ ...context, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/contexts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error submitting context:", error);
        alert("Failed to submit: " + JSON.stringify(error));
        return;
      }

      alert("Context submitted!");
      setContext({ source: "note", content: "" });
      fetchHistory();
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while submitting context.");
    }
  };

  const fetchHistory = () => {
    fetch("http://localhost:8000/api/contexts/")
      .then((res) => res.json())
      .then((data) => setHistory(data.reverse()));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Daily Context</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <select
            name="source"
            value={context.source}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="note">Note</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>

          <textarea
            name="content"
            value={context.content}
            onChange={handleChange}
            placeholder="Enter message, email, or note"
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            rows={4}
            required
          />

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Context History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No context entries found.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((entry) => (
              <li key={entry.id} className="border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-white">
                <p className="text-sm text-gray-600 dark:text-gray-400">Source: {entry.source}</p>
                <p>{entry.content}</p>
                <p className="text-xs text-gray-400">
                  {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
