"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductQuery } from "@/app/features/products/hooks/use-products";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = useProductQuery(id);

  if (isPending) {
    return <p className="text-sm text-slate-600">Loading product details...</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Failed to load this product.</p>
        <Link
          href="/products"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-4">
      <Link
        href="/products"
        className="text-sm text-slate-600 underline-offset-4 hover:underline"
      >
        Back to products
      </Link>
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {data.category}
      </p>
      <h1 className="text-3xl font-semibold text-slate-900">{data.title}</h1>
      <p className="text-base leading-7 text-slate-700">{data.description}</p>
      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          Price: ${data.price}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          Rating: {data.rating}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          Stock: {data.stock}
        </div>
      </div>
    </article>
  );
}
