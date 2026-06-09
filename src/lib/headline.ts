import { candidate } from "@prisma/client"
import { prisma } from "./prisma"

export async function generateHeadline(candidate: candidate) {
    const workExperience = await getRecentExperience(candidate.id);
    const skills = (await getSkills(candidate.id)).slice(0, 3);

    const jobPart = workExperience?.job_title && workExperience.company
        ? `${workExperience?.job_title} at ${workExperience?.company}` 
        : `${workExperience?.job_title}`;

    const skillPart = skills.length > 0
        ? skills.join(" • ") : "";
    
    if (jobPart && skillPart) return `${jobPart} | ${skillPart}`;
    if (jobPart) return jobPart;
    if (skillPart) return skillPart;

    return "Professional";
}

export async function getSkills(candidateId: number) {
    const candidate_skills = await prisma.candidate_skill.findMany({
        where: { candidate_id: candidateId },
        select: {
            skills: {
                select: {
                    name: true,
                }
            }
        }
    })

    return candidate_skills.map(cs => cs.skills.name) ;
}

export async function getRecentExperience(candidateId: number) {
    return await prisma.work_experience.findFirst({
        where: { candidate_id: candidateId },
        orderBy: { start_date: "desc" }
    })
}