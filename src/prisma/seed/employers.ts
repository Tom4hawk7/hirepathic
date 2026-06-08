import { prisma } from "@/lib/prisma";
import { faker, fakerFR_SN } from "@faker-js/faker";
import { subscription_plans } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getEnumValue, INDUSTRIES } from "./utils";

export async function createEmployers(count = 100) { 
    const employers = [];

    const testEmployer = await createTestEmployer();
    employers.push(testEmployer);
    
    for (let i = 0; i < count; i++) {
        const employer = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: await bcrypt.hash(faker.internet.password(), 10),
                role: "EMPLOYER",
                subscription: getEnumValue(subscription_plans),

                employer: {
                    create: {
                        company: {
                            create: {
                                name: faker.company.name(),
                                email: faker.internet.email(),
                                phone: faker.phone.number(),
                                industry: faker.helpers.arrayElement(INDUSTRIES),
                                location: faker.location.city(),
                                website: faker.internet.url(),
                                description: faker.company.catchPhrase()
                            }
                        }
                    }
                }
            },
            include: { employer: true }
        })

        employers.push(employer);
    }

    return employers;
}

async function createTestEmployer() {
    const email = process.env.TEST_EMPLOYER_EMAIL as string;
    const password = process.env.TEST_EMPLOYER_PASSWORD as string;

    const employer = await prisma.user.create({
            data: {
                email: email,
                password: await bcrypt.hash(password, 10),
                role: "EMPLOYER",
                subscription: getEnumValue(subscription_plans),

                employer: {
                    create: {
                        company: {
                            create: {
                                name: faker.company.name(),
                                email: faker.internet.email(),
                                phone: faker.phone.number(),
                                industry: faker.helpers.arrayElement(INDUSTRIES),
                                location: faker.location.city(),
                                website: faker.internet.url(),
                                description: faker.company.catchPhrase()
                            }
                        }
                    }
                }
            },
        include: { employer: true }
    })

    return employer;
}