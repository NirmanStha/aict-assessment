import type { Post } from "@/app/features/posts/types/posts.types";
import type { Product } from "@/app/features/products/types/products.types";
import type { User } from "@/app/features/users/types/users.types";
import type { ChartConfig } from "@/components/ui/chart";

export type DashboardMetrics = {
  totalPosts: number;
  totalProducts: number;
  totalUsers: number;
  totalEntities: number;
  avgViews: number;
  avgPrice: number;
  categoryData: Array<{ category: string; count: number }>;
  ageMixData: Array<{ range: string; count: number }>;
  topPostViewsData: Array<{ post: string; views: number }>;
  topTags: Array<[string, number]>;
};

export const viewsChartConfig = {
  views: {
    label: "Views",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const categoryChartConfig = {
  count: {
    label: "Products",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const ageChartConfig = {
  count: {
    label: "Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function buildDashboardMetrics(params: {
  posts: Post[];
  products: Product[];
  users: User[];
  postsTotal?: number;
  productsTotal?: number;
  usersTotal?: number;
}): DashboardMetrics {
  const { posts, products, users, postsTotal, productsTotal, usersTotal } =
    params;

  const totalPosts = postsTotal ?? posts.length;
  const totalProducts = productsTotal ?? products.length;
  const totalUsers = usersTotal ?? users.length;
  const totalEntities = totalPosts + totalProducts + totalUsers;

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const avgViews = posts.length ? Math.round(totalViews / posts.length) : 0;
  const avgPrice = products.length
    ? products.reduce((sum, product) => sum + product.price, 0) /
      products.length
    : 0;

  const categoryData = Object.entries(
    products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, count]) => ({
      category: category.length > 10 ? `${category.slice(0, 10)}...` : category,
      count,
    }));

  const ageMixData = [
    { range: "<25", count: users.filter((user) => user.age < 25).length },
    {
      range: "25-34",
      count: users.filter((user) => user.age >= 25 && user.age <= 34).length,
    },
    {
      range: "35-49",
      count: users.filter((user) => user.age >= 35 && user.age <= 49).length,
    },
    { range: "50+", count: users.filter((user) => user.age >= 50).length },
  ];

  const topPostViewsData = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)
    .map((post) => ({
      post:
        post.title.length > 14 ? `${post.title.slice(0, 14)}...` : post.title,
      views: post.views,
    }));

  const topTags = Object.entries(
    posts.reduce<Record<string, number>>((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return {
    totalPosts,
    totalProducts,
    totalUsers,
    totalEntities,
    avgViews,
    avgPrice,
    categoryData,
    ageMixData,
    topPostViewsData,
    topTags,
  };
}
