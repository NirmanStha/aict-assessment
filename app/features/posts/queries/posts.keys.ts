export const postsKeys = {
  all: ["posts"] as const,
  list: (limit: number, skip: number) =>
    ["posts", "list", { limit, skip }] as const,
  detail: (id: number) => ["posts", "detail", id] as const,
};
