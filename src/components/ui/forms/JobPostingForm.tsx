import FormRow from "./FormRow";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextArea";

export default function JobPostingForm() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Account setup
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add your job listing details so candidates can be matched to this role.
        </p>
      </div>

      <form className="mx-auto max-w-4xl space-y-5">
        <FormRow label="Job title">
          <FormInput placeholder="e.g. Frontend Developer" />
        </FormRow>

        <div className="grid grid-cols-[280px_1fr] items-start gap-8">
          <label className="pt-3 text-2xl font-semibold text-slate-800">
            Job Description
          </label>
          <FormTextarea placeholder="Describe the role, responsibilities, and expectations..." />
        </div>

        <FormRow label="required education level" smallLabel>
          <FormSelect
            options={[
              "Select education level",
              "High School",
              "Diploma",
              "Bachelor Degree",
              "Master Degree",
              "PhD",
            ]}
          />
        </FormRow>

        <FormRow label="required skills" smallLabel>
          <FormInput placeholder="e.g. React, Node.js, SQL" />
        </FormRow>

        <FormRow label="years of experience" smallLabel>
          <FormInput type="number" placeholder="e.g. 2" />
        </FormRow>

        <FormRow label="work type (remote/on-site)" smallLabel>
          <FormSelect
            options={[
              "Select work type",
              "Remote",
              "On-site",
              "Hybrid",
            ]}
          />
        </FormRow>

        <FormRow label="location">
          <FormInput placeholder="e.g. Sydney, Wollongong, Remote" />
        </FormRow>

        <div className="pt-8 text-center">
          <a
            href="/candidates"
            className="mx-auto inline-block rounded-2xl bg-indigo-600 px-12 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Post Listing
          </a>
        </div>
      </form>
    </>
  );
}