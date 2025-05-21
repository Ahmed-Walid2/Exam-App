import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = new Set(["/auth/signup", "/auth/signin", "/auth/forgot-password", "/auth/set-password", "/auth/verify-code", "/"]);
const publicPages = new Set([...Array.from(authPages), "/"]);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const redirectLoginUrl = new URL("/auth/signin", req.nextUrl.origin);

  if (publicPages.has(req.nextUrl.pathname)) {
    if (!token) return NextResponse.next();

    if (authPages.has(req.nextUrl.pathname)) {
      const redirectUrl = new URL("/student/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (token) return NextResponse.next();

  return NextResponse.redirect(redirectLoginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
