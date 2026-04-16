"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type UserFormErrors,
  UserFormFields,
  type UserFormValues,
} from "@/app/features/users/components/user-form-fields";
import { useCreateUserMutation } from "@/app/features/users/hooks/use-users";
import {
  parseUserForm,
  validateUserForm,
} from "@/app/features/users/validation/user-form.schema";
import { Button } from "@/components/ui/button";

export default function CreateUserPage() {
  const router = useRouter();
  const { mutate: createUser, isPending: isCreating } = useCreateUserMutation();

  const [formValues, setFormValues] = useState<UserFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    role: "",
  });
  const [errors, setErrors] = useState<UserFormErrors>({});

  const handleFormChange = (nextValues: UserFormValues) => {
    setFormValues(nextValues);
    if (Object.keys(errors).length > 0) {
      setErrors(validateUserForm(nextValues));
    }
  };

  const handleCreate = () => {
    const parsed = parseUserForm(formValues);

    if (!parsed.data) {
      setErrors(parsed.errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    createUser(
      {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        age: parsed.data.age,
        role: parsed.data.role,
      },
      {
        onSuccess: (createdUser) => {
          setErrors({});
          toast.success(`User ${createdUser.id} created successfully`);
          router.push("/users");
        },
        onError: () => {
          toast.error("Failed to create user");
        },
      },
    );
  };

  return (
    <article className="space-y-4">
      <Link
        href="/users"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to users
      </Link>

      <h1 className="text-3xl font-semibold text-foreground">Create User</h1>

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <UserFormFields
          values={formValues}
          onChange={handleFormChange}
          errors={errors}
          showPlaceholders
        />

        <div className="flex justify-end">
          <Button type="button" disabled={isCreating} onClick={handleCreate}>
            {isCreating ? "Creating..." : "Create user"}
          </Button>
        </div>
      </div>
    </article>
  );
}
