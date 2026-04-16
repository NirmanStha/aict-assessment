"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPostMutationOptions,
  deletePostMutationOptions,
  paginatedPostsQueryOptions,
  postDetailQueryOptions,
  postsListQueryOptions,
  updatePostMutationOptions,
} from "../queries/posts.queries";
import { postsKeys } from "../queries/posts.keys";

export function usePostsQuery(limit = 12, skip = 0) {
  return useQuery(postsListQueryOptions(limit, skip));
}

export function usePostQuery(id: number) {
  return useQuery(postDetailQueryOptions(id));
}

export function usePaginatedPostsQuery(page: number, pageSize: number) {
  return useQuery(paginatedPostsQueryOptions(page, pageSize));
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createPostMutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...updatePostMutationOptions,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
      queryClient.invalidateQueries({
        queryKey: postsKeys.detail(variables.id),
      });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...deletePostMutationOptions,
    onSuccess: (_, deletedPostId) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
      toast.success(`Post of id ${deletedPostId} deleted successfully`);
    },
    onError: () => {
      toast.error("Failed to delete post. Please try again.");
    },
  });
}
