"use client"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import RecommendedSeekersList from "@/components/ui/cards/RecommendedSeekersList";
import { filterInitial, searchCandidatesForm } from "./actions";
import { useState, useTransition } from "react";

interface EmployeeSeekerPageProps {
    hasMembership: boolean,
    profiles: any[],
}

export default function CandidatesList({ hasMembership, profiles}: EmployeeSeekerPageProps) {
    const [candidates, setCandidates] = useState(profiles);

    const [isPending, startTransition] = useTransition();
    const limit = hasMembership ? 100 : 10


    
    async function onSubmit(formData: FormData) {
        startTransition(async () => {
            const fetchedCandidates = await searchCandidatesForm(formData);
            if (!fetchedCandidates) return;

            setCandidates(fetchedCandidates);
        })
    }

  return (
    <MainPageLayout
      title="Search results - for employer looking for seekers"
      searchPlaceholder="Search candidates..."
      searchValue=""
      action={onSubmit}
    >
      <RecommendedSeekersList
        candidates={candidates}
        isMember={hasMembership}
        resultLimit={limit}
        searchTerm=""
        filterLabel="Filter"
      />
    </MainPageLayout>
  );
}