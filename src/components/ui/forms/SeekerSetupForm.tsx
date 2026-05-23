import FormRow from "./FormRow";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function SeekerSetupForm() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Account setup</h2>
        <p className="mt-2 text-sm text-slate-500">
          Complete your seeker profile so we can recommend jobs that fit you.
        </p>
      </div>

      <form className="mx-auto max-w-4xl space-y-5">
        <FormRow label="Full Name">
          <FormInput />
        </FormRow>

        <FormRow label="Phone Number">
          <FormInput />
        </FormRow>

        <FormRow label="Email Address">
          <FormInput type="email" />
        </FormRow>

        <FormRow label="Major/ Field of study">
          <FormInput />
        </FormRow>

        <FormRow label="Years of Experience">
          <FormInput type="number" />
        </FormRow>

        <FormRow label="Preffered woking mode" smallLabel>
          <FormSelect
            options={[
              "Select mode",
              "Remote",
              "On-site",
              "Hybrid",
            ]}
          />
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
  );
}