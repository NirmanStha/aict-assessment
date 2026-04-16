import { NextResponse } from "next/server";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const clearedCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
};

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, "", clearedCookieOptions);
  response.cookies.set(REFRESH_COOKIE, "", clearedCookieOptions);
  return response;
}
