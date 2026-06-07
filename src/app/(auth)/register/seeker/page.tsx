import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import SeekerSetupForm from "@/components/ui/forms/SeekerSetupForm";
import FormInput from "@/components/ui/forms/FormInput";
import FormSelect from "@/components/ui/forms/FormSelect";
import FormRow from "@/components/ui/forms/FormRow";

export default function SeekerRegisterPage() {
  return (
    <PopupPageLayout title="add account details / account setup">
      <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">Account setup</h2>
              <p className="mt-2 text-sm text-slate-500">
                Complete your seeker profile so we can recommend jobs that fit you.
              </p>
            </div>
      
            <form className="mx-auto max-w-4xl space-y-5">
              <FormRow label="Full Name">
                <FormInput name="full_name" />
              </FormRow>
      
              <FormRow label="Phone Number">
                <FormInput name="phone" />
              </FormRow>
      
              <FormRow label="Email Address">
                <FormInput type="email" name="email" />
              </FormRow>
      
              <FormRow label="Major/ Field of study">
                <FormInput name="field_of_study" />
              </FormRow>
      
              <FormRow label="Years of Experience">
                <FormInput type="number" name="years_of_experience" />
              </FormRow>
      
              <FormRow label="Preffered woking mode" smallLabel>
                <select 
                  className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option value="REMOTE">Remote</option>
                    <option value="ON_SITE">On-site</option>
                    <option value="HYBRID">Hybrid</option>
                </select>
              </FormRow>
      
              <FormRow label="Preffered woking location" smallLabel>
                <FormInput />
              </FormRow>
      
              <FormRow label="cv/resume">
                <input
                  type="file"
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </FormRow>
      
              <div className="pt-8 text-center">
                <a
                  href="/jobs"
                  className="mx-auto inline-block rounded-2xl bg-blue-600 px-10 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Finish Account Setup
                </a>
              </div>
            </form>
          </>
    </PopupPageLayout>
  );
}