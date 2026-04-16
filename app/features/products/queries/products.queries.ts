import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../api/products.api";
import {
  CreateProductPayload,
  UpdateProductPayload,
} from "../types/products.types";
import { productsKeys } from "./products.keys";

export function productsListQueryOptions(limit: number, skip: number) {
  return queryOptions({
    queryKey: productsKeys.list(limit, skip),
    queryFn: () => getProducts(limit, skip),
    select: (response) => ({
      ...response,
      products: response.products.filter(
        (product) => product.isDeleted !== true,
      ),
    }),
  });
}

export function productDetailQueryOptions(id: number) {
  return queryOptions({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function paginatedProductsQueryOptions(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  return queryOptions({
    queryKey: productsKeys.list(pageSize, skip),
    queryFn: () => getProducts(pageSize, skip),
    placeholderData: keepPreviousData,
    select: (response) => ({
      ...response,
      products: response.products.filter(
        (product) => product.isDeleted !== true,
      ),
    }),
  });
}

export const createProductMutationOptions = {
  mutationFn: (productData: CreateProductPayload) => createProduct(productData),
};

export const updateProductMutationOptions = {
  mutationFn: (data: { id: number; productData: UpdateProductPayload }) =>
    updateProduct(data.id, data.productData),
};

export const deleteProductMutationOptions = {
  mutationFn: (id: number) => deleteProduct(id),
};
