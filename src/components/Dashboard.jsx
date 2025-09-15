import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext); // assuming you have a logout function
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createTask({ content });
    setContent("");
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex justify-center items-start pt-16">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header with title and logout button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transform transition"
          >
            Logout
          </button>
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
          )}
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-700 p-3 rounded-lg shadow-sm"
            >
              <span
                onClick={() => toggleComplete(task)}
                className={`cursor-pointer flex-1 ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-white"
                }`}
              >
                {task.content}
              </span>
              <button
                onClick={() => removeTask(task._id)}
                className="ml-4 text-red-400 hover:text-red-500 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
