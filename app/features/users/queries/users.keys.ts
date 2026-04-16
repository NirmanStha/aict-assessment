export const usersKeys = {
  all: ["users"] as const,
  list: (limit: number, skip: number) =>
    ["users", "list", { limit, skip }] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};
