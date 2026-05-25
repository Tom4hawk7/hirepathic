import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import RecommendedJobsList from "@/components/ui/cards/RecommendedJobsList";

export default function JobsPage() {
  const seekerHasMembership = false;

  return (
    <MainPageLayout
      title="Search results - for seeker looking for companies"
      searchPlaceholder="Search job descriptions..."
      searchValue="Product engineer"
    >
      <RecommendedJobsList
        isMember={seekerHasMembership}
        resultLimit={10}
        searchTerm="Product engineer"
        filterLabel="Filter"
      />
    </MainPageLayout>
  );
}