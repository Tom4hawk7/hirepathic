import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

export async function seedApplications() { 
    const candidates = await prisma.candidate.findMany();
    const jobs = await prisma.job.findMany();

    for (const candidate of candidates) {
        const applicationCount = faker.number.int({ min: 1, max: 5 })
        const jobList = [...jobs];

        for (let i = 0; i < applicationCount; i++) {
            const selectedJob = faker.helpers.arrayElement(jobs);
            jobList.splice(jobs.indexOf(selectedJob), 1)

            const applicationDate = faker.date.recent({ days: 365 })

            await prisma.application.create({
                data: {
                    candidate_id: candidate.id,
                    job_id: selectedJob.id,
                    applied_at: applicationDate
                }
            })
        }
    }


}

async function createWorkExperiences() {
    const count = faker.number.int({ min: 1, max: 4})
    const experiences = [];

    for (let i = 0; i < count; i++) {
        const startDate = faker.date.between({
            from: '2020-01-01',
            to: '2026-01-01',
        })

        const endDate = faker.datatype.boolean()
            ? faker.date.between({ from: startDate, to: "2026-01-01" })
            : null;

        experiences.push({
            company: faker.company.name(),
            job_title: faker.person.jobTitle(),
            description: faker.lorem.paragraph(),
            startDate: startDate,
            endDate: endDate,
        })
    }

    return experiences;
}