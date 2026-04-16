import { queryOptions } from "@tanstack/react-query";

import { postsKeys } from "./posts.keys";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../api/posts.api";
import { Post } from "../types/posts.types";

export function postsListQueryOptions(limit: number, skip: number) {
  return queryOptions({
    queryKey: postsKeys.list(limit, skip),
    queryFn: () => getPosts(limit, skip),
  });
}

export function postDetailQueryOptions(id: number) {
  return queryOptions({
    queryKey: postsKeys.detail(id),
    queryFn: () => getPostById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function paginatedPostsQueryOptions(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  return queryOptions({
    queryKey: postsKeys.list(pageSize, skip),
    queryFn: () => getPosts(pageSize, skip),
  });
}
export const createPostMutationOptions = {
  mutationFn: (postData: Omit<Post, "id">) => createPost(postData),
};
export const updatePostMutationOptions = {
  mutationFn: (data: { id: number; postData: Partial<Omit<Post, "id">> }) =>
    updatePost(data.id, data.postData),
};

export const deletePostMutationOptions = {
  mutationFn: (id: number) => deletePost(id),
};
