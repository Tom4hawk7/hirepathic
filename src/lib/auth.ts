"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role, } from "@/types/user";
import { env } from "@/config/env";
import { prisma } from "./prisma";
import { candidate, employer, user } from "@prisma/client";

type SessionPayload = {
    userId: number;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createSession(userId: number) {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
    
    const cookieStore = await cookies();

    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })
}

export async function verifySession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as SessionPayload;
    } catch {
        return null;
    }
}   

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}


export async function getUser() {
    const session = await verifySession();
    if (!session) return null;

    return prisma.user.findUnique({
        where: {
            id: session.userId,
        },
    })
}

export async function getCandidate() {
    const session = await verifySession();
    if (!session) return null;

    return prisma.candidate.findFirst({
        where: {
            user_id: session.userId,
        }
    })
}

export async function getEmployer() {
    const session = await verifySession();
    if (!session) return null;

    return prisma.employer.findFirst({
        where: {
            user_id: session.userId,
        }
    })
}