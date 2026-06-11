"use server"

import { getEmployer, getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { filterInitial } from "./actions";
import CandidatesList from "./Candidates";

export default async function EmployerRecommendedSeekersPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const employer = await getEmployer();
  if (!employer) redirect("/home")
  
  const employerHasMembership = user.subscription == "PREMIUM";
  const limit = employerHasMembership ? 100 : 10;

  const initialData = await filterInitial(limit);

  return (
    <CandidatesList hasMembership={employerHasMembership} profiles={initialData} />
  );
}