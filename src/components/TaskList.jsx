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

  useEffect(() => { loadTasks(); }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm refresh={loadTasks} />
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggleComplete(t._id, t.completed)}
            >
              {t.content}
            </span>
            <button onClick={() => removeTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskList;
