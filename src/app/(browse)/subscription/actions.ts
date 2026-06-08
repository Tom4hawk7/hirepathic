"use server"

import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { subscription_plans } from "@prisma/client"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export async function subscribe() {
    await updateSubscription("PREMIUM");
}

export async function unsubscribe() {
    await updateSubscription("FREE");
}


async function updateSubscription(plan: subscription_plans) {
    const user = await getUser();

    await prisma.user.update({
        where: { id: user?.id },
        data: {
            subscription: plan
        }
    })

    revalidatePath("/subscription");
}