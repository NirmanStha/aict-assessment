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
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
      <Table className="min-w-[720px]">
        <TableHeader className="bg-muted/35">
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="h-11 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {column.header}
              </TableHead>
            ))}
            {showActions ? (
              <TableHead className="h-11 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Actions
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No data available.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={getRowKey(row)}
                className="odd:bg-background even:bg-muted/10"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn("py-3 text-center", column.className)}
                  >
                    {column.render(row)}
                  </TableCell>
                ))}
                {showActions ? (
                  <TableCell className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      {getEditHref ? (
                        <Link href={getEditHref(row)}>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label={editActionLabel}
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                        </Link>
                      ) : null}
                      {onDelete ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon-sm"
                              disabled={isDeleting}
                              aria-label={deleteActionLabel}
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
