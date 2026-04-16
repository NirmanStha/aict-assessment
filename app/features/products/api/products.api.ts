import api from "@/lib/http";
import type {
  CreateProductPayload,
  PaginatedProductsResponse,
  Product,
  UpdateProductPayload,
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

export async function createProduct(
  productData: CreateProductPayload,
): Promise<Product> {
  const response = await api.post<Product>("/products/add", productData);
  return response.data;
}

export async function updateProduct(
  id: number,
  productData: UpdateProductPayload,
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}
