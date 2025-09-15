import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const toggleComplete = async (id, completed) => {
    await updateTask(id, { completed: !completed });
    loadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto mt-10 border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        📝 Your Tasks
      </h2>

      {/* Task Form */}
      <TaskForm refresh={loadTasks} />

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks yet. Add one above!</p>
        )}
        {tasks.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-sm hover:bg-gray-600 transition"
          >
            <span
              onClick={() => toggleComplete(t._id, t.completed)}
              className={`cursor-pointer flex-1 ${
                t.completed
                  ? "line-through text-gray-400"
                  : "text-white font-medium"
              }`}
            >
              {t.content}
            </span>
            <button
              onClick={() => removeTask(t._id)}
              className="ml-4 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
