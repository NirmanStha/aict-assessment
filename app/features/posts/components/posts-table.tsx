"use client";

import {
  useDeletePostMutation,
  usePostsQuery,
} from "@/app/features/posts/hooks/use-posts";
import type { Post } from "@/app/features/posts/types/posts.types";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/custom/data-table";

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
    render: (post) => post.body,
  },
  {
    key: "views",
    header: "Views",
    render: (post) => post.views,
  },
];

export function PostsTable() {
  const { data, isPending, isError } = usePostsQuery(12, 0);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();

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
        Showing {data.posts.length} of {data.total} posts from DummyJSON.
      </p>

      <DataTable
        data={data.posts}
        columns={postColumns}
        getRowKey={(post) => post.id}
        getEditHref={(post) => `/posts/${post.id}`}
        onDelete={(post) => deletePost(post.id)}
        isDeleting={isDeleting}
      />
    </section>
  );
}
