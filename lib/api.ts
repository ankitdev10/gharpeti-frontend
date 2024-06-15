"use server";

import { AUTH_TOKEN_KEY } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value ?? "";
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
