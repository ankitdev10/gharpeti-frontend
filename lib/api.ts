import { AUTH_TOKEN_KEY } from "@/constants";
import { isServer } from "@tanstack/react-query";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  if (isServer) {
    return config;
  }
  const token = localStorage.getItem(AUTH_TOKEN_KEY) ?? undefined;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);

export default api;
