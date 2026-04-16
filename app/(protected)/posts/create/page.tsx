"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useMeQuery } from "@/app/features/auth/hooks/use-auth";
import {
  PostFormFields,
  type PostFormValues,
} from "@/app/features/posts/components/post-form-fields";
import { useCreatePostMutation } from "@/app/features/posts/hooks/use-posts";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const router = useRouter();
  const { data: me } = useMeQuery();
  const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();

  const [formValues, setFormValues] = useState<PostFormValues>({
    title: "",
    body: "",
    tagsInput: "",
  });

  const handleCreate = () => {
    const trimmedTitle = formValues.title.trim();
    const trimmedBody = formValues.body.trim();
    const parsedUserId = me?.id ?? 1;
    const tags = formValues.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!trimmedTitle || !trimmedBody || !Number.isFinite(parsedUserId)) {
      toast.error("Please provide a valid title and body.");
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
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to posts
      </Link>

      <h1 className="text-3xl font-semibold text-foreground">Create Post</h1>
      <p className="text-sm text-muted-foreground">
        Posting as {me?.username ?? "current user"}
      </p>

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <PostFormFields
          values={formValues}
          onChange={setFormValues}
          showPlaceholders
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
