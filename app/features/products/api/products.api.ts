import api from "@/lib/http";
import type {
  PaginatedProductsResponse,
  Product,
} from "../types/products.types";

export async function getProducts(
  limit = 12,
  skip = 0,
): Promise<PaginatedProductsResponse> {
  const response = await api.get<PaginatedProductsResponse>("/products", {
    params: { limit, skip },
  });

  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}
