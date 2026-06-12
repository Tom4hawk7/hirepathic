"use server"

import JobDetailCard from "@/components/ui/cards/JobDetailCard";
import { getJobPageInfo } from "./actions";
import { capitalize, convertEduLevel, convertWorkMode } from "@/lib/utils";
import { getCandidate } from "@/lib/auth";
import { redirect } from "next/navigation";

type JobDetailPageProps = {
  params: Promise<{
    jobId: string;
  }>;
  searchParams: Promise<{
    score: string;
  }>;
};


export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;

  const candidate = await getCandidate();
  if (!candidate) redirect("/home");

  const job = await getJobPageInfo(Number(jobId));
  if (!job) redirect("/jobs");

  


  const skills = job?.job_skills
    .map(js => capitalize(js.skill.name as string))


  return (
      <JobDetailCard
        jobId={job?.id || null}
        candidateId={candidate.id || null}
        title={job?.title || ""}
        company={job?.employer?.company?.name || ""}
        companyInfo={job?.employer?.company?.description || ""}
        picture={job.employer?.user?.picture || ""}
        contactEmail={job?.employer?.company?.email || ""}
        phone={job?.employer?.company?.phone || ""}
        description={job?.description || ""}
        requiredEducation={convertEduLevel(job?.required_education_level || "HIGH_SCHOOL")}
        requiredSkills={skills || []}
        experience={`${job?.years_of_experience} Years` || ""}
        workMode={convertWorkMode(job?.work_mode || "REMOTE")}
        location={job?.location || ""}
      />
  );
}