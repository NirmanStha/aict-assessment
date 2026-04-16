import { PostsTable } from "@/app/features/posts/components/posts-table";

export default function PostsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Posts</h2>
      </div>
      <PostsTable />
    </section>
  );
}
