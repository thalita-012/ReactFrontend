import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

console.log("API Base URL:", baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;