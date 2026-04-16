"use client";

import Link from "next/link";
import { usePostsQuery } from "@/app/features/posts/hooks/use-posts";

export default function PostsPage() {
  const { data, isPending, isError } = usePostsQuery(12, 0);

  if (isPending) {
    return <p className="text-sm text-slate-600">Loading posts...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-600">
        Failed to load posts. Try refreshing this page.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Posts</h2>
        <p className="text-sm text-slate-600">
          Showing {data.posts.length} of {data.total} posts from DummyJSON.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">
              {post.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="mt-4 inline-block text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
            >
              Read post
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
