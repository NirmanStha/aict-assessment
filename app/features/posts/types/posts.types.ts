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
