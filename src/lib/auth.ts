import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role } from "@/types/user";
import { env } from "@/config/env";

export type AuthUser = {
    id: string;
    role: Role;
}

export async function getAuthUser(): Promise<AuthUser | null> {
    const token = ((await cookies()).get("token")?.value);
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(env.JWT_SECRET)
        );

        return {
            id: payload.id as string,
            role: payload.role as Role
        };
    } catch {
        return null
    }

} 
