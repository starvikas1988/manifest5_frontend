import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Base API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Include cookies if needed for authentication
});

export default axiosInstance;
