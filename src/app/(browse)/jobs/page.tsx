"use server";

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { searchJobs } from "./actions";
import RecommendedJobsList from "@/components/ui/cards/RecommendedJobsList";
import { filter_type } from "@prisma/client";

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    filter_type?: filter_type;
  }>
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const user = await getUser();
  const { search, filter_type} = await searchParams;

  if (!user) redirect("/login");
  if (user.role == "EMPLOYER") redirect("/candidates")
    
  const hasMembership = user.subscription === "PREMIUM";
  const limit = hasMembership == true ? 100 : 10;

  const jobs = await searchJobs(search || "", filter_type || "")

    
  return (
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

            <a
              href="/jobs/create"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create Job
            </a>
       
        </div>
    <RecommendedJobsList
      jobs={jobs}
      isMember={hasMembership}
      resultLimit={limit}
      searchTerm="Product engineer"
      filterLabel="Filter"
    />
    </section>
  );
}