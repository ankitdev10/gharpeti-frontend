"use server";

import { AUTH_TOKEN_KEY } from "@/constants";
import api from "../api";
import { cookies } from "next/headers";
export const login = async ({ email, password }: LoginInput) => {
  try {
    const res = await api.post("auth/login", {
      email,
      password,
    });

    // @ts-ignore
    const token = res.headers.get(AUTH_TOKEN_KEY);
    const cookiesStore = cookies();
    cookiesStore.set(AUTH_TOKEN_KEY, token);

    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

type LoginInput = {
  email: string;
  password: string;
};
