"use server"

import { filter_type, work_mode } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth";
import { Candidate } from "@/components/ui/cards/RecommendedSeekersList";


const educationRank = {
  HIGH_SCHOOL: 1,
  DIPLOMA: 2,
  ASSOCIATE: 3,
  BACHELORS: 4,
  MASTERS: 5,
  PHD: 6
};





export async function searchCandidates(search: string, location: string, work_mode: work_mode, limit: number): Promise<Candidate[] | undefined> {
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

export async function filterInitialCandidates(limit: number): Promise<Candidate[] | undefined> {
    return await filterInitial(limit);
}


export async function filterInitial(limit: number): Promise<Candidate[] | undefined> {
    const results = await prisma.$queryRaw`
    WITH job_base AS (
        SELECT
            j.id,
            j.title,
            j.description,
            j.required_education_level,
            j.years_of_experience,
            j.work_mode,
            j.location,
            c.name AS company
        FROM job j
        JOIN employer e ON e.id = j.employer_id
        JOIN company c ON c.id = e.company_id
        ORDER BY j.id
        LIMIT 1
    ),

    candidate_base AS (
        SELECT
            c.id,
            c.full_name,
            c.headline,
            c.years_of_experience,
            c.preferred_location,
            c.user_id
        FROM candidate c
    ),

    candidate_skills AS (
        SELECT
            cs.candidate_id,
            ARRAY_AGG(DISTINCT s.name) AS skills
        FROM candidate_skill cs
        JOIN skill s ON s.id = cs.skill_id
        GROUP BY cs.candidate_id
    ),

    candidate_experience AS (
        SELECT
            ce.candidate_id,
            MAX(ce.job_title) AS job_title
        FROM work_experience ce
        GROUP BY ce.candidate_id
    ),

    candidate_education AS (
        SELECT DISTINCT ON (e.candidate_id)
            e.candidate_id,
            e.degree,
            e.education_level
        FROM education e
        ORDER BY e.candidate_id
    ),

    ranked_candidates AS (
        SELECT
            j.id AS "jobId",
            j.title AS "jobTitle",

            c.id AS "candidateId",
            c.full_name AS name,
            c.headline,
            e.degree AS "education",

            e.education_level,
            c.years_of_experience AS experience,
            c.preferred_location AS location,
            j.company,

            u.picture AS picture,
            sk.skills AS skills,
            exp.job_title AS last_job_title,

            ROUND(
                (
                    -- Title match (0–50)
                    similarity(j.title, COALESCE(exp.job_title, '')) * 50

                    +

                    -- Experience fit (0–30)
                    LEAST(
                        (c.years_of_experience::float /
                        NULLIF(j.years_of_experience, 0)) * 30,
                        30
                    )

                    +

                    -- Education fit (0–20)
                    CASE
                        WHEN
                            CASE e.education_level
                                WHEN 'HIGH_SCHOOL' THEN 1
                                WHEN 'DIPLOMA' THEN 2
                                WHEN 'ASSOCIATE' THEN 3
                                WHEN 'BACHELORS' THEN 4
                                WHEN 'MASTERS' THEN 5
                                WHEN 'PHD' THEN 6
                            END
                            >=
                            CASE j.required_education_level
                                WHEN 'HIGH_SCHOOL' THEN 1
                                WHEN 'DIPLOMA' THEN 2
                                WHEN 'ASSOCIATE' THEN 3
                                WHEN 'BACHELORS' THEN 4
                                WHEN 'MASTERS' THEN 5
                                WHEN 'PHD' THEN 6
                            END
                        THEN 20
                        ELSE 0
                    END
                )
            ) AS "matchScore"

        FROM job_base j
        CROSS JOIN candidate_base c

        LEFT JOIN candidate_skills sk
            ON sk.candidate_id = c.id

        LEFT JOIN candidate_experience exp
            ON exp.candidate_id = c.id

        LEFT JOIN candidate_education e
            ON e.candidate_id = c.id

        LEFT JOIN "user" u
            ON u.id = c.user_id
    ),

    deduped AS (
        SELECT *,
            ROW_NUMBER() OVER (
                PARTITION BY "candidateId"
                ORDER BY "matchScore" DESC
            ) AS rn
        FROM ranked_candidates
    )

    SELECT
        "candidateId" AS "id",
        name,
        education_level,
        education,
        experience,
        skills,
        "matchScore",
        picture
    FROM deduped
    WHERE rn = 1
        AND name IS NOT NULL
        AND education_level IS NOT NULL
        AND education IS NOT NULL
        AND experience IS NOT NULL
        AND skills IS NOT NULL
        AND "matchScore" IS NOT NULL
        AND PICTURE IS NOT NULL
    ORDER BY "matchScore" DESC
    LIMIT ${limit};
    `;

    return results as Promise<Candidate[] | undefined>;
} 


async function filterAll(search: string, location: string, work_mode: work_mode | null, limit: number): Promise<Candidate[] | undefined> {
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



    console.log("search: ", search)
    console.log("location: ", location)
    console.log("Work mode: ", work_mode)
    console.log("limit: ", limit)

    const result = await prisma.$queryRaw`
        WITH candidate_skills AS (
        SELECT
            cs.candidate_id,
            ARRAY_AGG(DISTINCT s.name) AS skills
        FROM candidate_skill cs
        JOIN skill s
            ON s.id = cs.skill_id
        GROUP BY cs.candidate_id
    ),

    candidate_experience AS (
        SELECT
            candidate_id,
            MAX(job_title) AS last_job_title
        FROM work_experience
        GROUP BY candidate_id
    ),

    candidate_education AS (
        SELECT DISTINCT ON (candidate_id)
            candidate_id,
            degree,
            education_level
        FROM education
    )

    SELECT
        c.id,
        c.full_name AS name,
        c.years_of_experience AS experience,
        c.preferred_location AS location,
        c.preferred_work_mode AS work_mode,
        u.picture,

        e.degree AS education,

        COALESCE(
            sk.skills,
            ARRAY[]::text[]
        ) AS skills,

        LEAST (
        ROUND (
            (

                CASE
                    WHEN ${search} = '' THEN 0
                    ELSE
                        GREATEST(
                            LEAST(similarity(COALESCE(c.headline, ''), ${search}) * 1.5, 1 ),
                            LEAST(similarity(COALESCE(exp.last_job_title, ''),${search}) * 1.5, 1)
                    ) * ${weightSearch}::float
            END

            +

            (
                -- Location boost (20)
                LEAST(similarity(COALESCE(c.preferred_location, ''),${location}) * 1.5, 1) * ${weightLocation}::float
            )

            +

            (
                -- Work mode boost (20)
                CASE
                    WHEN ${work_mode} = ''
                    THEN 0

                    WHEN c.preferred_work_mode = ${work_mode}
                    THEN ${weightWorkMode}::float

                    ELSE 0
                END
            )
        ) * 120 ), 100
    ) AS "matchScore"

    FROM candidate c

    LEFT JOIN candidate_skills sk
        ON sk.candidate_id = c.id

    LEFT JOIN candidate_experience exp
        ON exp.candidate_id = c.id

    LEFT JOIN candidate_education e
        ON e.candidate_id = c.id

    LEFT JOIN "user" u
        ON u.id = c.user_id

    WHERE
        (
            ${location} = ''
            OR similarity(
                c.preferred_location,
                ${location}
            ) > 0.05
        )

    AND (
        ${work_mode}::text IS NULL
        OR c.preferred_work_mode = ${work_mode}
    )
    

    ORDER BY "matchScore" DESC
    LIMIT ${limit}`

    console.log("Result: ", result)
    return result as Candidate[];
}

// async function filterAll(query: string, limit: number): Promise<Candidate[] | undefined> {
//     const results = await prisma.$queryRaw`
//     WITH candidate_base AS (
//         SELECT
//             c.id,
//             c.full_name,
//             c.years_of_experience,
//             c.preferred_location,
//             c.headline,
//             c.user_id
//         FROM candidate c
//     ),

//     candidate_skills AS (
//         SELECT
//             cs.candidate_id,
//             ARRAY_AGG(DISTINCT s.name) AS skills
//         FROM candidate_skill cs
//         JOIN skill s ON s.id = cs.skill_id
//         GROUP BY cs.candidate_id
//     ),

//     candidate_experience AS (
//         SELECT
//             ce.candidate_id,
//             MAX(ce.job_title) AS job_title
//         FROM work_experience ce
//         GROUP BY ce.candidate_id
//     ),

//     candidate_education AS (
//         SELECT DISTINCT ON (e.candidate_id)
//             e.candidate_id,
//             e.degree,
//             e.education_level
//         FROM education e
//         ORDER BY e.candidate_id
//     ),

//     job_base AS (
//         SELECT
//             j.id,
//             j.title,
//             j.description,
//             j.required_education_level,
//             j.years_of_experience,
//             j.work_mode,
//             j.location,
//             c.name AS company
//         FROM job j
//         JOIN employer e ON e.id = j.employer_id
//         JOIN company c ON c.id = e.company_id
//         ORDER BY j.id
//         LIMIT 1
//     ),

//     ranked_candidates AS (
//         SELECT
//             j.id AS "jobId",
//             j.title AS "jobTitle",

//             c.id AS "candidateId",
//             c.full_name AS name,
//             c.headline,

//             e.degree AS education,
//             c.years_of_experience AS experience,
//             c.preferred_location AS location,
//             j.company,
//             u.picture AS picture,

//             sk.skills AS skills,

      
//             ROUND(
//                 (
//                     -- Title match (0–60)
//                     (
//                         similarity(j.title, COALESCE(exp.job_title, '')) * 30 +
//                         similarity(c.headline, COALESCE(${query}, '')) * 30
//                     ) 

//                     +

//                     -- Experience fit (0–30)
//                     LEAST(
//                         (c.years_of_experience::float /
//                         NULLIF(j.years_of_experience, 0)) * 30,
//                         30
//                     )

//                     +

//                     -- Education fit (0–10)
//                     CASE
//                         WHEN
//                             CASE e.education_level
//                                 WHEN 'HIGH_SCHOOL' THEN 1
//                                 WHEN 'DIPLOMA' THEN 2
//                                 WHEN 'ASSOCIATE' THEN 3
//                                 WHEN 'BACHELORS' THEN 4
//                                 WHEN 'MASTERS' THEN 5
//                                 WHEN 'PHD' THEN 6
//                             END
//                             >=
//                             CASE j.required_education_level
//                                 WHEN 'HIGH_SCHOOL' THEN 1
//                                 WHEN 'DIPLOMA' THEN 2
//                                 WHEN 'ASSOCIATE' THEN 3
//                                 WHEN 'BACHELORS' THEN 4
//                                 WHEN 'MASTERS' THEN 5
//                                 WHEN 'PHD' THEN 6
//                             END
//                         THEN 10
//                         ELSE 0
//                     END
//                 )
//             ) AS "matchScore"

//         FROM candidate_base c
//         LEFT JOIN candidate_skills sk ON sk.candidate_id = c.id
//         LEFT JOIN candidate_experience exp ON exp.candidate_id = c.id
//         LEFT JOIN candidate_education e ON e.candidate_id = c.id
//         LEFT JOIN "user" u ON u.id = c.user_id
//         CROSS JOIN job_base j
        
        
//     )

//     SELECT DISTINCT
//         "candidateId" AS "id",
//         name,
//         education,
//         experience,
//         skills,
//         "matchScore",
//         "picture"
//     FROM ranked_candidates
//     WHERE 
//         name IS NOT NULL
//         AND education IS NOT NULL
//         AND experience IS NOT NULL
//         AND skills IS NOT NULL
//         AND "matchScore" IS NOT NULL
//         AND PICTURE IS NOT NULL
//     ORDER BY "matchScore" DESC
//     LIMIT ${limit};`;   

//     return results as Promise<Candidate[] | undefined>;
// }

// async function filterSkill(query: string, limit: number): Promise<Candidate[] | undefined> {
//     return undefined;
// }

// async function filterEducation(query: string, limit: number): Promise<Candidate[] | undefined> {
//     return undefined;
// }

// async function filterLocation(query: string, limit: number): Promise<Candidate[] | undefined> {
//     return undefined;
// }