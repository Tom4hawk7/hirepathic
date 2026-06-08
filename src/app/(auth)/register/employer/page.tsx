"use server"

import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import FormRow from "@/components/ui/forms/FormRow";
import FormInput from "@/components/ui/forms/FormInput";
import FormTextarea from "@/components/ui/forms/FormTextArea";
import { createEmployerCompany } from "./actions";

export default async function EmployerRegisterPage() {
  return (
    <PopupPageLayout title="Employer details / Account setup">
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
      
            <form className="mx-auto max-w-4xl space-y-5" action={createEmployerCompany}>
              <FormRow label="Company Name">
                <FormInput name="name" />
              </FormRow>
      
              <FormRow label="Company Email">
                <FormInput type="email" />
              </FormRow>
      
              <FormRow label="Company phone Number">
                <FormInput name="phone" />
              </FormRow>
      
              <FormRow label="Industry">
                <FormInput name="industry" placeholder="e.g. Technology, Health, Finance" />
              </FormRow>
      
              <FormRow label="Company Location" smallLabel>
                <FormInput name="location" placeholder="e.g. Sydney, Wollongong, Remote" />
              </FormRow>
      
              <FormRow label="Company Website" smallLabel>
                <FormInput name="website" placeholder="https://example.com" />
              </FormRow>
      
              <div className="grid grid-cols-[280px_1fr] items-start gap-8">
                <label className="pt-3 text-xl font-semibold text-slate-800">
                  Company Information
                </label>
                <FormTextarea name="description" placeholder="Briefly describe your company..." />
              </div>
      
              <div className="pt-8 text-center">
                <a
                  href="/register/employer/jobpost"
                  className="mx-auto inline-block rounded-2xl bg-indigo-600 px-10 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Finish Employer Setup
                </a>
              </div>
            </form>
          </>
    </PopupPageLayout>
  );
}