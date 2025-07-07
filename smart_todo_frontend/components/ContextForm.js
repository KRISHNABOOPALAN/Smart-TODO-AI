import { useState } from "react";

export default function ContextForm() {
  const [content, setContent] = useState("");
  const [source, setSource] = useState("note");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/contexts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, source }),
      });

      if (res.ok) {
        alert("Context submitted successfully");
        setContent("");
        setSource("note");
      } else {
        alert("Error saving context");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Daily Context</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter message, email or note..."
        className="w-full border p-2 rounded mb-4"
        required
      />

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="note">Note</option>
        <option value="email">Email</option>
        <option value="whatsapp">WhatsApp</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}


