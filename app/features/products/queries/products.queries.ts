import { queryOptions } from "@tanstack/react-query";
import { getProductById, getProducts } from "../api/products.api";
import { productsKeys } from "./products.keys";

export function productsListQueryOptions(limit: number, skip: number) {
  return queryOptions({
    queryKey: productsKeys.list(limit, skip),
    queryFn: () => getProducts(limit, skip),
  });
}

export function productDetailQueryOptions(id: number) {
  return queryOptions({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
