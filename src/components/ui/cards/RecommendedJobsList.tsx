import JobResultCard from "./JobResultCard";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  workMode: string;
  requiredSkills: string[];
  matchScore: number;
};

type RecommendedJobsListProps = {
  jobs?: Job[];
  isMember?: boolean;
  resultLimit?: number;
  searchTerm?: string;
  filterLabel?: string;
};

const mockRecommendedJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Sydney",
    workMode: "Hybrid",
    requiredSkills: ["React", "TypeScript", "CSS"],
    matchScore: 96,
  },
  {
    id: 2,
    title: "Junior Software Engineer",
    company: "CloudBridge",
    location: "Remote",
    workMode: "Remote",
    requiredSkills: ["JavaScript", "Node.js", "APIs"],
    matchScore: 93,
  },
  {
    id: 3,
    title: "Product Engineer",
    company: "DataSpark",
    location: "Melbourne",
    workMode: "On-site",
    requiredSkills: ["Python", "SQL", "Agile"],
    matchScore: 91,
  },
  {
    id: 4,
    title: "Web Developer",
    company: "HealthSync",
    location: "Wollongong",
    workMode: "Hybrid",
    requiredSkills: ["HTML", "CSS", "React"],
    matchScore: 89,
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "SecureStack",
    location: "Canberra",
    workMode: "Remote",
    requiredSkills: ["Java", "Spring", "Databases"],
    matchScore: 87,
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "BrightApps",
    location: "Sydney",
    workMode: "Hybrid",
    requiredSkills: ["React", "Node.js", "MongoDB"],
    matchScore: 85,
  },
  {
    id: 7,
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Melbourne",
    workMode: "On-site",
    requiredSkills: ["Python", "Excel", "SQL"],
    matchScore: 83,
  },
  {
    id: 8,
    title: "Cybersecurity Assistant",
    company: "CyberCore",
    location: "Remote",
    workMode: "Remote",
    requiredSkills: ["Linux", "Networking", "Security"],
    matchScore: 81,
  },
  {
    id: 9,
    title: "UI Developer",
    company: "DesignHive",
    location: "Sydney",
    workMode: "Hybrid",
    requiredSkills: ["Figma", "CSS", "React"],
    matchScore: 79,
  },
  {
    id: 10,
    title: "IT Support Developer",
    company: "NetAssist",
    location: "Wollongong",
    workMode: "On-site",
    requiredSkills: ["Troubleshooting", "SQL", "Scripting"],
    matchScore: 77,
  },
  {
    id: 11,
    title: "Software Tester",
    company: "QualityLoop",
    location: "Remote",
    workMode: "Remote",
    requiredSkills: ["Testing", "Git", "Automation"],
    matchScore: 74,
  },
  {
    id: 12,
    title: "Cloud Graduate",
    company: "NimbusTech",
    location: "Sydney",
    workMode: "Hybrid",
    requiredSkills: ["Cloud", "Python", "APIs"],
    matchScore: 72,
  },
];

export default function RecommendedJobsList({
  jobs = mockRecommendedJobs,
  isMember = false,
  resultLimit = 10,
  searchTerm = "Product engineer",
  filterLabel = "Filter",
  
}: RecommendedJobsListProps) {
  const visibleJobs = isMember ? jobs : jobs.slice(0, resultLimit);
  const hiddenCount = Math.max(jobs.length - visibleJobs.length, 0);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-700">
            Showing Results for: {searchTerm} + {filterLabel}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Showing {visibleJobs.length} of {jobs.length} recommended jobs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          {isMember
            ? "Membership active: displaying all matches"
            : `Free plan: displaying top ${resultLimit} matches`}
        </div>
      </div>

      {!isMember && hiddenCount > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {hiddenCount} additional job matches are hidden because this account
          does not have an active membership.
        </div>
      )}

      <div className="space-y-5">
        {visibleJobs.map((job) => (
          <JobResultCard
            key={job.id}
            jobId={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            workMode={job.workMode}
            requiredSkills={job.requiredSkills}
            matchScore={job.matchScore}
          />
        ))}
      </div>
    </section>
  );
}