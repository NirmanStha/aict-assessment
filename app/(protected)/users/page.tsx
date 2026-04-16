import Link from "next/link";
import { UsersTable } from "@/app/features/users/components/users-table";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-slate-900">Users</h2>
        <Link href="/users/create">
          <Button type="button">Create User</Button>
        </Link>
      </div>
      <UsersTable />
    </section>
  );
}
