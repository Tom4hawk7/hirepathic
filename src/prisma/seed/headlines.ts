import { generateHeadline } from "@/lib/headline";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

export async function seedHeadlines() {
    const candidates = await prisma.candidate.findMany();

    for (const candidate of candidates) {
        let headline = await generateHeadline(candidate);

        await prisma.candidate.update({
            where: { id: candidate.id },
            data: { headline }
        })

    }
}

export async function generatePictures() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                picture: faker.image.personPortrait({ size: 512})
            }
        })
    }
}