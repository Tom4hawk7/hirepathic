import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { env } from "./config/env";

import { ROUTES } from "./config/routes";
import { Role } from "./types/user";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
        // Verify JWT

        const secret = new TextEncoder().encode(env.JWT_SECRET);

        const { payload } = await jwtVerify(token, secret);
        const role = payload.role as Role;

        // Role based protection

        if (role === "SEEKER") {
            if (pathname.startsWith(ROUTES.browse.candidates)) {
                return NextResponse.redirect(new URL(ROUTES.browse.jobs, request.url));
            } 
            else if (pathname.startsWith(ROUTES.dashboard.employer)) {
                return NextResponse.redirect(new URL(ROUTES.dashboard.seeker, request.url))
            }
        }

        if (role === "EMPLOYER") {
            if (pathname.startsWith(ROUTES.browse.jobs)) {
                return NextResponse.redirect(new URL(ROUTES.browse.candidates, request.url));
            }
            else if (pathname.startsWith(ROUTES.dashboard.seeker)) {
                return NextResponse.redirect(new URL(ROUTES.dashboard.employer, request.url))
            }
        }

        return NextResponse.next();

    } catch (error) {
        console.error("Middleware error: ", error);
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: [
        "/employer/:path*",
        "/seeker/:path*",
        "/candidates/:path*",
        "/jobs/:path*",
    ]
}