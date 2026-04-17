import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  isFetching?: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function PaginationControls({
  page,
  totalPages,
  disabled = false,
  isFetching = false,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Page <span className="font-semibold text-foreground">{page}</span> of{" "}
          <span className="font-semibold text-foreground">{totalPages}</span>
          {isFetching ? " • Updating..." : ""}
        </p>

        <div className="flex items-center gap-2 rounded-xl p-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || isFetching || page <= 1}
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={disabled || isFetching || page >= totalPages}
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
