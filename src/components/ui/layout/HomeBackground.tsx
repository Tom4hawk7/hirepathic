import SearchHeader from "./SearchHeader";

type HomeBackgroundProps = {
  title?: string;
  description?: string;
};

export default function HomeBackground({
  title = "HirePathic helps people and companies find the right match.",
  description = "Candidates can discover relevant jobs while employers can identify suitable candidates using profile information, job requirements, and intelligent recommendations.",
}: HomeBackgroundProps) {
  return (
    <section className="min-h-screen">
      <SearchHeader />

      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Intelligent Talent Matching Platform
              </p>

              <h1 className="max-w-3xl text-6xl font-bold leading-tight text-slate-950">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {description}
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="/jobs"
                  className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                  Browse Jobs
                </a>

                <a
                  href="/candidates"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                >
                  Browse Candidates
                </a>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-3xl border border-blue-200 bg-white/85 p-7 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  For job seekers
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">
                  Get recommended jobs
                </h2>
                <p className="mt-3 text-slate-600">
                  Build a profile with your education, major, experience, and
                  preferences. Then view top job matches.
                </p>
              </div>

              <div className="rounded-3xl border border-indigo-200 bg-white/85 p-7 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  For employers
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">
                  Find suitable candidates
                </h2>
                <p className="mt-3 text-slate-600">
                  Publish job descriptions, filter candidate profiles, and view
                  recommended candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}