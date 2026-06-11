import { work_mode } from "@prisma/client";
import JobResultCard from "./JobResultCard";
import { redirect } from "next/navigation";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  workMode: work_mode;
  picture?: string;
  requiredSkills: string[];
  matchScore: number;
};

type RecommendedJobsListProps = {
  jobs?: Job[];
  isMember?: boolean;
  resultLimit?: number;
  searchTerm?: string;
  filterLabel?: string;
};


export default function RecommendedJobsList({
  jobs,
  isMember = false,
  resultLimit = 10,
  searchTerm = "Product engineer",
  filterLabel = "Filter",
  
}: RecommendedJobsListProps) {
  if (!jobs) redirect("/home")

  const visibleJobs = isMember ? jobs : jobs.slice(0, resultLimit);
  const hiddenCount = Math.max(jobs.length - visibleJobs.length, 0);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-700">
            Showing Results for: {searchTerm} + {filterLabel}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Showing {visibleJobs.length} of {jobs.length} recommended jobs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          {isMember
            ? "Membership active: displaying all matches"
            : `Free plan: displaying top ${resultLimit} matches`}
        </div>
      </div>

      {!isMember && hiddenCount > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {hiddenCount} additional job matches are hidden because this account
          does not have an active membership.
        </div>
      )}

      <div className="space-y-5">
        {visibleJobs.map((job) => (
          <JobResultCard
            key={job.id}
            jobId={job.id}
            title={job.title}
            picture={job.picture}
            company={job.company}
            location={job.location}
            workMode={job.workMode}
            requiredSkills={job.requiredSkills}
            matchScore={job.matchScore}
          />
        ))}
      </div>
    </section>
  );
}