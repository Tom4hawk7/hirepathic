"use client"

type JobResultCardProps = {
    jobId: number;
    title: string;
    company: string;
    location: string;
    workMode: string;
    requiredSkills: string[];
    matchScore: number;
  };
  
  export default function JobResultCard({
    jobId,
    title,
    company,
    location,
    workMode,
    requiredSkills,
    matchScore,
  }: JobResultCardProps) {
    return (
      <article className="flex gap-5">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-slate-300 bg-indigo-50 text-center text-sm font-semibold text-slate-700 shadow-sm">
          company
          <br />
          logo
        </div>
  
        <a
          href={`/jobs/${jobId}?score=${matchScore}`}
          className="flex flex-1 items-center justify-between rounded-3xl border border-slate-300 bg-white px-8 py-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
        >
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-1 text-slate-600">{company}</p>
            <p className="text-slate-600">
              {location} · {workMode}
            </p>
  
            <div className="mt-3 flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
  
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-500">Match</p>
            <p className="text-2xl font-bold text-indigo-600">{matchScore}%</p>
          </div>
        </a>
      </article>
    );
  }