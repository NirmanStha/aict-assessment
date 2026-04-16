"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type ProductFormErrors,
  ProductFormFields,
  type ProductFormValues,
} from "@/app/features/products/components/product-form-fields";
import { useCreateProductMutation } from "@/app/features/products/hooks/use-products";
import {
  parseProductForm,
  validateProductForm,
} from "@/app/features/products/validation/product-form.schema";
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
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const handleFormChange = (nextValues: ProductFormValues) => {
    setFormValues(nextValues);
    if (Object.keys(errors).length > 0) {
      setErrors(validateProductForm(nextValues));
    }
  };

  const handleCreate = () => {
    const parsed = parseProductForm(formValues);

    if (!parsed.data) {
      setErrors(parsed.errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    createProduct(
      {
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        price: parsed.data.price,
        stock: parsed.data.stock,
      },
      {
        onSuccess: (createdProduct) => {
          setErrors({});
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
          onChange={handleFormChange}
          errors={errors}
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
