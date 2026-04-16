"use client";

import { useMemo, useState } from "react";
import {
  useDeleteProductMutation,
  usePaginatedProductsQuery,
} from "@/app/features/products/hooks/use-products";
import type { Product } from "@/app/features/products/types/products.types";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/custom/data-table";
import { PaginationControls } from "@/components/custom/pagination-controls";

const productColumns: DataTableColumn<Product>[] = [
  {
    key: "id",
    header: "ID",
    render: (product) => product.id,
  },
  {
    key: "title",
    header: "Title",
    className: "font-medium text-foreground",
    render: (product) => product.title,
  },
  {
    key: "category",
    header: "Category",
    render: (product) => product.category,
  },
  {
    key: "price",
    header: "Price",
    render: (product) => `$${product.price}`,
  },
  {
    key: "stock",
    header: "Stock",
    render: (product) => product.stock,
  },
];

export function ProductsTable() {
  const pageSize = 12;
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = usePaginatedProductsQuery(
    page,
    pageSize,
  );
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteProductMutation();

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1;
    }

    return Math.max(1, Math.ceil(data.total / pageSize));
  }, [data?.total, pageSize]);

  const rangeStart = useMemo(() => {
    if (!data?.total) {
      return 0;
    }

    return (page - 1) * pageSize + 1;
  }, [data?.total, page, pageSize]);

  const rangeEnd = useMemo(() => {
    if (!data?.total) {
      return 0;
    }

    return Math.min((page - 1) * pageSize + data.products.length, data.total);
  }, [data?.products.length, data?.total, page, pageSize]);

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Loading products...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-600">
        Failed to load products. Try refreshing this page.
      </p>
    );
  }

  return (
    <section className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Showing {rangeStart}-{rangeEnd} of {data.total} products from DummyJSON.
      </p>

      <DataTable
        data={data.products}
        columns={productColumns}
        getRowKey={(product) => product.id}
        getEditHref={(product) => `/products/${product.id}`}
        editActionLabel="Edit product"
        onDelete={(product) => deleteProduct(product.id)}
        deleteDialogTitle="Delete this product?"
        deleteActionLabel="Delete"
        isDeleting={isDeleting}
      />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        disabled={isPending}
        onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      />
    </section>
  );
}
