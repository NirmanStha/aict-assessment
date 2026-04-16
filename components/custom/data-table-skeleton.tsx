import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
  showActions?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 8,
  showActions = true,
}: DataTableSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnCount }).map((_, index) => (
            <TableHead key={`head-${index}`} className="text-center">
              <Skeleton className="mx-auto h-4 w-20" />
            </TableHead>
          ))}
          {showActions ? (
            <TableHead className="text-center">
              <Skeleton className="mx-auto h-4 w-16" />
            </TableHead>
          ) : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {Array.from({ length: columnCount }).map((__, colIndex) => (
              <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                <Skeleton className="mx-auto h-4 w-[85%] max-w-44" />
              </TableCell>
            ))}
            {showActions ? (
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
