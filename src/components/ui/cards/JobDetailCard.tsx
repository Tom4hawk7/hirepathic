type JobDetailCardProps = {
    title: string;
    company: string;
    companyInfo: string;
    contactEmail: string;
    phone: string;
    description: string;
    requiredEducation: string;
    requiredSkills: string[];
    experience: string;
    workMode: string;
    location: string;
    matchScore: number;
    picture?: string;
  };
  
  export default function JobDetailCard({
    title,
    company,
    companyInfo,
    contactEmail,
    phone,
    description,
    requiredEducation,
    requiredSkills,
    experience,
    workMode,
    location,
    matchScore,
    picture,
  }: JobDetailCardProps) {
    return (
      <section className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-5">

          {
            picture ? <img src={picture || undefined}
                            className="flex h-40 items-center justify-center rounded-3xl border border-slate-300 bg-indigo-50 text-center font-semibold text-slate-700 shadow-sm" />
                    : <div className="flex h-40 items-center justify-center rounded-3xl border border-slate-300 bg-indigo-50 text-center font-semibold text-slate-700 shadow-sm">
                        Company
                        <br />
                        Logo
                      </div>
          }

    
          
  
          <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-center text-lg font-bold text-slate-900">
              Company Info
            </h2>
  
            <p className="mt-3 text-center text-sm leading-6 text-slate-600">
              {companyInfo}
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
  
        <div className="rounded-3xl border border-slate-300 bg-white p-8 shadow-sm">
          <div className="text-center">
            <p className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {matchScore}% Match
            </p>
  
            <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
            <p className="mt-2 text-xl font-semibold text-slate-700">
              {company}
            </p>
            <p className="mt-1 text-slate-600">
              {location} · {workMode}
            </p>
          </div>
  
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-900">Job Description</h2>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </div>
  
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h2 className="font-bold text-slate-900">Required Education</h2>
                <p className="mt-2 text-slate-600">{requiredEducation}</p>
              </div>
  
              <div className="rounded-2xl bg-slate-50 p-5">
                <h2 className="font-bold text-slate-900">Experience</h2>
                <p className="mt-2 text-slate-600">{experience}</p>
              </div>
            </div>
  
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-900">Required Skills</h2>
  
              <div className="mt-3 flex flex-wrap gap-2">
                {requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
  
            <div className="pt-2 text-center">
              <a
                href="/applications"
                className="inline-block rounded-2xl bg-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Apply / Save Job
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }