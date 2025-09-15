import { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = ({ refresh }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createTask({ content });
    setContent("");
    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6 bg-gray-800 p-3 rounded-xl shadow-md"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="✍️ New task..."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02]"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
