export default function SearchHeader() {
    return (
      <header className="border-b border-slate-200 bg-white/80 px-8 py-5 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <a
            href="/"
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            Home
          </a>
  
          <div className="flex flex-1 items-center rounded-2xl border border-slate-300 bg-white px-5 shadow-sm">
            <input
              className="h-12 w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Search jobs, candidates, companies..."
            />
          </div>
  
          <select className="h-12 rounded-2xl border border-slate-300 bg-white px-5 font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50">
            <option>Filter</option>
            <option>Jobs</option>
            <option>Candidates</option>
            <option>Companies</option>
          </select>
  
          <a
            href="/jobs"
            className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Go
          </a>
        </div>
      </header>
    );
  }