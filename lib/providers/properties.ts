import { ApiResponse } from "@/types";
import api from "../api";
import { User } from "./auth";

export const searchProperties = async (params: any) => {
  const res = await api.get<ApiResponse<Property[]>>("/property/search", {
    params,
  });
  return res.data;
};

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  ownerId: number;
  rooms: number;
  price: number;
  owner: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
