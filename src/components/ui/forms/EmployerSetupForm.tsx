import FormRow from "./FormRow";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextArea";

export default function EmployerSetupForm() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Employer Account Setup
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add your company details so you can create job postings and find
          suitable candidates.
        </p>
      </div>

      <form className="mx-auto max-w-4xl space-y-5">
        <FormRow label="Company Name">
          <FormInput />
        </FormRow>

        <FormRow label="Company Email">
          <FormInput type="email" />
        </FormRow>

        <FormRow label="Phone Number">
          <FormInput />
        </FormRow>

        <FormRow label="Industry">
          <FormInput placeholder="e.g. Technology, Health, Finance" />
        </FormRow>

        <FormRow label="Company Location" smallLabel>
          <FormInput placeholder="e.g. Sydney, Wollongong, Remote" />
        </FormRow>

        <FormRow label="Company Website" smallLabel>
          <FormInput placeholder="https://example.com" />
        </FormRow>

        <div className="grid grid-cols-[280px_1fr] items-start gap-8">
          <label className="pt-3 text-xl font-semibold text-slate-800">
            Company Information
          </label>
          <FormTextarea placeholder="Briefly describe your company..." />
        </div>

        <div className="grid grid-cols-[280px_1fr] items-start gap-8">
          <label className="pt-3 text-xl font-semibold text-slate-800">
            Hiring Interests
          </label>
          <FormTextarea placeholder="What types of candidates are you looking for?" />
        </div>

        <div className="pt-8 text-center">
          <a
            href="/jobs/create"
            className="mx-auto inline-block rounded-2xl bg-indigo-600 px-10 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Finish Employer Setup
          </a>
        </div>
      </form>
    </>
  );
}