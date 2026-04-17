import type { ComponentProps } from "react";
import { Pie, PieChart, Sector } from "recharts";
import { Badge } from "@/components/ui/badge";
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
  ageChartConfig,
  type DashboardMetrics,
} from "@/app/features/dashboard/utils/dashboard.metrics";

type DashboardSecondarySectionProps = {
  isLoading: boolean;
  metrics: DashboardMetrics;
};

const PIE_COLORS = ["#93c5fd", "#86efac", "#f9a8d4", "#fde68a", "#c4b5fd"];

type PieShapeProps = ComponentProps<typeof Sector> & {
  index?: number;
};

function renderAgeMixShape(props: PieShapeProps) {
  const color = PIE_COLORS[(props.index ?? 0) % PIE_COLORS.length];
  return <Sector {...props} fill={color} />;
}

export function DashboardSecondarySection({
  isLoading,
  metrics,
}: DashboardSecondarySectionProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
      <Card className="border border-border/80 bg-card">
        <CardHeader>
          <CardTitle>Audience Age Mix</CardTitle>
          <CardDescription>Share of users by age segment.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-56 w-full rounded-lg" />
          ) : (
            <ChartContainer className="h-56 w-full" config={ageChartConfig}>
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={metrics.ageMixData}
                  dataKey="count"
                  nameKey="range"
                  innerRadius={55}
                  outerRadius={85}
                  strokeWidth={2}
                  shape={renderAgeMixShape}
                />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card">
        <CardHeader>
          <CardTitle>Trending Tags</CardTitle>
          <CardDescription>Most used tags in loaded posts.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-20 rounded-full" />
            ))
          ) : metrics.topTags.length ? (
            metrics.topTags.map(([tag, count], index) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border/80 px-3 py-1 text-xs"
                style={{
                  borderColor: PIE_COLORS[index % PIE_COLORS.length],
                  color: PIE_COLORS[index % PIE_COLORS.length],
                }}
              >
                #{tag} · {count}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No tags available yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
