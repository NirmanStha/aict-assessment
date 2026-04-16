import { queryOptions } from "@tanstack/react-query";
import { getPostById, getPosts } from "../api/posts.api";
import { postsKeys } from "./posts.keys";

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
