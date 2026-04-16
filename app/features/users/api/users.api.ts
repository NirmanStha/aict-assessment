import api from "@/lib/http";
import type {
  CreateUserPayload,
  PaginatedUsersResponse,
  UpdateUserPayload,
  User,
} from "../types/users.types";

export async function getUsers(
  limit = 12,
  skip = 0,
): Promise<PaginatedUsersResponse> {
  const response = await api.get<PaginatedUsersResponse>("/users", {
    params: { limit, skip },
  });

  return response.data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function createUser(userData: CreateUserPayload): Promise<User> {
  const response = await api.post<User>("/users/add", userData);
  return response.data;
}

export async function updateUser(
  id: number,
  userData: UpdateUserPayload,
): Promise<User> {
  const response = await api.put<User>(`/users/${id}`, userData);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
