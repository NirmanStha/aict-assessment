"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  UserFormFields,
  type UserFormValues,
} from "@/app/features/users/components/user-form-fields";
import { useCreateUserMutation } from "@/app/features/users/hooks/use-users";
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

  const handleCreate = () => {
    const trimmedFirstName = formValues.firstName.trim();
    const trimmedLastName = formValues.lastName.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedPhone = formValues.phone.trim();
    const trimmedRole = formValues.role.trim();
    const parsedAge = Number(formValues.age);

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !Number.isFinite(parsedAge)
    ) {
      toast.error("Please provide valid user details.");
      return;
    }

    createUser(
      {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        phone: trimmedPhone,
        age: parsedAge,
        role: trimmedRole || undefined,
      },
      {
        onSuccess: (createdUser) => {
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
        className="text-sm text-slate-600 underline-offset-4 hover:underline"
      >
        Back to users
      </Link>

      <h1 className="text-3xl font-semibold text-slate-900">Create User</h1>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <UserFormFields
          values={formValues}
          onChange={setFormValues}
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
