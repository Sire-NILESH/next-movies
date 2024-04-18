import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL("/home", req.url));
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: [
    /*see https://next-auth.js.org/configuration/nextjs#basic-usage
     *
     * see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    //  "/((?!api|_next/static|_next/image|favicon.ico).*)",

    //   added '|auth|' for /auth and its children routes to also not be matched like /auth/signup and /auth/signin pages.
    //   test this out on https://regexr.com/
    "/((?!api|auth|_next/static|_next/image|.*\\.png$).*)",

    //  "/",
    //  "/movies",
    //  "/tv-shows",
    //  "/new-and-popular",
    //  "/my-list",
  ],
};
