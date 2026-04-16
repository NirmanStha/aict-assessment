"use client";

import { DashboardHeader } from "@/app/features/dashboard/components/dashboard-header";
import { DashboardPrimaryCharts } from "@/app/features/dashboard/components/dashboard-primary-charts";
import { DashboardSecondarySection } from "@/app/features/dashboard/components/dashboard-secondary-section";
import { DashboardStatsGrid } from "@/app/features/dashboard/components/dashboard-stats-grid";
import { type DashboardMetrics } from "@/app/features/dashboard/utils/dashboard.metrics";

type DashboardViewProps = {
  isLoading: boolean;
  displayName: string;
  metrics: DashboardMetrics;
};

export function DashboardView({
  isLoading,
  displayName,
  metrics,
}: DashboardViewProps) {
  return (
    <section className="space-y-6">
      <DashboardHeader displayName={displayName} />
      <DashboardStatsGrid isLoading={isLoading} metrics={metrics} />
      <DashboardPrimaryCharts isLoading={isLoading} metrics={metrics} />
      <DashboardSecondarySection isLoading={isLoading} metrics={metrics} />
    </section>
  );
}
