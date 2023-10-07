import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// middleware example, to allow only authorized users.
// https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies
export function middleware(request: NextRequest) {
  let authToken = request.cookies.get("authToken")

  if (authToken) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/login", request.url))
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
}
