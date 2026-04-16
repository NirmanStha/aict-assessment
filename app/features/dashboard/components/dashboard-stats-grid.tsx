import { BarChart3, Boxes, ReceiptText, Users } from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCompactNumber,
  type DashboardMetrics,
} from "@/app/features/dashboard/utils/dashboard.metrics";

type DashboardStatsGridProps = {
  isLoading: boolean;
  metrics: DashboardMetrics;
};

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
};

function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <Card className="border border-border/80 bg-card">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs uppercase tracking-[0.18em]">
          {title}
        </CardDescription>
        <CardTitle className="flex items-center justify-between text-3xl font-semibold">
          {value}
          <span className="rounded-full border border-border bg-muted p-2 text-muted-foreground">
            {icon}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardStatsGrid({
  isLoading,
  metrics,
}: DashboardStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-36 rounded-xl" />
        ))
      ) : (
        <>
          <StatCard
            title="Total Records"
            value={formatCompactNumber(metrics.totalEntities)}
            subtitle="Across posts, users, and products"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <StatCard
            title="Posts"
            value={formatCompactNumber(metrics.totalPosts)}
            subtitle={`Avg ${formatCompactNumber(metrics.avgViews)} views per post`}
            icon={<ReceiptText className="h-4 w-4" />}
          />
          <StatCard
            title="Products"
            value={formatCompactNumber(metrics.totalProducts)}
            subtitle={`Avg $${metrics.avgPrice.toFixed(1)} in sampled catalog`}
            icon={<Boxes className="h-4 w-4" />}
          />
          <StatCard
            title="Users"
            value={formatCompactNumber(metrics.totalUsers)}
            subtitle="Audience scale in your active tenant"
            icon={<Users className="h-4 w-4" />}
          />
        </>
      )}
    </div>
  );
}
