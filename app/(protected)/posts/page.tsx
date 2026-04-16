import Link from "next/link";
import { PostsTable } from "@/app/features/posts/components/posts-table";
import { Button } from "@/components/ui/button";

export default function PostsPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-foreground">Posts</h2>
        <Link href="/posts/create">
          <Button type="button">Create Post</Button>
        </Link>
      </div>
      <PostsTable />
    </section>
  );
}
