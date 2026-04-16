export const productsKeys = {
  all: ["products"] as const,
  list: (limit: number, skip: number) =>
    ["products", "list", { limit, skip }] as const,
  detail: (id: number) => ["products", "detail", id] as const,
};
