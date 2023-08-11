import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchToken } from "./lib/actions";

export async function middleware(req: NextRequest) {
  const token = await fetchToken();

  if (!token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/create-post", "/edit-post", "/settings"],
};
