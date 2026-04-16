export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  views: number;
}

export interface PaginatedPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  tags: string[];
  userId: number;
}

export interface UpdatePostPayload {
  title?: string;
  body?: string;
  tags?: string[];
}
