"use server"

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { Role } from "@/types/user";
import { SubscriptionPlan } from "@/types/subscription";
import bcrypt from "bcryptjs";
import { SUBSCRIPTION_PLANS } from "@/config/subscription-plans";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

const FREE_SUBSCRIPTION = "FREE";

export async function registerSeeker(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;

    const existing = await prisma.user.findUnique({
        where: { email}
    });

    if (existing) {
        throw new Error("Email is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
            subscription: FREE_SUBSCRIPTION
        }
    });

    (await cookies()).set("userId", String(user.id), {
        httpOnly: true,
        secure: true,
        path: "/",
    });

    if (role == "SEEKER") {
        redirect(ROUTES.register.seeker);
    } else {
        redirect(ROUTES.register.employer);
    }
}