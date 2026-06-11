"use server";

import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { level_of_education, work_mode } from "@prisma/client";
import { redirect } from "next/navigation";

interface JobForm {
  title: string;
  description: string;
  required_education_level: level_of_education;
  years_of_experience: string;
  work_mode: work_mode;
  location: string;
  skills: string;
}

export async function createJob(formData: FormData) {
  const formResponse = Object.fromEntries(formData.entries());
  const jobData = formResponse as unknown as JobForm;

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const employer = await prisma.employer.findFirst({
    where: { user_id: user.id },
  });

  if (!employer) {
    redirect("/account");
  }

  const skillList = jobData.skills
    .split(",")
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);

  await prisma.job.create({
    data: {
      title: jobData.title,
      description: jobData.description,
      required_education_level: jobData.required_education_level,
      years_of_experience: Number(jobData.years_of_experience),
      work_mode: jobData.work_mode,
      location: jobData.location,
      employer_id: employer.id,

      job_skills: {
        create: skillList.map((skillName) => ({
          skill: {
            connectOrCreate: {
              where: { name: skillName },
              create: { name: skillName },
            },
          },
        })),
      },
    },
  });

  redirect("/candidates");
}