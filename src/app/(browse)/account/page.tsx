"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import { getCandidate, getUser } from "@/lib/auth";

export default async function AccountPage() {
  const user = await getUser();
  const candidate = await getCandidate();

  // just a test for how it would work

  // doesn't work that well but this is just an example
  // const profile = user?.role == "EMPLOYER"
  //     ? await getEmployer()
  //     : await getCandidate()


  return (
    <MainPageLayout
      title="My Account"
      searchPlaceholder="Search jobs, candidates, companies..."
    >
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
            status. This page is frontend-only for now and can later be connected
            to backend user data.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <img 
            src={user?.picture || undefined} alt=""
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-sm font-semibold text-slate-600"/>


            <h3 className="mt-5 text-2xl font-bold text-slate-950">
              {candidate?.full_name}
            </h3>

            <p className="mt-1 text-slate-600">Candidate</p>
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
              <InfoBox label="Full Name" value={candidate?.full_name || ""} />
              <InfoBox label="Email Address" value={candidate?.email || ""} />
              <InfoBox label="Account Type" value={user?.role || ""} />
              <InfoBox label="Membership" value={user?.subscription || ""} />
              {/* <InfoBox label="Education" value={candidate.education} /> */}
              <InfoBox label="Experience" value={`${String(candidate?.years_of_experience)} Years`} />
              <InfoBox label="Preferred Work Mode" value={candidate?.preferred_work_mode || ""}
              />
              <InfoBox label="Location" value={candidate?.preferred_location || ""} />
            </div>

            {/* <h3 className="text-2xl font-bold text-slate-950">
              Account Details
            </h3> */}

            {/* gave a heading above as an example,
                I would personally show something different depending on the role of the user at hand 
                I would move the infoboxes into a div down here and show the corresponding information here
                */}
            

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700">
                Edit Profile
              </button>

              <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainPageLayout>
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