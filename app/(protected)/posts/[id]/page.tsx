"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePostQuery } from "@/app/features/posts/hooks/use-posts";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, isPending, isError } = usePostQuery(id);

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
      <h1 className="text-3xl font-semibold text-slate-900">{data.title}</h1>
      <p className="text-sm text-slate-500">Views: {data.views}</p>
      <p className="text-base leading-7 text-slate-700">{data.body}</p>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
