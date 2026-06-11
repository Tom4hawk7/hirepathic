"use server"

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { level_of_education } from "@prisma/client";
import { getCandidate, getUser } from "@/lib/auth";

interface EducationForm {
    institution: string;
    degree: string;
    field_of_study: string;
    education_level: level_of_education;
    work_experiences: string;
}


export async function saveProfile(formData: FormData) {
  const formResponse = Object.fromEntries(formData.entries());
  const educationData = formResponse as unknown as EducationForm;
  
  const work_experiences = educationData.work_experiences
  ? JSON.parse(educationData.work_experiences)
  : [];
  
  const candidate = await getCandidate();

  const cleanWorkExperiences = work_experiences.map(
    ({ id, start_date, end_date, ...rest }: any) => ({
        ...rest,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        candidate_id: candidate?.id
    })
  );

  // creating education

  const education = await prisma.education.create({
        data: {
            candidate_id: candidate?.id,
            institution: educationData.institution,
            degree: educationData.degree,
            field_of_study: educationData.field_of_study,
            education_level: educationData.education_level
        }
    })

  // creating work experiences
  const workExperience = await prisma.work_experience.createMany({
    data: cleanWorkExperiences
  })

  redirect("/home");
}