import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  categoryChartConfig,
  type DashboardMetrics,
  viewsChartConfig,
} from "@/app/features/dashboard/utils/dashboard.metrics";

type DashboardPrimaryChartsProps = {
  isLoading: boolean;
  metrics: DashboardMetrics;
};

const BAR_COLOR = "#bfdbfe";

export function DashboardPrimaryCharts({
  isLoading,
  metrics,
}: DashboardPrimaryChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border border-border/80 bg-card">
        <CardHeader>
          <CardTitle>Top Posts by Views</CardTitle>
          <CardDescription>
            Simple ranking of the most viewed fetched posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-56 w-full rounded-lg" />
          ) : (
            <ChartContainer className="h-56 w-full" config={viewsChartConfig}>
              <BarChart
                data={metrics.topPostViewsData}
                margin={{ left: 8, right: 8 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="post"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="views" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card">
        <CardHeader>
          <CardTitle>Top Product Categories</CardTitle>
          <CardDescription>
            Distribution from currently fetched catalog entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-56 w-full rounded-lg" />
          ) : (
            <ChartContainer
              className="h-56 w-full"
              config={categoryChartConfig}
            >
              <BarChart
                data={metrics.categoryData}
                margin={{ left: 8, right: 8 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
