type CandidateProfileCardProps = {
    name: string;
    education: string;
    experience: string;
    skills: string[];
    personalityBlurb: string;
    contactEmail: string;
    phone: string;
    matchScore: number;
  };
  
  export default function CandidateProfileCard({
    name,
    education,
    experience,
    skills,
    personalityBlurb,
    contactEmail,
    phone,
    matchScore,
  }: CandidateProfileCardProps) {
    return (
      <section className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Left column */}
        <div className="space-y-5">
          <div className="flex h-40 items-center justify-center rounded-3xl border border-slate-300 bg-blue-50 text-center font-semibold text-slate-700 shadow-sm">
            Candidate
            <br />
            Photo
          </div>
  
          <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-center text-lg font-bold text-slate-900">
              Personality Blurb
            </h2>
  
            <p className="mt-3 text-center text-sm leading-6 text-slate-600">
              {personalityBlurb}
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-center text-lg font-bold text-slate-900">
              Contact Information
            </h2>
  
            <div className="mt-3 space-y-2 text-center text-sm text-slate-600">
              <p>{contactEmail}</p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
  
        {/* Main candidate info */}
        <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-300 bg-white p-8 shadow-sm">
          <div className="max-w-xl text-center">
            <p className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {matchScore}% Match
            </p>
  
            <h1 className="text-3xl font-bold text-slate-950">{name}</h1>
  
            <p className="mt-4 text-lg text-slate-700">{education}</p>
            <p className="mt-2 text-lg text-slate-700">{experience}</p>
  
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
  
            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
              <h2 className="font-bold text-slate-900">Candidate Summary</h2>
              <p className="mt-2 leading-7 text-slate-600">
                This candidate has been recommended based on their education,
                experience, skills, and match score for the selected job posting.
                Backend integration can later replace this mock profile with live
                candidate data.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }