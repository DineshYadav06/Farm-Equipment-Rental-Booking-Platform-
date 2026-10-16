import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = [
  "hi",
  "en",
  "pa",
  "mr",
  "gu",
  "bn",
  "ta",
  "te",
  "kn",
  "ml",
  "or",
  "as"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api routes, and next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale, e.g. /en/equipment or /hi
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    const locale = firstSegment;
    const remainingPath = "/" + segments.slice(1).join("/");

    // Rewrite to underlying page path while preserving locale
    const url = request.nextUrl.clone();
    url.pathname = remainingPath || "/";

    const response = NextResponse.rewrite(url);
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 31536000 });
    response.headers.set("x-locale", locale);
    return response;
  }

  // If no locale in URL, use existing cookie or default
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value || "hi";
  const response = NextResponse.next();
  response.headers.set("x-locale", localeCookie);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
