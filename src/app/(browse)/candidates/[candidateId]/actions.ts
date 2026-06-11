"use server"

import { prisma } from "@/lib/prisma"


// {
//     id: "3",
//     name: "Samuel Lee",
//     education: "Diploma of IT",
//     experience: "3 years experience",
//     skills: ["Python", "Databases", "APIs"],
//     personalityBlurb:
//       "Reliable developer with backend experience and an interest in scalable software systems.",
//     contactEmail: "samuel.lee@example.com",
//     phone: "0400 555 666",
//     matchScore: 91,
//   },


// export async function applyJob(jobId: number, candidateId: number) {
//     await prisma.application.create({
//         data: {
//             candidate_id: candidateId,
//             job_id: jobId
//         }
//     })
// }

export async function getCandidateInfo(candidateId: number) {
    const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
        select: {
            id: true,
            full_name: true,
            years_of_experience: true,
            email: true,
            phone: true,
            
            user: {
                select: { 
                    picture: true
                }
            },

            education: {
                where: { candidate_id: candidateId },
                select: {
                    education_level: true,
                    degree: true,
                },
                take: 1
            },

            skills: {
                select: {
                    skills: {
                        select: {
                            name: true
                        }
                    }
                }
            },

            work_experience: {
                where: { candidate_id: candidateId},
                take: 1,
                select: {
                    description: true
                },
            }
        
        }

    })

    console.log(candidate)

    return candidate;
}