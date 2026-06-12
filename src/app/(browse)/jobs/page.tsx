"use server";

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { searchJobs } from "./actions";
import RecommendedJobsList from "@/components/ui/cards/RecommendedJobsList";
import { filter_type } from "@prisma/client";
import { FilterForm } from "../actions";

interface JobsPageProps {
  searchParams: Promise<FilterForm>
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const user = await getUser();
  const { search, location, work_mode } = await searchParams;

  if (!user) redirect("/login");
  if (user.role == "EMPLOYER") redirect("/candidates")
    
  const hasMembership = user.subscription === "PREMIUM";
  const limit = hasMembership == true ? 100 : 10;

  const jobs = await searchJobs(search || "", location || "", work_mode || "", limit)

    
  return (
      <RecommendedJobsList
        jobs={jobs}
        isMember={hasMembership}
        resultLimit={limit}
        searchTerm="Product engineer"
        filterLabel="Filter"
      />
  );
}