import { AUTH_TOKEN_KEY } from "@/constants";
import axios from "axios";
export const login = async ({ email, password }: LoginInput) => {
  try {
    const res = await axios.post("http://localhost:4000/auth/login", {
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

type LoginInput = {
  email: string;
  password: string;
};
