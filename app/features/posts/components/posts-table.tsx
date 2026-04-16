"use client";

import { useMemo, useState } from "react";
import {
  useDeletePostMutation,
  usePaginatedPostsQuery,
} from "@/app/features/posts/hooks/use-posts";
import type { Post } from "@/app/features/posts/types/posts.types";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/custom/data-table";
import { PaginationControls } from "@/components/custom/pagination-controls";

const postColumns: DataTableColumn<Post>[] = [
  {
    key: "id",
    header: "ID",
    render: (post) => post.id,
  },
  {
    key: "title",
    header: "Title",
    className: "font-medium text-slate-900",
    render: (post) => post.title,
  },
  {
    key: "body",
    header: "Body",
    className: "max-w-xl whitespace-normal text-slate-600",
    render: (post) =>
      post.body.substring(0, 100) + (post.body.length > 50 ? "..." : ""),
  },
  {
    key: "views",
    header: "Views",
    render: (post) => post.views,
  },
];

export function PostsTable() {
  const pageSize = 12;
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = usePaginatedPostsQuery(page, pageSize);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1;
    }

    return Math.max(1, Math.ceil(data.total / pageSize));
  }, [data?.total, pageSize]);

  const rangeStart = useMemo(() => {
    if (!data?.total) {
      return 0;
    }

    return (page - 1) * pageSize + 1;
  }, [data?.total, page, pageSize]);

  const rangeEnd = useMemo(() => {
    if (!data?.total) {
      return 0;
    }

    return Math.min((page - 1) * pageSize + data.posts.length, data.total);
  }, [data?.posts.length, data?.total, page, pageSize]);

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
    <section className="space-y-3">
      <p className="text-sm text-slate-600">
        Showing {rangeStart}-{rangeEnd} of {data.total} posts from DummyJSON.
      </p>

      <DataTable
        data={data.posts}
        columns={postColumns}
        getRowKey={(post) => post.id}
        getEditHref={(post) => `/posts/${post.id}`}
        onDelete={(post) => deletePost(post.id)}
        isDeleting={isDeleting}
      />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        disabled={isPending}
        onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      />
    </section>
  );
}
