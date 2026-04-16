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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.products.map((product) => (
          <article
            key={product.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {product.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {product.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">
              {product.description}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
              <span>${product.price}</span>
              <span>Rating {product.rating}</span>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="mt-4 inline-block text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
            >
              View product
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
