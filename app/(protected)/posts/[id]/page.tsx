"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  PostFormFields,
  type PostFormValues,
} from "@/app/features/posts/components/post-form-fields";
import {
  useDeletePostMutation,
  usePostQuery,
  useUpdatePostMutation,
} from "@/app/features/posts/hooks/use-posts";
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

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = usePostQuery(id);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();

  const [draft, setDraft] = useState<PostFormValues | null>(null);

  const formValues =
    draft ??
    (data
      ? {
          title: data.title,
          body: data.body,
          tagsInput: data.tags.join(", "),
        }
      : null);

  const handleSave = () => {
    if (!formValues) {
      return;
    }

    const tags = formValues.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    updatePost(
      {
        id,
        postData: {
          title: formValues.title,
          body: formValues.body,
          tags,
        },
      },
      {
        onSuccess: () => {
          toast.success("Post saved successfully");
          router.push("/posts");
        },
        onError: () => {
          toast.error("Failed to save post");
        },
      },
    );
  };

  const handleDelete = () => {
    deletePost(id, {
      onSuccess: () => {
        router.push("/posts");
      },
    });
  };

  if (isPending) {
    return <p className="text-sm text-slate-600">Loading post details...</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Failed to load this post.</p>
        <Link
          href="/posts"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          Back to posts
        </Link>
      </div>
    );
  }

  if (!formValues) {
    return <p className="text-sm text-slate-600">Preparing post form...</p>;
  }

  return (
    <article className="space-y-4">
      <Link
        href="/posts"
        className="text-sm text-slate-600 underline-offset-4 hover:underline"
      >
        Back to posts
      </Link>

      <h1 className="text-3xl font-semibold text-slate-900">Edit Post</h1>
      <p className="text-sm text-slate-500">Views: {data.views}</p>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <PostFormFields values={formValues} onChange={setDraft} />

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
                <AlertDialogTitle>Delete this post?</AlertDialogTitle>
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
