type CandidateResultCardProps = {
    candidateId: number;
    name: string;
    education: string;
    experience: string;
    skills: string[];
    matchScore: number;
  };
  
  export default function CandidateResultCard({
    candidateId,
    name,
    education,
    experience,
    skills,
    matchScore,
  }: CandidateResultCardProps) {
    return (
      <article className="flex gap-5">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-slate-300 bg-blue-50 text-center text-sm font-semibold text-slate-700 shadow-sm">
          candidate
          <br />
          photo
        </div>
  
        <a
          href={`/candidates/${candidateId}`}
          className="flex flex-1 items-center justify-between rounded-3xl border border-slate-300 bg-white px-8 py-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">{name}</h2>
            <p className="mt-1 text-slate-600">{education}</p>
            <p className="text-slate-600">{experience}</p>
  
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
  
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-500">Match</p>
            <p className="text-2xl font-bold text-blue-600">{matchScore}%</p>
          </div>
        </a>
      </article>
    );
  }