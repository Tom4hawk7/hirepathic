
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { level_of_education, work_mode } from "@prisma/client";
import path from "path";

interface JobForm {
    title: string;
    description: string;
    required_education_level: level_of_education;
    years_of_experience: number;
    work_mode: work_mode;
    location: string;
    skills: string;
}

export async function createJob (formData: FormData) {
    const formResponse = Object.fromEntries(formData.entries());
    const jobData = formResponse as unknown as JobForm;

    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId"));

    const skillList = jobData.skills
        .split(",")
        .map(skill => skill.trim().toLowerCase())
        .filter(Boolean)


    const employer = await prisma.employer.findFirst({
        where: { user_id }
    })

    const job = await prisma.job.create({
        data: {
            title: jobData.title,
            description: jobData.description,
            required_education_level: jobData.required_education_level,
            years_of_experience: jobData.years_of_experience,
            work_mode: jobData.work_mode,
            location: jobData.location,
            employer_id: employer?.id,

            job_skills: {
                create: skillList.map((skillName) => ({
                    skill: {
                        connectOrCreate: {
                            where: { name: skillName },
                            create: { name: skillName }
                        }
                    }
                }))
            }
        }
    })

    redirect(ROUTES.dashboard.employer);
}