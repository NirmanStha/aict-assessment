"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCreatePostMutation } from "@/app/features/posts/hooks/use-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePostPage() {
  const router = useRouter();
  const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [userId, setUserId] = useState("1");

  const handleCreate = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const parsedUserId = Number(userId);
    const tags = tagsInput
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
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Title</p>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Write a title"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Body</p>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-36 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Write the post content"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">
            Tags (comma separated)
          </p>
          <Input
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            placeholder="news, tech"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">User ID</p>
          <Input
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="1"
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" disabled={isCreating} onClick={handleCreate}>
            {isCreating ? "Creating..." : "Create post"}
          </Button>
        </div>
      </div>
    </article>
  );
}
