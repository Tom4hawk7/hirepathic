"use server"

import { prisma } from "@/lib/prisma"


export async function applyJob(jobId: number, candidateId: number) {
    await prisma.application.create({
        data: {
            candidate_id: candidateId,
            job_id: jobId
        }
    })
}

export async function getJobPageInfo(jobId: number) {
    const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
            employer: {
                include: {
                    company: true,
                },
            },
            job_skills: {
                include: {
                    skill: true
                }
            }
        },
    })

    return job;
}