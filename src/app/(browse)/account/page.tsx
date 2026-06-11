"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import { getCandidate, getEmployer, getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { capitalize } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  let employer;
  let candidate;

  if (user.role == "SEEKER") {
    candidate = await getCandidate();
  } else {
    employer = await prisma.employer.findFirst({
      where: { user_id: user.id },
      select: {
        company: {
          select: {
            name: true,
            description: true,
            website: true,
            industry: true,
            location: true
          }
        }
      }
    })
  }
  
  return (
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Account overview
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Manage your HirePathic profile
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            View your account details, profile information, and membership
            status.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <img 
            src={user?.picture || undefined} alt=""
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-sm font-semibold text-slate-600"/>


            <p className="mt-1 text-slate-600">{capitalize(user?.role || "")}</p>
            {/* <p className="mt-1 text-slate-600">{candidate}</p> */}

            <div className="mt-5 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
              {user?.subscription}
            </div>

            <a
              href="/subscription"
              className="mt-5 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              View Membership
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-950">
              Account Details
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              { candidate 
                ? <InfoBox label="Full Name" value={candidate?.full_name || ""} />
                : <InfoBox label="Company" value={employer?.company?.name || "" } />
              }

              <InfoBox label="Email Address" value={user?.email || ""} />
              <InfoBox label="Account Type" value={capitalize(user?.role || "") || ""} />
              <InfoBox label="Membership" value={capitalize(user?.subscription || "") || ""} />

              { candidate 
              ? <>
                  <InfoBox label="Phone" value={candidate.phone || ""} />
                  <InfoBox label="Experience" value={  `${String(candidate?.years_of_experience)} Years`} />
                  <InfoBox label="Preferred Work Mode" value={candidate?.preferred_work_mode || ""} />
                  <InfoBox label="Location" value={candidate?.preferred_location || ""} />
                </>
              :
                <>
                  <InfoBox label="Website" value={employer?.company?.website || ""} />
                  <InfoBox label="Description" value={employer?.company?.description || ""} />
                  <InfoBox label="Industry" value={employer?.company?.industry || ""} />
                  <InfoBox label="Location" value={employer?.company?.location || ""} />
                </>
              }
            </div>              
          </div>
        </div>
      </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}