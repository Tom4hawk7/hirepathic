import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import LoginForm from "@/components/ui/forms/LoginForm";

export default function LoginPage() {
  return (
    <PopupPageLayout title="Login">
      <LoginForm />
    </PopupPageLayout>
  );
}