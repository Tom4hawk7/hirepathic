import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { work_mode, level_of_education } from "@prisma/client";
import { getEnumValue } from "./utils";

export async function createJobs() {
    const employers = await prisma.employer.findMany();
    const skills = await prisma.skill.findMany();
    const jobs = [];

    for (const employer of employers) {
        const jobCount = faker.number.int({ min: 1, max: 3});

        for (let i = 0; i < jobCount; i++) {
            const job = await prisma.job.create({
                data: {
                    title: faker.person.jobTitle(),
                    description: faker.lorem.paragraph(),
                    location: faker.location.city(),

                    required_education_level: getEnumValue(level_of_education),
                    years_of_experience: faker.number.int({ min: 0, max: 4 }),
                    work_mode: getEnumValue(work_mode),

                    employer_id: employer.id,

                    job_skills: {
                        create: faker.helpers
                            .arrayElements(skills, 3)
                            .map((skill) => ({
                                skill: { connect: { id: skill.id }}
                            }))
                    }
                }
            });
        jobs.push(job);
        }
    }

    return jobs;
}