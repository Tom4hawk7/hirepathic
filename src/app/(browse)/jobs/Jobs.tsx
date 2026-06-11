"use client"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import RecommendedJobsList from "@/components/ui/cards/RecommendedJobsList";
import { searchJobsForm } from "./actions";
import { useState, useTransition } from "react";

interface JobsProps {
    initialJobs: any[] | unknown;
    hasMembership: boolean;
}

export default function Jobs({ initialJobs, hasMembership }: JobsProps) {
    const [jobs, setJobs] = useState<any>(initialJobs);
    const [isPending, startTransition] = useTransition();

    async function onSubmit(formData: FormData) {
        startTransition(async () => {
            const fetchedJobs = await searchJobsForm(formData);
            if (!fetchedJobs) return;

            console.log("Jobs: ", fetchedJobs);
            setJobs(fetchedJobs);
        })

    }

  return (
    <MainPageLayout
      title="Search results - Seeker looking for Jobs"
      searchPlaceholder="Search job descriptions..."
      searchValue="Product engineer"
      action={onSubmit}
    >
      <RecommendedJobsList
        jobs={jobs}
        isMember={hasMembership}
        resultLimit={10}
        searchTerm="Product engineer"
        filterLabel="Filter"
      />
    </MainPageLayout>
  );
}