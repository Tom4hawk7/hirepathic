"use server"

import { filter_type } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { getRecentExperience, getSkills } from "@/lib/headline";
import { getCandidate, getUser } from "@/lib/auth";
import { Job } from "@/components/ui/cards/RecommendedJobsList";


const educationRank = {
  HIGH_SCHOOL: 1,
  DIPLOMA: 2,
  ASSOCIATE: 3,
  BACHELORS: 4,
  MASTERS: 5,
  PHD: 6
};

interface FilterForm {
    search: string,
    filter_type: filter_type
}

export async function searchJobsForm(formData: FormData) {
    const search = formData.get("search") as string;
    const filter_type = formData.get("filter_type") as filter_type;

    return await searchJobs(search, filter_type);

}

export async function searchJobs(search: string, filter: filter_type | "" = ""): Promise<Job[] | undefined> {
    const user = await getUser();
    if (!user) return;

    const limit = user.subscription == "PREMIUM" ? 100 : 10;

    switch (filter) {
        case "ALL":
            return await filterAll(search, limit);
        
        case "EDUCATION":
            return await filterEducation(search, limit);
        
        case "SKILL":
            return await filterSkill(search, limit);
        
        case "LOCATION":
            return await filterLocation(search, limit);
        
        default:
            return await filterInitial(limit)
    }
}

export async function filterInitial(limit: number): Promise<Job[] | undefined> {
    const candidate = await getCandidate();
    if (!candidate) return;

    const experience = await getRecentExperience(candidate?.id);

    const education = await prisma.education.findFirst({
        where: { candidate_id: candidate.id },
    }) 
    
    const eduLevel = education?.education_level || "HIGH_SCHOOL";


    const results = await prisma.$queryRaw`
        SELECT 
            job.id,
            job.title,
            job.location,
            job.work_mode AS "workMode",
            u.picture AS "picture",
            company.name AS company,

            COALESCE(
                ARRAY_AGG(INITCAP(skill.name)), 
                ARRAY[]::text[]
            ) AS "requiredSkills",

            ROUND(
            (
            similarity(job.title, ${experience?.job_title})
            ) * 70 

            +

            CASE
                WHEN ${educationRank[eduLevel]} >= 
                    CASE job.required_education_level
                        WHEN 'HIGH_SCHOOL' THEN 1
                        WHEN 'DIPLOMA' THEN 2
                        WHEN 'ASSOCIATE' THEN 3
                        WHEN 'BACHELORS' THEN 4
                        WHEN 'MASTERS' THEN 5
                        WHEN 'PHD' THEN 6
                    END
                THEN 30

            WHEN ${educationRank[eduLevel]} =
                    (CASE job.required_education_level
                        WHEN 'HIGH_SCHOOL' THEN 1
                        WHEN 'DIPLOMA' THEN 2
                        WHEN 'ASSOCIATE' THEN 3
                        WHEN 'BACHELORS' THEN 4
                        WHEN 'MASTERS' THEN 5
                        WHEN 'PHD' THEN 6
                    END) - 1
            THEN 15

            ELSE 0
            END

            ) AS "matchScore"

        FROM job
        JOIN employer ON job.employer_id = employer.id
        JOIN company ON employer.company_id = company.id

        LEFT JOIN "user" u ON u.id = employer.user_id
        
        LEFT JOIN job_skill ON job_skill.job_id = job.id
        LEFT JOIN skill ON skill.id = job_skill.skill_id

        WHERE
            job.title IS NOT NULL
            AND job.location IS NOT NULL
            AND job.work_mode IS NOT NULL
            AND "picture" IS NOT NULL

        GROUP BY 
            job.id, 
            company.name,
            picture
        ORDER BY "matchScore" DESC
        LIMIT ${limit};
    `;

    return results as Promise<Job[] | undefined> ;
} 


async function filterAll(query: string, limit: number): Promise<Job[] | undefined> {
    console.log("Query: ", query);

    const results = await prisma.$queryRaw`
        SELECT 
            job.id AS id,
            job.title AS title,
            job.location AS location,
            job.work_mode AS workMode,
            u.picture AS "picture",
            company.name AS company,

            COALESCE(
                ARRAY_AGG(INITCAP(skill.name)), 
                ARRAY[]::text[]
            ) AS "requiredSkills",

            ROUND (
            (
                (
                    similarity(COALESCE(job.title, ''), ${query}) * 3 +
                    similarity(COALESCE(job.description, ''), ${query}) * 2 +
                    similarity(COALESCE(job.location, ''), ${query}) 
                ) / 6.0
            ) * 100 ) AS "matchScore"

        FROM job
        JOIN employer ON job.employer_id = employer.id
        JOIN company ON employer.company_id = company.id

        LEFT JOIN "user" u ON u.id = employer.user_id
        LEFT JOIN job_skill ON job_skill.job_id = job.id
        LEFT JOIN skill ON skill.id = job_skill.skill_id

        WHERE
            job.title IS NOT NULL
            AND job.location IS NOT NULL
            AND job.work_mode IS NOT NULL
            AND "picture" IS NOT NULL
            
        GROUP BY job.id, company.name, picture
        ORDER BY "matchScore" DESC
        LIMIT ${limit};
    `;

    console.log("Filtered: ", results)
    return results as Promise<Job[] | undefined> ;


}

async function filterSkill(query: string, limit: number): Promise<Job[] | undefined> {
    return undefined;

}

async function filterEducation(query: string, limit: number): Promise<Job[] | undefined> {
    return undefined;
}

async function filterLocation(query: string, limit: number): Promise<Job[] | undefined> {
    return undefined;

}