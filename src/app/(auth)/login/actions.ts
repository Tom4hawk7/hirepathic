"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export async function authenticateUser(formData: FormData) {
    console.log("LOGIN START");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("EMAIL:", email);

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !user.password) {
        throw new Error("Invalid email or password");
    }

    console.log("USER FOUND:", user);

    const isValid = await bcrypt.compare(password, user?.password)

    if (!isValid) {
        throw new Error("Invalid password");
    }

    console.log("PASSWORD VALID");

    await createSession(user.id);
    
    redirect("/home")
}