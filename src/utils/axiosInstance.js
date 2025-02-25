import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " http://localhost:8000/api",
  //baseURL: "http://94.136.186.21/manifest5_backend/api",
  //baseURL: "http://94.136.186.21:3000/manifest5_backend/api", // Base API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Include cookies if needed for authentication
});

export default axiosInstance;
