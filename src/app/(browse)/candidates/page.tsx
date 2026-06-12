"use server"

import { getEmployer, getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { filterInitial, searchCandidates } from "./actions";
import { filter_type } from "@prisma/client";
import RecommendedSeekersList from "@/components/ui/cards/RecommendedSeekersList";
import { FilterForm } from "../actions";

interface CandidatePageProps {
  searchParams: Promise<FilterForm>
}


export default async function EmployerRecommendedSeekersPage({ searchParams }: CandidatePageProps ) {
  const { search, location, work_mode } = await searchParams;

  const user = await getUser();
  if (!user) redirect("/login");

  const employer = await getEmployer();
  if (!employer) redirect("/home")
  
  const limit = user.subscription == "PREMIUM" ? 100 : 10;
  const candidates = await searchCandidates(search || "", location || "", work_mode, limit);

  return (
    <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Job listings
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Create a Job
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Create a job listing and find candidates that suit it.
            </p>
          </div>

            <a
              href="/jobs/create"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create Job
            </a>
       
        </div>
      <RecommendedSeekersList
              candidates={candidates}
              isMember={user.subscription == "PREMIUM"}
              resultLimit={limit}
              searchTerm=""
              filterLabel="Filter"
      />
    </section>
  );
}