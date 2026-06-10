"use server"

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Jobs from "./Jobs"
import { filterInitial } from "./actions";

export default async function JobsPage() {
  const user = await getUser();

  if (!user) redirect("/login");
  if (user.role == "EMPLOYER") redirect("/candidates")
    
    const hasMembership = user.subscription === "PREMIUM";
    const limit = hasMembership == true ? 100 : 10;

    let initialJobs = await filterInitial(limit);
    if (!initialJobs) initialJobs = [];

    console.log("Initial jobs: ",initialJobs);
    
  return (
    <Jobs initialJobs={initialJobs} hasMembership={hasMembership} />
  );
}