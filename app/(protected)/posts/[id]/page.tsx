"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "@/app/features/posts/hooks/use-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = usePostQuery(id);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }

    setTitle(data.title);
    setBody(data.body);
    setTagsInput(data.tags.join(", "));
  }, [data]);

  const handleSave = () => {
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    updatePost(
      {
        id,
        postData: {
          title,
          body,
          tags,
        },
      },
      {
        onSuccess: () => {
          toast.success("Post saved");
          router.push("/posts");
        },
        onError: () => {
          toast.error("Failed to save post");
        },
      },
    );
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
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Title</p>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Body</p>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-36 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">
            Tags (comma separated)
          </p>
          <Input
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" disabled={isUpdating} onClick={handleSave}>
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </article>
  );
}
