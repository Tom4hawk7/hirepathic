export default function SearchHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-5 shadow-sm backdrop-blur sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/home"
            className="cursor-pointer rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            Home
          </a>

          <div className="min-w-[260px] flex-1 rounded-2xl border border-slate-300 bg-white px-5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              className="h-12 w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Search jobs, candidates, companies..."
            />
          </div>

          <select className="h-12 cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Filter</option>
            <option value="SKILL">Skill</option>
            <option value="EDUCATION">Education</option>
            <option value="EXPERIENCE">Experience</option>
            <option value="LOCATION">Location</option>
          </select>

          <a
            href="/jobs"
            className="cursor-pointer rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Search
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Pay</option>
            <option value="0-50000">$0 - $50k</option>
            <option value="50000-80000">$50k - $80k</option>
            <option value="80000-120000">$80k - $120k</option>
            <option value="120000+">$120k+</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Type</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CASUAL">Casual</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CONTRACT">Contract</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Remote</option>
            <option value="REMOTE">Remote</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ONSITE">On-site</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Listing time</option>
            <option value="24_HOURS">Last 24 hours</option>
            <option value="7_DAYS">Last 7 days</option>
            <option value="14_DAYS">Last 14 days</option>
            <option value="30_DAYS">Last 30 days</option>
          </select>
        </div>
      </div>
    </header>
  );
}