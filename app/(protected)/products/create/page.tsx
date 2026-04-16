"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  ProductFormFields,
  type ProductFormValues,
} from "@/app/features/products/components/product-form-fields";
import { useCreateProductMutation } from "@/app/features/products/hooks/use-products";
import { Button } from "@/components/ui/button";

export default function CreateProductPage() {
  const router = useRouter();
  const { mutate: createProduct, isPending: isCreating } =
    useCreateProductMutation();

  const [formValues, setFormValues] = useState<ProductFormValues>({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleCreate = () => {
    const trimmedTitle = formValues.title.trim();
    const trimmedDescription = formValues.description.trim();
    const trimmedCategory = formValues.category.trim();
    const parsedPrice = Number(formValues.price);
    const parsedStock = Number(formValues.stock);

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedCategory ||
      !Number.isFinite(parsedPrice) ||
      !Number.isFinite(parsedStock)
    ) {
      toast.error("Please provide valid product details.");
      return;
    }

    createProduct(
      {
        title: trimmedTitle,
        description: trimmedDescription,
        category: trimmedCategory,
        price: parsedPrice,
        stock: parsedStock,
      },
      {
        onSuccess: (createdProduct) => {
          toast.success(`Product ${createdProduct.id} created successfully`);
          router.push("/products");
        },
        onError: () => {
          toast.error("Failed to create product");
        },
      },
    );
  };

  return (
    <article className="space-y-4">
      <Link
        href="/products"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to products
      </Link>

      <h1 className="text-3xl font-semibold text-foreground">Create Product</h1>

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <ProductFormFields
          values={formValues}
          onChange={setFormValues}
          showPlaceholders
        />

        <div className="flex justify-end">
          <Button type="button" disabled={isCreating} onClick={handleCreate}>
            {isCreating ? "Creating..." : "Create product"}
          </Button>
        </div>
      </div>
    </article>
  );
}
