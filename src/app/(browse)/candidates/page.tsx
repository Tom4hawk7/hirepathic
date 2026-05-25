import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import RecommendedSeekersList from "@/components/ui/cards/RecommendedSeekersList";

export default function EmployerRecommendedSeekersPage() {
  const employerHasMembership = false;

  return (
    <MainPageLayout
      title="Search results - for employer looking for seekers"
      searchPlaceholder="Search candidates..."
      searchValue="Product engineer"
    >
      <RecommendedSeekersList
        isMember={employerHasMembership}
        resultLimit={10}
        searchTerm="Product engineer"
        filterLabel="Filter"
      />
    </MainPageLayout>
  );
}