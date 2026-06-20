import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authed = verifyToken(token);

  // Korumalı admin API'leri: yetkisizse 401 JSON.
  if (pathname.startsWith("/api/admin")) {
    if (!authed) {
      return NextResponse.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin sayfaları: login hariç korumalı.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
