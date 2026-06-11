"use server"

import { getEmployer, getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { filterInitial, searchCandidates } from "./actions";
import { filter_type } from "@prisma/client";
import RecommendedSeekersList from "@/components/ui/cards/RecommendedSeekersList";

interface CandidatePageProps {
  searchParams: Promise<{
    search?: string;
    filter_type?: filter_type;
  }>
}


export default async function EmployerRecommendedSeekersPage({ searchParams }: CandidatePageProps ) {
  const { search, filter_type } = await searchParams;

  const user = await getUser();
  if (!user) redirect("/login");

  const employer = await getEmployer();
  if (!employer) redirect("/home")
  
  const limit = user.subscription == "PREMIUM" ? 100 : 10;
  const candidates = await searchCandidates(search || "", filter_type || "")

  return (
    <RecommendedSeekersList
            candidates={candidates}
            isMember={user.subscription == "PREMIUM"}
            resultLimit={limit}
            searchTerm=""
            filterLabel="Filter"
    />
  );
}