import api from "@/lib/http";
import type {
  CreatePostPayload,
  PaginatedPostsResponse,
  Post,
} from "../types/posts.types";

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

export async function createPost(postData: CreatePostPayload): Promise<Post> {
  const response = await api.post<Post>("/posts/add", postData);
  return response.data;
}

export async function updatePost(
  id: number,
  postData: Partial<Omit<Post, "id">>,
): Promise<Post> {
  const response = await api.put<Post>(`/posts/${id}`, postData);
  return response.data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}
