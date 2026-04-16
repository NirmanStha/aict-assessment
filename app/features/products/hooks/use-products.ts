"use client";

import { useQuery } from "@tanstack/react-query";
import {
  productDetailQueryOptions,
  productsListQueryOptions,
} from "../queries/products.queries";

export function useProductsQuery(limit = 12, skip = 0) {
  return useQuery(productsListQueryOptions(limit, skip));
}

export function useProductQuery(id: number) {
  return useQuery(productDetailQueryOptions(id));
}
