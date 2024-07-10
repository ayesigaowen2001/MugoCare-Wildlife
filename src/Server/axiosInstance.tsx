// src/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '"https://wildlife-tracker.onrender.com/login/login"',
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
