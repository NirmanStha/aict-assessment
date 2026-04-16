"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type UserFormErrors,
  UserFormFields,
  type UserFormValues,
} from "@/app/features/users/components/user-form-fields";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "@/app/features/users/hooks/use-users";
import {
  parseUserForm,
  validateUserForm,
} from "@/app/features/users/validation/user-form.schema";
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

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = useUserQuery(id);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserMutation();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const [draft, setDraft] = useState<UserFormValues | null>(null);
  const [errors, setErrors] = useState<UserFormErrors>({});

  const formValues =
    draft ??
    (data
      ? {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          age: String(data.age),
          role: data.role ?? "",
        }
      : null);

  const handleSave = () => {
    if (!formValues) {
      return;
    }

    const parsed = parseUserForm(formValues);

    if (!parsed.data) {
      setErrors(parsed.errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    updateUser(
      {
        id,
        userData: {
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          age: parsed.data.age,
          role: parsed.data.role,
        },
      },
      {
        onSuccess: () => {
          setErrors({});
          toast.success("User saved successfully");
          router.push("/users");
        },
        onError: () => {
          toast.error("Failed to save user");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteUser(id, {
      onSuccess: () => {
        router.push("/users");
      },
    });
  };

  if (isPending) {
    return (
      <p className="text-sm text-muted-foreground">Loading user details...</p>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Failed to load this user.</p>
        <Link
          href="/users"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          Back to users
        </Link>
      </div>
    );
  }

  if (!formValues) {
    return (
      <p className="text-sm text-muted-foreground">Preparing user form...</p>
    );
  }

  return (
    <article className="space-y-4">
      <Link
        href="/users"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to users
      </Link>

      <h1 className="text-3xl font-semibold text-foreground">Edit User</h1>
      <p className="text-sm text-muted-foreground">Username: {data.username}</p>

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <UserFormFields
          values={formValues}
          onChange={(nextValues) => {
            setDraft(nextValues);
            if (Object.keys(errors).length > 0) {
              setErrors(validateUserForm(nextValues));
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
                <AlertDialogTitle>Delete this user?</AlertDialogTitle>
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
