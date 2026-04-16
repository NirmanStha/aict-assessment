import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type DashboardHeaderProps = {
  displayName: string;
};

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  return (
    <Card className="border border-border/80 bg-card">
      <CardContent className="space-y-4 p-6 md:p-8">
        <Badge variant="secondary" className="w-fit">
          Live workspace insights
        </Badge>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {displayName}.
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Monitor live totals and distribution across posts, users, and
            products from the API.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
