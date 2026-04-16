import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const loginResponse = await fetch(`${DUMMYJSON_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
        expiresInMins: body.expiresInMins ?? 30,
      }),
      cache: "no-store",
    });

    const data = await loginResponse.json();

    if (!loginResponse.ok) {
      return NextResponse.json(data, { status: loginResponse.status });
    }

    const res = NextResponse.json(
      {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        gender: data.gender,
        tokenExpiresAt: decodeTokenExpiry(data.accessToken),
      },
      { status: 200 },
    );

    res.cookies.set(ACCESS_COOKIE, data.accessToken, cookieOptions(60 * 30));
    res.cookies.set(
      REFRESH_COOKIE,
      data.refreshToken,
      cookieOptions(60 * 60 * 24 * 7),
    );

    return res;
  } catch {
    return NextResponse.json(
      { message: "Unable to complete login at this time." },
      { status: 500 },
    );
  }
}
