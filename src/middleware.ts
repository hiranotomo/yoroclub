import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Protect staff static files from direct access
  if (req.nextUrl.pathname.startsWith("/staff/") && req.nextUrl.pathname !== "/staff") {
    const referer = req.headers.get("referer") || "";
    const host = req.nextUrl.origin;
    // Allow if request comes from same origin (iframe in staff page)
    if (referer.startsWith(host + "/staff")) {
      return NextResponse.next();
    }
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/staff/:path+"],
};
