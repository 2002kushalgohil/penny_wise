import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { WEBSITE_URL } from "../config/config";

const axiosInstance = axios.create({
  baseURL: WEBSITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
