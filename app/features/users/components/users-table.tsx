"use client";

import { useMemo, useState } from "react";
import {
  useDeleteUserMutation,
  usePaginatedUsersQuery,
} from "@/app/features/users/hooks/use-users";
import type { User } from "@/app/features/users/types/users.types";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/custom/data-table";
import { DataTableSkeleton } from "@/components/custom/data-table-skeleton";
import { PaginationControls } from "@/components/custom/pagination-controls";
import { Skeleton } from "@/components/ui/skeleton";

const userColumns: DataTableColumn<User>[] = [
  {
    key: "id",
    header: "ID",
    render: (user) => user.id,
  },
  {
    key: "name",
    header: "Name",
    className: "font-medium text-foreground",
    render: (user) => `${user.firstName} ${user.lastName}`,
  },
  {
    key: "email",
    header: "Email",
    render: (user) => user.email,
  },
  {
    key: "phone",
    header: "Phone",
    render: (user) => user.phone,
  },
  {
    key: "role",
    header: "Role",
    render: (user) => user.role ?? "-",
  },
];

export function UsersTable() {
  const pageSize = 12;
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching, isError } = usePaginatedUsersQuery(
    page,
    pageSize,
  );
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

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

    return Math.min((page - 1) * pageSize + data.users.length, data.total);
  }, [data?.users.length, data?.total, page, pageSize]);

  if (isPending) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-4 w-72" />
        <DataTableSkeleton columnCount={userColumns.length} />
        <PaginationControls
          page={page}
          totalPages={1}
          disabled
          onPrevious={() => {}}
          onNext={() => {}}
        />
      </section>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-600">
        Failed to load users. Try refreshing this page.
      </p>
    );
  }

  return (
    <section className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Showing {rangeStart}-{rangeEnd} of {data.total} users from DummyJSON.
      </p>

      {isFetching ? (
        <DataTableSkeleton columnCount={userColumns.length} />
      ) : (
        <DataTable
          data={data.users}
          columns={userColumns}
          getRowKey={(user) => user.id}
          getEditHref={(user) => `/users/${user.id}`}
          editActionLabel="Edit user"
          onDelete={(user) => deleteUser(user.id)}
          deleteDialogTitle="Delete this user?"
          deleteActionLabel="Delete"
          isDeleting={isDeleting}
        />
      )}

      <PaginationControls
        page={page}
        totalPages={totalPages}
        disabled={isPending}
        isFetching={isFetching}
        onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      />
    </section>
  );
}
