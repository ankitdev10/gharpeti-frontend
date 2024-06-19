import { AUTH_TOKEN_KEY } from "@/constants";
import api from "../api";
import { ApiResponse } from "@/types";
import { DeepPartial } from "react-hook-form";
export const login = async ({ email, password }: LoginInput) => {
  try {
    const res = await api.post<ApiResponse<User>>("/auth/login", {
      email,
      password,
    });

    const token = res.headers[AUTH_TOKEN_KEY];
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const register = async (input: DeepPartial<User>) => {
  try {
    const res = await api.post<ApiResponse<User>>("/users/create", input);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const me = async () => {
  try {
    const res = await api.get<ApiResponse<User>>("/me");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

type LoginInput = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  type: string;
  properties: any;
  token: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
