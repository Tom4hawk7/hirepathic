import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import FormRow from "@/components/ui/forms/FormRow";
import FormInput from "@/components/ui/forms/FormInput";

export default function Home() {
  return (
    <PopupPageLayout title="Create user">
      <div className="flex items-center justify-between gap-8 border-b border-slate-200 pb-6">
        <p className="text-2xl font-semibold text-slate-900">
          Looking for employees?
        </p>

        <a
          href="/register/employer"
          className="w-80 rounded-2xl bg-indigo-600 px-6 py-3 text-center text-xl font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Click Here!
        </a>
      </div>

      <form className="mx-auto mt-12 max-w-4xl space-y-6">
        <FormRow label="Username">
          <FormInput />
        </FormRow>

        <FormRow label="Password">
          <FormInput type="password" />
        </FormRow>

        <FormRow label="Re-enter Password">
          <FormInput type="password" />
        </FormRow>

        <div className="pt-8 text-center">
          <a
            href="/register/seeker"
            className="mx-auto block w-80 rounded-2xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Create Account
          </a>

          <a
            href="/login"
            className="mt-4 block text-sm font-medium text-slate-600 underline hover:text-slate-900"
          >
            Already a user? Click Here!
          </a>
        </div>
      </form>
    </PopupPageLayout>
  );
}