"use server"

import { Role } from "@/types/user";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export async function authenticateUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("No user exists with this email");
    }

    const isValid = await bcrypt.compare(password, user?.password)

    if (!isValid) {
        throw new Error("Invalid password");
    }

    (await cookies()).set("userId", String(user.id), {
        httpOnly: true,
        secure: true,
        path: "/",
    });

    redirect("/home")

    // if (user.role == "EMPLOYER") {
    //     redirect("/");
    // } else {
    //     redirect(ROUTES.dashboard.seeker);
    // }


}