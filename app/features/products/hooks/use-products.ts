"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProductMutationOptions,
  deleteProductMutationOptions,
  paginatedProductsQueryOptions,
  productDetailQueryOptions,
  productsListQueryOptions,
  updateProductMutationOptions,
} from "../queries/products.queries";
import { productsKeys } from "../queries/products.keys";

export function useProductsQuery(limit = 12, skip = 0) {
  return useQuery(productsListQueryOptions(limit, skip));
}

export function useProductQuery(id: number) {
  return useQuery(productDetailQueryOptions(id));
}

export function usePaginatedProductsQuery(page: number, pageSize: number) {
  return useQuery(paginatedProductsQueryOptions(page, pageSize));
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createProductMutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...updateProductMutationOptions,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
      queryClient.invalidateQueries({
        queryKey: productsKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...deleteProductMutationOptions,
    onSuccess: (_, deletedProductId) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.all });
      toast.success(`Product of id ${deletedProductId} deleted successfully`);
    },
    onError: () => {
      toast.error("Failed to delete product. Please try again.");
    },
  });
}
