import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { level_of_education } from "@prisma/client";
import { ROUTES } from "@/config/routes";

interface EducationForm {
    institution: string;
    degree: string;
    field_of_study: string;
    education_level: level_of_education;
}

export async function createEducation(formData: FormData) {
    const formResponse = Object.fromEntries(formData.entries());
    const educationData = formResponse as unknown as EducationForm;

    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId"));

    const candidate = await prisma.candidate.findFirst({
        where: { user_id }
    })

    const education = await prisma.education.create({
        data: {
            candidate_id: candidate?.id,

            institution: educationData.institution,
            degree: educationData.degree,
            field_of_study: educationData.field_of_study,
            education_level: educationData.education_level
        }
    })

    redirect(ROUTES.dashboard.seeker);
}