import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import SeekerSetupForm from "@/components/ui/forms/SeekerSetupForm";

export default function SeekerRegisterPage() {
  return (
    <PopupPageLayout title="add account details / account setup">
      <SeekerSetupForm />
    </PopupPageLayout>
  );
}