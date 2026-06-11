"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import { getCandidate, getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ApplicationsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const candidate = await getCandidate();

  const applications = await prisma.application.findMany({
    where: { candidate_id: candidate?.id },
    select: {
      id: true,
      applied_at: true,
    
      candidate: true,

      job: {
        select: {
          id: true,
          title: true,
          description: true,
          required_education_level: true,
          work_mode: true,
          location: true,


          employer: {
            select: {
              company: {
                select: {
                  name: true
                }
              },
              user: {
                select: {
                  picture: true
                }
              }
            }
          }
        }
      }
    }
  })


  const mockApplications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova",
      status: "Applied",
      location: "Sydney",
      workMode: "Hybrid",
      date: "25 May 2026",
    },
    {
      id: 2,
      title: "Junior Software Engineer",
      company: "CloudBridge",
      status: "Saved",
      location: "Remote",
      workMode: "Remote",
      date: "24 May 2026",
    },
    {
      id: 3,
      title: "Product Engineer",
      company: "DataSpark",
      status: "Interview Pending",
      location: "Melbourne",
      workMode: "On-site",
      date: "22 May 2026",
    },
  ];

  return (
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Job tracking
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Track your saved and applied jobs
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            View jobs you have saved, applied for, or are currently tracking.
            This page is frontend-only for now and can later be connected to
            backend application data.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                My job applications
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Showing saved and applied jobs.
              </p>
            </div>

            <a
              href="/jobs"
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Browse More Jobs
            </a>
          </div>

          <div className="space-y-5">
            {applications.map((application) => (
              <a
                key={application.id}
                href={`/jobs/${application.job.id}`}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h4 className="text-xl font-bold text-slate-950">
                    {application.job.title}
                  </h4>

                  <p className="mt-1 font-semibold text-slate-700">
                    {application.job.employer?.company?.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {application.job.location} · {application.job.work_mode}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Added on {application.applied_at.toDateString()}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    Applied
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
  );
}