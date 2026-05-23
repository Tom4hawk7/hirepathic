import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import EmployerSetupForm from "@/components/ui/forms/EmployerSetupForm";

export default function EmployerRegisterPage() {
  return (
    <PopupPageLayout title="Employer details / Account setup">
      <EmployerSetupForm />
    </PopupPageLayout>
  );
}