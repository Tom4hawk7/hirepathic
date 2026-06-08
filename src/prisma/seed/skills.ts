import { prisma } from "@/lib/prisma";

const skillList = [
    "communication",
    "leadership",
    "javascript",
    "python",
    "management",
    "problem solving",
    "time management",
    "customer service",
    "active listening"
]

export async function createSkills() {
    await prisma.skill.createMany({
        data: skillList.map(name => ({ name })),
        skipDuplicates: true
    })
}

