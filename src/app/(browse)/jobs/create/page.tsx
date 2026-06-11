"use server";

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import FormInput from "@/components/ui/forms/FormInput";
import FormRow from "@/components/ui/forms/FormRow";
import FormTextarea from "@/components/ui/forms/FormTextArea";
import { createJob } from "./actions";
import { getEmployer, getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateJobPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const employer = await getEmployer();
  if (!employer) redirect("/account");

  return (
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Employer tools
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Create a new job listing
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Add the role details, required skills, experience level, and work
            type so candidates can find and apply for your job.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <form action={createJob} className="mx-auto max-w-4xl space-y-5">
            <FormRow label="Job title">
              <FormInput
                name="title"
                placeholder="e.g. Frontend Developer"
              />
            </FormRow>

            <div className="grid gap-4 md:grid-cols-[280px_1fr] md:items-start md:gap-8">
              <label className="pt-3 text-2xl font-semibold text-slate-800">
                Job Description
              </label>

              <FormTextarea
                name="description"
                placeholder="Describe the role, responsibilities, and expectations..."
              />
            </div>

            <FormRow label="Required Education Level" smallLabel>
              <select
                name="required_education_level"
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

            <FormRow label="Required skills" smallLabel>
              <FormInput
                name="skills"
                placeholder="e.g. React, Node.js, SQL"
              />
            </FormRow>

            <FormRow label="Years of experience" smallLabel>
              <FormInput
                name="years_of_experience"
                type="number"
                placeholder="e.g. 2"
              />
            </FormRow>

            <FormRow label="Work type" smallLabel>
              <select
                name="work_mode"
                defaultValue="REMOTE"
                className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="REMOTE">Remote</option>
                <option value="ON_SITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </FormRow>

            <FormRow label="Location">
              <FormInput
                name="location"
                placeholder="e.g. Sydney, Wollongong, Remote"
              />
            </FormRow>

            <div className="pt-8 text-center">
              <input
                type="submit"
                value="Post Listing"
                className="mx-auto inline-block cursor-pointer rounded-2xl bg-indigo-600 px-12 py-4 text-xl font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              />
            </div>
          </form>
        </div>
      </section>
  );
}