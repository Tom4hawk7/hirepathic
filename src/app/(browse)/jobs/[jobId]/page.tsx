"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import JobDetailCard from "@/components/ui/cards/JobDetailCard";
import { prisma } from "@/lib/prisma";
// import { SearchParams } from "next/dist/server/request/search-params";
import { applyJob, getJobPageInfo } from "./actions";
import { capitalize } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { getCandidate, getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type JobDetailPageProps = {
  params: Promise<{
    jobId: string;
  }>;
  searchParams: Promise<{
    score: string;
  }>;
};

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    companyInfo:
      "TechNova is a software company focused on building modern web platforms for businesses and education providers.",
    contactEmail: "careers@technova.com",
    phone: "02 9000 1111",
    description:
      "We are looking for a frontend developer to build responsive user interfaces, work with React components, and collaborate with designers and backend developers.",
    requiredEducation: "Bachelor Degree in Computer Science or related field",
    requiredSkills: ["React", "TypeScript", "CSS"],
    experience: "2 years experience",
    workMode: "Hybrid",
    location: "Sydney",
    matchScore: 96,
  },
  {
    id: "2",
    title: "Junior Software Engineer",
    company: "CloudBridge",
    companyInfo:
      "CloudBridge provides cloud-based tools for small businesses and growing technology teams.",
    contactEmail: "hiring@cloudbridge.com",
    phone: "02 9000 2222",
    description:
      "This role involves working on backend APIs, frontend features, bug fixes, and software testing in a supportive engineering team.",
    requiredEducation: "Bachelor Degree or Diploma in IT",
    requiredSkills: ["JavaScript", "Node.js", "APIs"],
    experience: "1 year experience",
    workMode: "Remote",
    location: "Remote",
    matchScore: 93,
  },
  {
    id: "3",
    title: "Product Engineer",
    company: "DataSpark",
    companyInfo:
      "DataSpark builds data products that help companies understand business trends and improve decision making.",
    contactEmail: "jobs@dataspark.com",
    phone: "03 9000 3333",
    description:
      "You will help design and build product features, work with datasets, and collaborate across engineering and product teams.",
    requiredEducation: "Bachelor Degree in Software Engineering, Data Science, or related field",
    requiredSkills: ["Python", "SQL", "Agile"],
    experience: "2 years experience",
    workMode: "On-site",
    location: "Melbourne",
    matchScore: 91,
  },
];

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;

  const job = await getJobPageInfo(Number(jobId));
  const candidate = await getCandidate();

  if (!candidate) redirect("/home")

  const skills = job?.job_skills
    .map(js => capitalize(js.skill.name as string))


  return (
    <MainPageLayout
      title="Company"
      searchPlaceholder="Search job descriptions..."
      searchValue="Product engineer"
    >
      <JobDetailCard
        jobId={job?.id || null}
        candidateId={candidate.id || null}
        title={job?.title || ""}
        company={job?.employer?.company?.name || ""}
        companyInfo={job?.employer?.company?.description || ""}
        contactEmail={job?.employer?.company?.email || ""}
        phone={job?.employer?.company?.phone || ""}
        description={job?.description || ""}
        requiredEducation={job?.required_education_level || ""}
        requiredSkills={skills || []}
        experience={`${job?.years_of_experience} Years` || ""}
        workMode={job?.work_mode || "REMOTE"}
        location={job?.location || ""}
      />
    </MainPageLayout>
  );
}