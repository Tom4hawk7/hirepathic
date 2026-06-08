import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { level_of_education, subscription_plans, work_mode } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEGREES, FIELDS_OF_STUDY, generateInstitute, getEnumValue } from "./utils";

export async function createCandidates(count = 100) { 
    const skills = await prisma.skill.findMany();
    const candidates = [];

    const testCandidate = await createTestCandidate();
    candidates.push(testCandidate);
    
    for (let i = 0; i < count; i++) {
        const workExperiences = await createWorkExperiences();
        const candidateSkills = faker.helpers.arrayElements(skills, 4)
        const email = faker.internet.email();



        const candidate = await prisma.user.create({
            data: {
                email: email,
                password: await bcrypt.hash(faker.internet.password(), 10),
                role: "SEEKER",
                subscription: getEnumValue(subscription_plans),

                candidate: {
                    create: {
                        full_name: faker.person.fullName(),
                        phone: faker.phone.number(),
                        email: email,

                        years_of_experience: faker.number.int({ min: 0, max: 4}),
                        preferred_work_mode: getEnumValue(work_mode),
                        preferred_location: faker.location.city(),


                        skills: {
                            create: candidateSkills.map((skill) => ({
                                skills: {
                                    connect: { id: skill.id }
                                }
                            }))

                        },

                        education: {
                            create: {
                                institution: generateInstitute(),
                                degree: faker.helpers.arrayElement(DEGREES),
                                field_of_study: faker.helpers.arrayElement(FIELDS_OF_STUDY),
                                education_level: getEnumValue(level_of_education),
                            }
                        },

                        work_experience: {
                            create: workExperiences.map((experience) => ({
                                company: experience.company,
                                job_title: experience.job_title,
                                description: experience.description,
                                start_date: experience.startDate,
                                end_date: experience.endDate
                            }))
                        }
                        
                    }
                }
            },
           
        })

        candidates.push(candidate);
    }

    return candidates;
}

async function createTestCandidate() {
    const email = process.env.TEST_CANDIDATE_EMAIL as string;
    const password = process.env.TEST_CANDIDATE_PASSWORD as string;

    const skills = await prisma.skill.findMany();

    const workExperiences = await createWorkExperiences();
    const candidateSkills = faker.helpers.arrayElements(skills, 4)

    const candidate = await prisma.user.create({
        data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            role: "SEEKER",
            subscription: getEnumValue(subscription_plans),

            candidate: {
                create: {
                    full_name: faker.person.fullName(),
                    phone: faker.phone.number(),
                    email: email,

                    years_of_experience: faker.number.int({ min: 0, max: 4}),
                    preferred_work_mode: getEnumValue(work_mode),
                    preferred_location: faker.location.city(),

                    
                    skills: {
                        create: candidateSkills.map((skill) => ({
                            skills: {
                                connect: { id: skill.id }
                            }
                        }))

                    },

                    education: {
                        create: {
                            institution: generateInstitute(),
                            degree: faker.helpers.arrayElement(DEGREES),
                            field_of_study: faker.helpers.arrayElement(FIELDS_OF_STUDY),
                            education_level: getEnumValue(level_of_education),
                        }
                    },

                    work_experience: {
                        create: workExperiences.map((experience) => ({
                            company: experience.company,
                            job_title: experience.job_title,
                            description: experience.description,
                            start_date: experience.startDate,
                            end_date: experience.endDate
                        }))
                    }
                    
                }
            }
        },
           
    })

    return candidate;
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