"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import JobDetailCard from "@/components/ui/cards/JobDetailCard";
import { getJobPageInfo } from "./actions";
import { capitalize } from "@/lib/utils";
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
        picture={job.employer?.user?.picture || ""}
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