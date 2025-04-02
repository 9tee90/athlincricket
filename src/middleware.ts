import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes
    if (path.startsWith("/admin") && !token?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    // XPro routes
    if (path.startsWith("/xpro") && token?.role !== "xpro") {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    // Sponsor routes
    if (path.startsWith("/sponsor") && token?.role !== "sponsor") {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/xpro/:path*",
    "/sponsor/:path*",
    "/api/admin/:path*",
    "/api/xpro/:path*",
    "/api/sponsor/:path*",
  ],
} 