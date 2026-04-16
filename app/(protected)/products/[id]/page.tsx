"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type ProductFormErrors,
  ProductFormFields,
  type ProductFormValues,
} from "@/app/features/products/components/product-form-fields";
import {
  useDeleteProductMutation,
  useProductQuery,
  useUpdateProductMutation,
} from "@/app/features/products/hooks/use-products";
import {
  parseProductForm,
  validateProductForm,
} from "@/app/features/products/validation/product-form.schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = useProductQuery(id);
  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProductMutation();
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteProductMutation();

  const [draft, setDraft] = useState<ProductFormValues | null>(null);
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const formValues =
    draft ??
    (data
      ? {
          title: data.title,
          description: data.description,
          category: data.category,
          price: String(data.price),
          stock: String(data.stock),
        }
      : null);

  const handleSave = () => {
    if (!formValues) {
      return;
    }

    const parsed = parseProductForm(formValues);

    if (!parsed.data) {
      setErrors(parsed.errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    updateProduct(
      {
        id,
        productData: {
          title: parsed.data.title,
          description: parsed.data.description,
          category: parsed.data.category,
          price: parsed.data.price,
          stock: parsed.data.stock,
        },
      },
      {
        onSuccess: () => {
          setErrors({});
          toast.success("Product saved successfully");
          router.push("/products");
        },
        onError: () => {
          toast.error("Failed to save product");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        router.push("/products");
      },
    });
  };

  if (isPending) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading product details...
      </p>
    );
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

  if (!formValues) {
    return (
      <p className="text-sm text-muted-foreground">Preparing product form...</p>
    );
  }

  return (
    <article className="space-y-4">
      <Link
        href="/products"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to products
      </Link>

      <h1 className="text-3xl font-semibold text-foreground">Edit Product</h1>
      <p className="text-sm text-muted-foreground">Rating: {data.rating}</p>

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <ProductFormFields
          values={formValues}
          onChange={(nextValues) => {
            setDraft(nextValues);
            if (Object.keys(errors).length > 0) {
              setErrors(validateProductForm(nextValues));
            }
          }}
          errors={errors}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            disabled={isUpdating || isDeleting}
            onClick={handleSave}
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                disabled={isUpdating || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this product?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </article>
  );
}
