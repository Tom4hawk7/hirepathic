import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import JobPostingForm from "@/components/ui/forms/JobPostingForm";

export default function EmployerJobListingPage() {
  return (
    <PopupPageLayout
      title="Job posting from company"
      backgroundTitle="HirePathic helps employers create better job matches."
      backgroundDescription="Create a detailed job posting so HirePathic can recommend the most suitable candidates for your role."
    >
      <JobPostingForm />
    </PopupPageLayout>
  );
}