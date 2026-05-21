import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { env } from "@/config/env";

const ONE_DAY = 60 * 60 * 24;
const SEVEN_DAYS = ONE_DAY * 7;

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // TODO: Evaluating a user instead of creating one
    const user = {
        id: "123",
        email,
        role: "SEEKER",
    };

    // TODO: Check password


    // Create JWT
    const token = await new SignJWT({
        userId: user.id,
        role: user.role,
    })
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
    
    // Set cookie
    const response = NextResponse.json({ success: true })

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SEVEN_DAYS,
    });

    return response;
}