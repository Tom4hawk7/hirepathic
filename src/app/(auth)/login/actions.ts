"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export async function authenticateUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !user.password) {
        throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user?.password)

    if (!isValid) {
        throw new Error("Invalid password");
    }

    await createSession(user.id);
    
    redirect("/home")
}