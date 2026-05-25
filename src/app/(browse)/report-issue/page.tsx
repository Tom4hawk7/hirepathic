import MainPageLayout from "@/components/ui/layout/MainPageLayout";

export default function ReportIssuePage() {
  return (
    <MainPageLayout
      title="Report Issue"
      searchPlaceholder="Search jobs, candidates, companies..."
    >
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-red-50 to-amber-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
            Support request
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Tell us what went wrong
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Use this page to report bugs, incorrect recommendations, account
            issues, or problems with job and candidate information. This is a
            frontend-only form for now and can later be connected to a backend
            support ticket system.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <form className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-950">
              Issue Details
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Issue Type
                </label>

                <select className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option>Select issue type</option>
                  <option>Login or account issue</option>
                  <option>Incorrect job recommendation</option>
                  <option>Incorrect candidate recommendation</option>
                  <option>Profile information issue</option>
                  <option>Payment or membership issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Issue Title
                </label>

                <input
                  placeholder="Briefly describe the issue"
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </label>

                <textarea
                  placeholder="Explain what happened, what page you were on, and what you expected to happen..."
                  className="mt-2 min-h-40 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Contact Email
                </label>

                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="rounded-2xl bg-red-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700">
                Submit Issue
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                What to include
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• The page where the issue happened</li>
                <li>• What button or action caused it</li>
                <li>• Any error message shown</li>
                <li>• Whether you are a seeker or employer</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                Example
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                “I clicked Post Listing as an employer and was redirected to the
                login page instead of the recommended candidates page.”
              </p>
            </div>
          </aside>
        </div>
      </section>
    </MainPageLayout>
  );
}