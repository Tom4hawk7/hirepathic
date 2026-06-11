"use client";

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import RecommendedJobsList from "@/components/ui/cards/RecommendedJobsList";
import { searchJobsForm } from "./actions";
import { useState, useTransition } from "react";

interface JobsProps {
  initialJobs: any[] | unknown;
  hasMembership: boolean;
  canCreateJob: boolean;
}

export default function Jobs({
  initialJobs,
  hasMembership,
  canCreateJob,
}: JobsProps) {
  const [jobs, setJobs] = useState<any>(initialJobs);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const fetchedJobs = await searchJobsForm(formData);
      if (!fetchedJobs) return;

      console.log("Jobs: ", fetchedJobs);
      setJobs(fetchedJobs);
    });
  }

  return (
    <MainPageLayout
      title="Search results - Seeker looking for Jobs"
      searchPlaceholder="Search job descriptions..."
      searchValue="Product engineer"
      action={onSubmit}
    >
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Job listings
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Browse available jobs
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Search job listings and find roles that match your profile.
            </p>
          </div>

          {canCreateJob && (
            <a
              href="/jobs/create"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create Job
            </a>
          )}
        </div>

        <RecommendedJobsList
          jobs={jobs}
          isMember={hasMembership}
          resultLimit={10}
          searchTerm="Product engineer"
          filterLabel="Filter"
        />
      </section>
    </MainPageLayout>
  );
}