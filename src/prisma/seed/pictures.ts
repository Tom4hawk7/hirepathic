import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

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