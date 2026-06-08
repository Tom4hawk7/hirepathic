"use server"

import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import JobPostingForm from "@/components/ui/forms/JobPostingForm";
import FormInput from "@/components/ui/forms/FormInput";
import FormRow from "@/components/ui/forms/FormRow";
import FormTextarea from "@/components/ui/forms/FormTextArea";

export default async function EmployerJobListingPage() {
  return (
    <PopupPageLayout
      title="Job posting from company"
      backgroundTitle="HirePathic helps employers create better job matches."
      backgroundDescription="Create a detailed job posting so HirePathic can recommend the most suitable candidates for your role."
    >
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
                <FormInput name="title" placeholder="e.g. Frontend Developer" />
              </FormRow>
      
              <div className="grid grid-cols-[280px_1fr] items-start gap-8">
                <label className="pt-3 text-2xl font-semibold text-slate-800">
                  Job Description
                </label>
                <FormTextarea name="description" placeholder="Describe the role, responsibilities, and expectations..." />
              </div>
      
               <FormRow label="Required Education Level" smallLabel>
                  <select 
                    name="required_education_level"
                    defaultValue="HIGH_SCHOOL"
                    className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                      <option value="HIGH_SCHOOL">High School</option>
                      <option value="DIPLOMA">Diploma</option>
                      <option value="BACHELORS">Bachelors</option>
                      <option value="MASTERS">Masters</option>
                      <option value="PHD">PHD</option>
                  </select>
                </FormRow>
      
              <FormRow label="Required skills" smallLabel>
                <FormInput name="skills" placeholder="e.g. React, Node.js, SQL (split it by comma)" />
              </FormRow>
      
              <FormRow label="Years of experience" smallLabel>
                <FormInput name="years_of_experience" type="number" placeholder="e.g. 2" />
              </FormRow>
      

              <FormRow label="Work type" smallLabel>
                <select 
                  name="work_mode"
                  defaultValue="REMOTE"
                  className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option value="REMOTE">Remote</option>
                    <option value="ON_SITE">On-site</option>
                    <option value="HYBRID">Hybrid</option>
                </select>
              </FormRow>
      
              <FormRow label="location">
                <FormInput name="location" placeholder="e.g. Sydney, Wollongong, Remote" />
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
    </PopupPageLayout>
  );
}