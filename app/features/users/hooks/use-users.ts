"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersKeys } from "../queries/users.keys";
import {
  createUserMutationOptions,
  deleteUserMutationOptions,
  paginatedUsersQueryOptions,
  updateUserMutationOptions,
  userDetailQueryOptions,
  usersListQueryOptions,
} from "../queries/users.queries";

export function useUsersQuery(limit = 12, skip = 0) {
  return useQuery(usersListQueryOptions(limit, skip));
}

export function useUserQuery(id: number) {
  return useQuery(userDetailQueryOptions(id));
}

export function usePaginatedUsersQuery(page: number, pageSize: number) {
  return useQuery(paginatedUsersQueryOptions(page, pageSize));
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createUserMutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...updateUserMutationOptions,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      queryClient.invalidateQueries({
        queryKey: usersKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...deleteUserMutationOptions,
    onSuccess: (_, deletedUserId) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      toast.success(`User of id ${deletedUserId} deleted successfully`);
    },
    onError: () => {
      toast.error("Failed to delete user. Please try again.");
    },
  });
}
