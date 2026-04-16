import { z } from "zod";
import type {
  PostFormErrors,
  PostFormValues,
} from "@/app/features/posts/components/post-form-fields";

const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .min(3, "Title must be at least 3 characters.")
    .max(120, "Title cannot exceed 120 characters."),
  body: z
    .string()
    .trim()
    .min(1, "Body is required.")
    .min(10, "Body must be at least 10 characters."),
  tagsInput: z
    .string()
    .refine(
      (value) => {
        const tags = value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        return tags.length <= 10;
      },
      { message: "You can add up to 10 tags." },
    )
    .refine(
      (value) => {
        const tags = value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        return tags.every((tag) => tag.length <= 20);
      },
      { message: "Each tag must be 20 characters or less." },
    ),
});

const parsedPostFormSchema = postFormSchema.transform((values) => ({
  title: values.title,
  body: values.body,
  tags: values.tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean),
}));

export type ParsedPostFormValues = z.infer<typeof parsedPostFormSchema>;

function toPostFormErrors(error: z.ZodError): PostFormErrors {
  const fieldErrors = error
    .flatten()
    .fieldErrors as Record<string, string[] | undefined>;

  return {
    title: fieldErrors.title?.[0],
    body: fieldErrors.body?.[0],
    tagsInput: fieldErrors.tagsInput?.[0],
  };
}

export function parsePostForm(values: PostFormValues): {
  data?: ParsedPostFormValues;
  errors: PostFormErrors;
} {
  const parsed = parsedPostFormSchema.safeParse(values);

  if (parsed.success) {
    return { data: parsed.data, errors: {} };
  }

  return {
    errors: toPostFormErrors(parsed.error),
  };
}

export function validatePostForm(values: PostFormValues): PostFormErrors {
  return parsePostForm(values).errors;
}
