import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { work_mode } from "@prisma/client";
import { redirect } from "next/navigation";

interface SeekerForm {
    full_name: string;
    phone: string;
    email: string;
    years_of_experience: number;
    preferred_work_mode: work_mode;
    preferred_location: string;
}

export async function createJob(formData: FormData) {
    const formResponse = Object.fromEntries(formData.entries());
    const seekerData = formResponse as unknown as SeekerForm;

    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId"));

    // Field of study needs to be in another form with more education focused stuff

    const candidate = await prisma.candidate.create({
        data: {
            user_id: user_id,

            full_name: seekerData.full_name,
            phone: seekerData.phone,
            email: seekerData.email,

            years_of_Experience: seekerData.years_of_experience,
            preferred_work_mode: seekerData.preferred_work_mode,
            preferred_location: seekerData.preferred_location
        } 
    })

    redirect("/register/seeker/education");
}