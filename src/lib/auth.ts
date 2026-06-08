import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role, } from "@/types/user";
import { env } from "@/config/env";
import { prisma } from "./prisma";
import { user } from "@prisma/client";

export type AuthUser = {
    id: string;
    role: Role;
}

// this is not good authentication but it is just a demo app
export async function getUser(): Promise<user | null> {
    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId")?.value);

    if (!user_id) return null;

    return await prisma.user.findUnique({
        where: { id: user_id }
    })
}

export async function getId(): Promise<number | null> {
    const cookieStore = await cookies();
    return Number(cookieStore.get("userId")?.value);
}

// export async function getAuthUser(): Promise<AuthUser | null> {
//     const token = ((await cookies()).get("token")?.value);
//     if (!token) return null;

//     try {
//         const { payload } = await jwtVerify(
//             token,
//             new TextEncoder().encode(env.JWT_SECRET)
//         );

//         return {
//             id: payload.id as string,
//             role: payload.role as Role
//         };
//     } catch {
//         return null
//     }

// } 
