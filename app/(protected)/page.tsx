"use client";

import { useMeQuery } from "@/app/features/auth/hooks/use-auth";
import { DashboardView } from "@/app/features/dashboard/components/dashboard-view";
import { buildDashboardMetrics } from "@/app/features/dashboard/utils/dashboard.metrics";
import { usePostsQuery } from "@/app/features/posts/hooks/use-posts";
import { useProductsQuery } from "@/app/features/products/hooks/use-products";
import { useUsersQuery } from "@/app/features/users/hooks/use-users";

export default function DashboardPage() {
  const { data: me } = useMeQuery();
  const postsQuery = usePostsQuery(50, 0);
  const productsQuery = useProductsQuery(50, 0);
  const usersQuery = useUsersQuery(50, 0);

  const isLoading =
    postsQuery.isPending || productsQuery.isPending || usersQuery.isPending;

  const posts = postsQuery.data?.posts ?? [];
  const products = productsQuery.data?.products ?? [];
  const users = usersQuery.data?.users ?? [];

  const metrics = buildDashboardMetrics({
    posts,
    products,
    users,
    postsTotal: postsQuery.data?.total,
    productsTotal: productsQuery.data?.total,
    usersTotal: usersQuery.data?.total,
  });

  return (
    <DashboardView
      isLoading={isLoading}
      displayName={me?.firstName ?? me?.username ?? "builder"}
      metrics={metrics}
    />
  );
}
