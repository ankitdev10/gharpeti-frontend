import { ApiResponse } from "@/types";
import api from "../api";
import { User } from "./auth";
import { Property } from "./properties";

export const getUserApplications = async () => {
  try {
    const res = await api.get<ApiResponse<Application[]>>("/applications/user");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
export const getOwnerApplications = async () => {
  try {
    const res = await api.get<ApiResponse<Application[]>>(
      "/applications/owner",
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const createApplications = async (values: any) => {
  try {
    const res = await api.post("/applications/create", values);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export interface Application {
  id: number;
  contactNumber: number;
  feedback: string;
  moveinDate: string;
  offeredPrice: number;
  property: Property;
  status: "Pending" | "Approved" | "Rejected";
  user: User;
}
