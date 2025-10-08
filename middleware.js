import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // if using cookies
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.clone();

  // Protect admin route
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    if (role !== "ADMIN") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // Protect todo route
  if (url.pathname.startsWith("/todo")) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/todo/:path*"], // paths to protect
};
