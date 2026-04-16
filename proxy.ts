import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/") {
    return true;
  }

  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/posts" ||
    pathname.startsWith("/posts/") ||
    pathname === "/products" ||
    pathname.startsWith("/products/")
  );
}

function isPublicAuthPath(pathname: string): boolean {
  return pathname === "/login" || pathname === "/register";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasSession = Boolean(accessToken || refreshToken);

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicAuthPath(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/posts/:path*",
    "/products/:path*",
    "/login",
    "/register",
  ],
};
