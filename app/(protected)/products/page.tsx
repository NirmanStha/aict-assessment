"use client";

import Link from "next/link";
import { ProductsTable } from "@/app/features/products/components/products-table";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
        <Link href="/products/create">
          <Button type="button">Create Product</Button>
        </Link>
      </div>
      <ProductsTable />
    </section>
  );
}
