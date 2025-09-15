import axios from "axios";

// change this to your backend API base URL
const API = axios.create({ baseURL: "https://mern-todo-backend-1emj.onrender.com/" });

// attach JWT token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// user APIs
export const loginUser = (data) => API.post("/users/login", data);
export const register = (data) => API.post("/users/register", data);

// task APIs
export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
