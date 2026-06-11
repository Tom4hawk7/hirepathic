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
      <RecommendedJobsList
        jobs={jobs}
        isMember={hasMembership}
        resultLimit={limit}
        searchTerm="Product engineer"
        filterLabel="Filter"
      />
  );
}