import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// Routes that require authentication
const protectedRoutes = [
  "/account",
  "/orders",
  "/checkout",
  "/cart", // Add cart to protected routes
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Check if the path is an auth route
  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // If no token and trying to access protected route, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // If token exists, verify it
  if (token) {
    try {
      // Verify token
      const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
      verify(token, JWT_SECRET);

      // If verified and trying to access auth route, redirect to home
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If token is invalid and trying to access protected route, redirect to login
      if (isProtectedRoute) {
        const url = new URL("/login", request.url);
        url.searchParams.set("redirect", path);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Protected routes
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/cart",
    // Auth routes
    "/login",
    "/register",
    // API routes that should be excluded
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
