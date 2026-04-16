import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DUMMYJSON_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token missing." },
        { status: 401 },
      );
    }

    const refreshResponse = await fetch(`${DUMMYJSON_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: body.expiresInMins ?? 30,
      }),
      cache: "no-store",
    });

    const data = await refreshResponse.json();

    if (!refreshResponse.ok) {
      return NextResponse.json(data, { status: refreshResponse.status });
    }

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(ACCESS_COOKIE, data.accessToken, cookieOptions(60 * 30));
    res.cookies.set(
      REFRESH_COOKIE,
      data.refreshToken,
      cookieOptions(60 * 60 * 24 * 7),
    );

    return res;
  } catch {
    return NextResponse.json(
      { message: "Unable to refresh session." },
      { status: 500 },
    );
  }
}
