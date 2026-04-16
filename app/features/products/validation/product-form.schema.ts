import { z } from "zod";
import type {
  ProductFormErrors,
  ProductFormValues,
} from "@/app/features/products/components/product-form-fields";

const productFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .min(10, "Description must be at least 10 characters."),
  category: z
    .string()
    .trim()
    .min(1, "Category is required.")
    .min(2, "Category must be at least 2 characters."),
  price: z
    .string()
    .trim()
    .min(1, "Price is required.")
    .refine((value) => Number.isFinite(Number(value)), {
      message: "Price must be a valid number.",
    })
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0.",
    })
    .transform((value) => Number(value)),
  stock: z
    .string()
    .trim()
    .min(1, "Stock is required.")
    .refine((value) => Number.isFinite(Number(value)), {
      message: "Stock must be a valid number.",
    })
    .refine((value) => Number.isInteger(Number(value)), {
      message: "Stock must be a whole number.",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Stock cannot be negative.",
    })
    .transform((value) => Number(value)),
});

export type ParsedProductFormValues = z.infer<typeof productFormSchema>;

function toProductFormErrors(error: z.ZodError): ProductFormErrors {
  const fieldErrors = error
    .flatten()
    .fieldErrors as Record<string, string[] | undefined>;

  return {
    title: fieldErrors.title?.[0],
    description: fieldErrors.description?.[0],
    category: fieldErrors.category?.[0],
    price: fieldErrors.price?.[0],
    stock: fieldErrors.stock?.[0],
  };
}

export function parseProductForm(values: ProductFormValues): {
  data?: ParsedProductFormValues;
  errors: ProductFormErrors;
} {
  const parsed = productFormSchema.safeParse(values);

  if (parsed.success) {
    return { data: parsed.data, errors: {} };
  }

  return {
    errors: toProductFormErrors(parsed.error),
  };
}

export function validateProductForm(
  values: ProductFormValues,
): ProductFormErrors {
  return parseProductForm(values).errors;
}
