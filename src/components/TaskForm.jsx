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
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default TaskForm;
