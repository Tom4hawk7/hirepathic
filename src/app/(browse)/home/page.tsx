"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import { getUser } from "@/lib/auth";
import { capitalize } from "@/lib/utils";
import { filterInitial } from "../jobs/actions";
import { filterInitialCandidates } from "../candidates/actions";
import { redirect } from "next/navigation";
import { work_mode } from "@prisma/client";


export default async function LoggedInHomePage() {
    const user = await getUser();
    const isEmployer = user?.role == "EMPLOYER" ? true : false

  return (
    <MainPageLayout
      title={`${capitalize(user?.role || "")} Home Page`}
      searchPlaceholder="Search jobs, candidates, companies..."
    >
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Welcome back
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            {isEmployer
              ? "Find suitable candidates for your next role."
              : "Find companies and jobs that match your profile."}
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            {isEmployer
              ? "Use HirePathic to post jobs, browse candidate profiles, and view recommended seekers based on job requirements."
              : "Use HirePathic to browse job opportunities, view recommended companies, and find roles based on your education, experience, and preferences."}
          </p>
        </div>

        {isEmployer ? <EmployerHomeContent /> : <SeekerHomeContent />}
      </section>
    </MainPageLayout>
  );
}


type jobCompany = {
  id: number,
  title: string,
  company: string,
  location: string,
  picture?: string,
  workMode: work_mode,
  matchScore: number
}

async function SeekerHomeContent() {
  const user = await getUser();
  if (!user) redirect("/login");

  const jobCompanies = await filterInitial(4) as jobCompany[];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <a
          href="/jobs"
          className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Browse
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">View Jobs</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Search available jobs and recommended company matches.
          </p>
        </a>

        <a
          href="/jobs"
          className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm transition hover:border-indigo-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            Recommendations
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Top Job Matches
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            View your most relevant job opportunities.
          </p>
        </a>

        <a
          href="/subscription"
          className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Membership
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Unlock All Matches
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Free users see top 10. Members can view all matches.
          </p>
        </a>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">
              Recommended jobs
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Based on your profile, education, experience, and preferences.
            </p>
          </div>

          <a
            href="/jobs"
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View all
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {jobCompanies.map((job) => (
            <a
              key={job.id}
              href="/jobs/1"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-blue-50"
            >
              <img 
                src={job.picture || undefined}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-bold text-blue-700 shadow-sm"
              />

              <h4 className="font-bold text-slate-900">{job.company}</h4>
              <p className="mt-2 text-sm text-slate-600">{job.title}</p>
              <p className="mt-1 text-sm text-slate-500">{capitalize(job.workMode)}</p>

              <p className="mt-3 text-sm font-bold text-blue-600">
                {job.matchScore}% match
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

async function EmployerHomeContent() {
  const user = await getUser();
  if (!user) redirect("/login");
  

  const candidates = await filterInitialCandidates(4);
  console.log("Candidates: ", candidates)

  const recommendedCandidates = [
    {
      name: "Alex Johnson",
      education: "Computer Science",
      match: "96%",
    },
    {
      name: "Mia Chen",
      education: "Information Technology",
      match: "93%",
    },
    {
      name: "Samuel Lee",
      education: "Diploma of IT",
      match: "91%",
    },
    {
      name: "Priya Patel",
      education: "Software Engineering",
      match: "89%",
    },
  ];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <a
          href="/jobs/create"
          className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm transition hover:border-indigo-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
            Job posting
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">Post a Job</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create a job listing so candidates can be matched to your role.
          </p>
        </a>

        <a
          href="/candidates"
          className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Recommendations
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            View Candidates
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Browse suitable candidates and recommendation results.
          </p>
        </a>

        <a
          href="/subscription"
          className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Membership
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Unlock All Matches
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Free users see top 10. Members can view all matches.
          </p>
        </a>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">
              Recommended candidates
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Based on your job description, required skills, and experience.
            </p>
          </div>

          <a
            href="/candidates"
            className="rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            View all
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {candidates.map((candidate) => (
            <a
              key={candidate.id}
              href="/candidates/1"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-indigo-300 hover:bg-indigo-50"
            >
              <img
                src={candidate.picture} 
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sm font-bold text-indigo-700 shadow-sm"
              />

              <h4 className="font-bold text-slate-900">{candidate.name}</h4>
              <p className="mt-2 text-sm text-slate-600">
                {candidate.education}
              </p>

              <p className="mt-3 text-sm font-bold text-indigo-600">
                {candidate.matchScore}% match
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}