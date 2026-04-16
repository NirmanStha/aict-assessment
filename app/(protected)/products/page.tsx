"use client";

import Link from "next/link";
import { useProductsQuery } from "@/app/features/products/hooks/use-products";

export default function ProductsPage() {
  const { data, isPending, isError } = useProductsQuery(12, 0);

  if (isPending) {
    return <p className="text-sm text-slate-600">Loading products...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-600">
        Failed to load products. Try refreshing this page.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
        <p className="text-sm text-slate-600">
          Showing {data.products.length} of {data.total} products from
          DummyJSON.
        </p>
      </div>
    </section>
  );
}
