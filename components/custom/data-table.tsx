"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

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
  editActionLabel?: string;
  onDelete?: (row: T) => void;
  deleteDialogTitle?: string;
  deleteActionLabel?: string;
  isDeleting?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  getEditHref,
  editActionLabel = "Edit",
  onDelete,
  deleteDialogTitle = "Delete this item?",
  deleteActionLabel = "Delete",
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
              <TableCell
                key={column.key}
                className={cn("text-center", column.className)}
              >
                {column.render(row)}
              </TableCell>
            ))}
            {showActions ? (
              <TableCell>
                <div className="flex justify-center items-center gap-2">
                  {getEditHref ? (
                    <Link href={getEditHref(row)}>
                      <Button aria-label={editActionLabel}>
                        <Pen />
                      </Button>
                    </Link>
                  ) : null}
                  {onDelete ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          disabled={isDeleting}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {deleteDialogTitle}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isDeleting}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() => onDelete(row)}
                          >
                            {isDeleting ? "Deleting..." : deleteActionLabel}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
