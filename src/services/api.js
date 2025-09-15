import axios from "axios";

// users API
const USER_API = axios.create({ baseURL: "https://mern-todo-backend-1emj.onrender.com/api/users" });
USER_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// tasks API
const TASK_API = axios.create({ baseURL: "https://mern-todo-backend-1emj.onrender.com/api/tasks" });
TASK_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// user APIs
export const loginUser = (data) => USER_API.post("/login", data);
export const register = (data) => USER_API.post("/register", data);

// task APIs
export const getTasks = () => TASK_API.get("/");
export const createTask = (data) => TASK_API.post("/", data);
export const updateTask = (id, data) => TASK_API.put(`/${id}`, data);
export const deleteTask = (id) => TASK_API.delete(`/${id}`);
