"use server"

import { filter_type, work_mode } from "@prisma/client"
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

// export async function searchJobsForm(formData: FormData) {
//     const search = formData.get("search") as string;
//     const location = formData.get("location") as string;
//     const work_mode = formData.get("work_mode") as work_mode;


//     return await searchJobs(search, );

// }


// export async function searchCandidates(search: string, location: string, work_mode: work_mode, limit: number): Promise<Candidate[] | undefined>

export async function searchJobs(search: string, location: string, work_mode: work_mode, limit: number): Promise<Job[] | undefined> {
    const user = await getUser();
    if (!user) return;

    const cleanSearch = search.trim();
    const cleanLocation = location.trim().toLowerCase();
    const cleanWorkMode = work_mode || null;

    if (!cleanSearch && !cleanLocation && !cleanWorkMode) {
        console.log("Initial Filter")
        return await filterInitial(limit);
    } else {
        console.log("Filter All")
        return await filterAll(cleanSearch, cleanLocation, cleanWorkMode, limit);
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


async function filterAll(search: string, location: string, work_mode: work_mode, limit: number): Promise<Job[] | undefined> {
    const hasSearch = search !== ''
    const hasLocation = location !== ''
    const hasWorkMode = !!work_mode

    let weightSearch = hasSearch ? 0.6 : 0
    let weightLocation = hasLocation ? 0.2 : 0
    let weightWorkMode = hasWorkMode ? 0.2 : 0

    const total = weightSearch + weightLocation + weightWorkMode;
    weightSearch /= total
    weightLocation /= total 
    weightWorkMode /= total 



    const results = await prisma.$queryRaw`
        SELECT 
            job.id AS id,
            job.title AS title,
            job.location AS location,
            job.work_mode AS "workMode",
            u.picture AS "picture",
            company.name AS company,

            COALESCE(
                ARRAY_AGG(INITCAP(skill.name)), 
                ARRAY[]::text[]
            ) AS "requiredSkills",

            LEAST (
            ROUND (
            (
                CASE
                    WHEN ${search} = '' THEN 0
                    ELSE (
                        GREATEST(
                            LEAST(similarity(COALESCE(job.title, ''), ${search}) * 1.5, 1),
                            LEAST(similarity(COALESCE(job.description, ''), ${search}) * 1.5, 1)
                        ) * ${weightSearch}::float
                    )
                END

                +

                CASE
                    WHEN ${location} = '' THEN 0
                    ELSE LEAST(similarity(COALESCE(job.location, ''), ${location}) * 1.5, 1) * ${weightLocation}::float
                END

                +

                CASE
                    WHEN ${work_mode} = '' THEN 0
                    WHEN job.work_mode = ${work_mode}::work_mode
                    THEN ${weightWorkMode}::float
                    ELSE 0
                END
                

            ) * 120 ), 100 ) AS "matchScore"

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