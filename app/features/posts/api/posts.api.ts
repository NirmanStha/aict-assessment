import api from "@/lib/http";
import type { PaginatedPostsResponse, Post } from "../types/posts.types";

export async function getPosts(
  limit = 12,
  skip = 0,
): Promise<PaginatedPostsResponse> {
  const response = await api.get<PaginatedPostsResponse>("/posts", {
    params: { limit, skip },
  });

  return response.data;
}

export async function getPostById(id: number): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
}
