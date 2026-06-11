"use server";

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Jobs from "./Jobs";
import { filterInitial } from "./actions";

export default async function JobsPage() {
  const user = await getUser();

  if (!user) redirect("/login");

  const hasMembership = user.subscription === "PREMIUM";
  const limit = hasMembership ? 100 : 10;

  let initialJobs = await filterInitial(limit);
  if (!initialJobs) initialJobs = [];

  const canCreateJob = user.role === "EMPLOYER";

  return (
    <Jobs
      initialJobs={initialJobs}
      hasMembership={hasMembership}
      canCreateJob={canCreateJob}
    />
  );
}