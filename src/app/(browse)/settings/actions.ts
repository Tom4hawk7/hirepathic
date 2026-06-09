"use server"

import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { work_mode } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface PreferenceForm {
    work_mode: work_mode,
    location?: string,
}

export async function updatePreferences(formData: FormData) {
    const formResponse = Object.fromEntries(formData.entries());
    const preference = formResponse as unknown as PreferenceForm;

    const user = await getUser();
    if (!user) return;

    const candidate = await prisma.candidate.findFirst({
        where: { user_id: user.id }
    })

    await prisma.candidate.update({
        where: { id: candidate?.id },
        data: {
            preferred_work_mode: preference.work_mode,
            preferred_location: preference.location
        }
    })

    revalidatePath("/settings");
}