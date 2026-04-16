"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (row: T) => string | number;
  getEditHref?: (row: T) => string;
  onDelete?: (row: T) => void;
  isDeleting?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  getEditHref,
  onDelete,
  isDeleting = false,
}: DataTableProps<T>) {
  const showActions = Boolean(getEditHref || onDelete);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className="font-bold text-md leading-1 text-center"
            >
              {column.header}
            </TableHead>
          ))}
          {showActions ? (
            <TableHead className="font-bold text-md leading-1 text-center">
              Actions
            </TableHead>
          ) : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={getRowKey(row)}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render(row)}
              </TableCell>
            ))}
            {showActions ? (
              <TableCell>
                <div className="flex items-center gap-2">
                  {getEditHref ? (
                    <Link href={getEditHref(row)}>
                      <Button size="sm">Edit</Button>
                    </Link>
                  ) : null}
                  {onDelete ? (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
