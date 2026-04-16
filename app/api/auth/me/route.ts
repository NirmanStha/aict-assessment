import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DUMMYJSON_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

function decodeTokenExpiry(token: string): number | undefined {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf-8"),
    ) as { exp?: number };

    return payload.exp ? payload.exp * 1000 : undefined;
  } catch {
    return undefined;
  }
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

async function fetchProfile(accessToken: string) {
  return fetch(`${DUMMYJSON_BASE}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
    const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!accessToken && refreshToken) {
      const refreshResponse = await fetch(`${DUMMYJSON_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
        cache: "no-store",
      });

      if (!refreshResponse.ok) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const refreshed = await refreshResponse.json();
      const profileResponse = await fetchProfile(refreshed.accessToken);
      const profile = await profileResponse.json();

      if (!profileResponse.ok) {
        return NextResponse.json(profile, { status: profileResponse.status });
      }

      const res = NextResponse.json({
        ...profile,
        tokenExpiresAt: decodeTokenExpiry(refreshed.accessToken),
      });
      res.cookies.set(
        ACCESS_COOKIE,
        refreshed.accessToken,
        cookieOptions(60 * 30),
      );
      res.cookies.set(
        REFRESH_COOKIE,
        refreshed.refreshToken,
        cookieOptions(60 * 60 * 24 * 7),
      );
      return res;
    }

    const profileResponse = await fetchProfile(accessToken as string);

    if (profileResponse.status === 401 && refreshToken) {
      const refreshResponse = await fetch(`${DUMMYJSON_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
        cache: "no-store",
      });

      if (!refreshResponse.ok) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const refreshed = await refreshResponse.json();
      const retriedProfileResponse = await fetchProfile(refreshed.accessToken);
      const retriedProfile = await retriedProfileResponse.json();

      if (!retriedProfileResponse.ok) {
        return NextResponse.json(retriedProfile, {
          status: retriedProfileResponse.status,
        });
      }

      const res = NextResponse.json({
        ...retriedProfile,
        tokenExpiresAt: decodeTokenExpiry(refreshed.accessToken),
      });
      res.cookies.set(
        ACCESS_COOKIE,
        refreshed.accessToken,
        cookieOptions(60 * 30),
      );
      res.cookies.set(
        REFRESH_COOKIE,
        refreshed.refreshToken,
        cookieOptions(60 * 60 * 24 * 7),
      );
      return res;
    }

    const profile = await profileResponse.json();
    return NextResponse.json(
      {
        ...profile,
        tokenExpiresAt: decodeTokenExpiry(accessToken as string),
      },
      { status: profileResponse.status },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch profile." },
      { status: 500 },
    );
  }
}
