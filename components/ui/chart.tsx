"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.color,
  ) as Array<[string, { color: string }]>;

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig.map(([key, cfg]) => `  --color-${key}: ${cfg.color};`).join("\n")}
}
`,
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type ChartTooltipContentProps = React.ComponentProps<
  typeof RechartsPrimitive.Tooltip
> & {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string | number;
  className?: string;
  hideLabel?: boolean;
};

type TooltipItem = {
  dataKey?: string | number;
  name?: string | number;
  color?: string;
  value?: string | number | null;
};

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  const items = payload as TooltipItem[];

  return (
    <div
      className={cn(
        "min-w-35 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground shadow-xl",
        className,
      )}
    >
      {!hideLabel && label ? (
        <p className="mb-1 text-[11px] text-muted-foreground">
          {String(label)}
        </p>
      ) : null}
      <div className="space-y-1">
        {items.map((item, index) => {
          const key = String(item.dataKey || item.name || index);
          const itemConfig = config[key];
          const indicatorColor = item.color || `var(--color-${key})`;

          return (
            <div key={key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: indicatorColor }}
                />
                <span className="text-xs text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
              </div>
              <span className="text-xs font-medium">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

export { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent };
