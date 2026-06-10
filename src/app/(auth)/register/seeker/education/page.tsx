import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import FormInput from "@/components/ui/forms/FormInput";
import FormRow from "@/components/ui/forms/FormRow";
import WorkExperienceForm from "@/components/ui/forms/WorkExperienceForm";

export default async function SeekerEducationPage() {
  return (
    <PopupPageLayout title="Add account details / account setup">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Account setup
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Complete your seeker profile so we can recommend jobs that fit you.
        </p>
      </div>

      <form className="mx-auto max-w-4xl space-y-5">
        <section className="space-y-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Education
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Enter your education details.
            </p>
          </div>

          <FormRow label="Institution">
            <FormInput name="institution" />
          </FormRow>

          <FormRow label="Degree">
            <FormInput name="degree" />
          </FormRow>

          <FormRow label="Field of study">
            <FormInput name="field_of_study" />
          </FormRow>

          <FormRow label="Major">
            <FormInput name="major" />
          </FormRow>

          <FormRow label="Education level" smallLabel>
            <select
              name="education_level"
              defaultValue="HIGH_SCHOOL"
              className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="HIGH_SCHOOL">High School</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="BACHELORS">Bachelors</option>
              <option value="MASTERS">Masters</option>
              <option value="PHD">PhD</option>
            </select>
          </FormRow>
        </section>

        <WorkExperienceForm />

        <div className="pt-8 text-center">
          <input
            type="submit"
            value="Finish Account Setup"
            className="mx-auto inline-block cursor-pointer rounded-2xl bg-blue-600 px-10 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700"
          />
        </div>
      </form>
    </PopupPageLayout>
  );
}