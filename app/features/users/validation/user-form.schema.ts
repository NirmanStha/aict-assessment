import { z } from "zod";
import type {
  UserFormErrors,
  UserFormValues,
} from "@/app/features/users/components/user-form-fields";

const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(2, "First name must be at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(2, "Last name must be at least 2 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^\+?[0-9()\-.\s]{7,20}$/, "Please enter a valid phone number."),
  age: z
    .string()
    .trim()
    .min(1, "Age is required.")
    .refine((value) => Number.isFinite(Number(value)), {
      message: "Age must be a valid number.",
    })
    .refine((value) => Number.isInteger(Number(value)), {
      message: "Age must be a whole number.",
    })
    .refine((value) => Number(value) >= 13 && Number(value) <= 120, {
      message: "Age must be between 13 and 120.",
    })
    .transform((value) => Number(value)),
  role: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 || (value.length >= 2 && value.length <= 30),
      {
        message: "Role must be between 2 and 30 characters when provided.",
      },
    )
    .transform((value) => (value.length === 0 ? undefined : value)),
});

export type ParsedUserFormValues = z.infer<typeof userFormSchema>;

function toUserFormErrors(error: z.ZodError): UserFormErrors {
  const fieldErrors = error
    .flatten()
    .fieldErrors as Record<string, string[] | undefined>;

  return {
    firstName: fieldErrors.firstName?.[0],
    lastName: fieldErrors.lastName?.[0],
    email: fieldErrors.email?.[0],
    phone: fieldErrors.phone?.[0],
    age: fieldErrors.age?.[0],
    role: fieldErrors.role?.[0],
  };
}

export function parseUserForm(values: UserFormValues): {
  data?: ParsedUserFormValues;
  errors: UserFormErrors;
} {
  const parsed = userFormSchema.safeParse(values);

  if (parsed.success) {
    return { data: parsed.data, errors: {} };
  }

  return {
    errors: toUserFormErrors(parsed.error),
  };
}

export function validateUserForm(values: UserFormValues): UserFormErrors {
  return parseUserForm(values).errors;
}
