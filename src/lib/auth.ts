import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role, } from "@/types/user";
import { env } from "@/config/env";
import { prisma } from "./prisma";
import { candidate, employer, user } from "@prisma/client";

export type AuthUser = {
    id: string;
    role: Role;
}

// findUnique if you could get the bloody schema to accept it (would be faster)

// this is not good authentication but it is just a demo app
export async function getUser(): Promise<user | null> {
    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId")?.value);

    if (!user_id && user_id !== 0) return null;

    return await prisma.user.findUnique({
        where: { id: user_id }
    })
}

export async function getEmployer(): Promise<employer | null> {
    const user_id = await getId();
    if (!user_id) return null;

    return await prisma.employer.findFirst({
        where: { user_id: user_id }
    })
}

export async function getCandidate(): Promise<candidate | null> {
    const user_id = await getId();
    if (!user_id) return null;

    return await prisma.candidate.findFirst({
        where: { user_id: user_id }
    })
}

export async function getId(): Promise<number | null> {
    const cookieStore = await cookies();
    return Number(cookieStore.get("userId")?.value);
}