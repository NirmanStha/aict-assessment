"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  PostFormFields,
  type PostFormValues,
} from "@/app/features/posts/components/post-form-fields";
import { useCreatePostMutation } from "@/app/features/posts/hooks/use-posts";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const router = useRouter();
  const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();

  const [formValues, setFormValues] = useState<PostFormValues>({
    title: "",
    body: "",
    tagsInput: "",
    userId: "1",
  });

  const handleCreate = () => {
    const trimmedTitle = formValues.title.trim();
    const trimmedBody = formValues.body.trim();
    const parsedUserId = Number(formValues.userId);
    const tags = formValues.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!trimmedTitle || !trimmedBody || !Number.isFinite(parsedUserId)) {
      toast.error("Please provide a valid title, body, and user id.");
      return;
    }

    createPost(
      {
        title: trimmedTitle,
        body: trimmedBody,
        tags,
        userId: parsedUserId,
      },
      {
        onSuccess: (createdPost) => {
          toast.success(`Post ${createdPost.id} created successfully`);
          router.push("/posts");
        },
        onError: () => {
          toast.error("Failed to create post");
        },
      },
    );
  };

  return (
    <article className="space-y-4">
      <Link
        href="/posts"
        className="text-sm text-slate-600 underline-offset-4 hover:underline"
      >
        Back to posts
      </Link>

      <h1 className="text-3xl font-semibold text-slate-900">Create Post</h1>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <PostFormFields
          values={formValues}
          onChange={setFormValues}
          showPlaceholders
          showUserId
        />

        <div className="flex justify-end">
          <Button type="button" disabled={isCreating} onClick={handleCreate}>
            {isCreating ? "Creating..." : "Create post"}
          </Button>
        </div>
      </div>
    </article>
  );
}
