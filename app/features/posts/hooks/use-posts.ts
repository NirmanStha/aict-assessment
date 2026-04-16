"use client";

import { useQuery } from "@tanstack/react-query";
import {
  postDetailQueryOptions,
  postsListQueryOptions,
} from "../queries/posts.queries";

export function usePostsQuery(limit = 12, skip = 0) {
  return useQuery(postsListQueryOptions(limit, skip));
}

export function usePostQuery(id: number) {
  return useQuery(postDetailQueryOptions(id));
}
