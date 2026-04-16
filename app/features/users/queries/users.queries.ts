import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../api/users.api";
import { CreateUserPayload, UpdateUserPayload } from "../types/users.types";
import { usersKeys } from "./users.keys";

export function usersListQueryOptions(limit: number, skip: number) {
  return queryOptions({
    queryKey: usersKeys.list(limit, skip),
    queryFn: () => getUsers(limit, skip),
    select: (response) => ({
      ...response,
      users: response.users.filter((user) => user.isDeleted !== true),
    }),
  });
}

export function userDetailQueryOptions(id: number) {
  return queryOptions({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function paginatedUsersQueryOptions(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  return queryOptions({
    queryKey: usersKeys.list(pageSize, skip),
    queryFn: () => getUsers(pageSize, skip),
    placeholderData: keepPreviousData,
    select: (response) => ({
      ...response,
      users: response.users.filter((user) => user.isDeleted !== true),
    }),
  });
}

export const createUserMutationOptions = {
  mutationFn: (userData: CreateUserPayload) => createUser(userData),
};

export const updateUserMutationOptions = {
  mutationFn: (data: { id: number; userData: UpdateUserPayload }) =>
    updateUser(data.id, data.userData),
};

export const deleteUserMutationOptions = {
  mutationFn: (id: number) => deleteUser(id),
};
