// this page uses mock data for the list as i didnt know how you guys were going to do it 
import CandidateResultCard from "./CandidateResultCard";

type Candidate = {
  id: number;
  name: string;
  education: string;
  experience: string;
  skills: string[];
  matchScore: number;
};

type RecommendedSeekersListProps = {
  candidates?: Candidate[];
  isMember?: boolean;
  resultLimit?: number;
  searchTerm?: string;
  filterLabel?: string;
};

const mockRecommendedSeekers: Candidate[] = [
  {
    id: 1,
    name: "Alex Johnson",
    education: "Bachelor of Computer Science",
    experience: "2 years experience",
    skills: ["React", "Node.js", "SQL"],
    matchScore: 96,
  },
  {
    id: 2,
    name: "Mia Chen",
    education: "Bachelor of Information Technology",
    experience: "1 year experience",
    skills: ["JavaScript", "CSS", "React"],
    matchScore: 93,
  },
  {
    id: 3,
    name: "Samuel Lee",
    education: "Diploma of IT",
    experience: "3 years experience",
    skills: ["Python", "Databases", "APIs"],
    matchScore: 91,
  },
  {
    id: 4,
    name: "Priya Patel",
    education: "Bachelor of Software Engineering",
    experience: "2 years experience",
    skills: ["TypeScript", "Next.js", "UI"],
    matchScore: 89,
  },
  {
    id: 5,
    name: "Daniel Kim",
    education: "Bachelor of Computer Science",
    experience: "1 year experience",
    skills: ["Java", "Spring", "SQL"],
    matchScore: 87,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    education: "Master of IT",
    experience: "4 years experience",
    skills: ["Cloud", "DevOps", "Python"],
    matchScore: 85,
  },
  {
    id: 7,
    name: "Jordan Smith",
    education: "Bachelor of Cybersecurity",
    experience: "2 years experience",
    skills: ["Security", "Linux", "Networking"],
    matchScore: 83,
  },
  {
    id: 8,
    name: "Emily Nguyen",
    education: "Bachelor of Data Science",
    experience: "1 year experience",
    skills: ["Python", "ML", "SQL"],
    matchScore: 81,
  },
  {
    id: 9,
    name: "Chris Brown",
    education: "Diploma of Software Development",
    experience: "2 years experience",
    skills: ["HTML", "CSS", "JavaScript"],
    matchScore: 79,
  },
  {
    id: 10,
    name: "Aisha Ahmed",
    education: "Bachelor of Information Systems",
    experience: "3 years experience",
    skills: ["Business Analysis", "SQL", "Agile"],
    matchScore: 77,
  },
  {
    id: 11,
    name: "Liam Garcia",
    education: "Bachelor of IT",
    experience: "2 years experience",
    skills: ["React", "Testing", "Git"],
    matchScore: 74,
  },
  {
    id: 12,
    name: "Olivia Martin",
    education: "Bachelor of Computer Science",
    experience: "5 years experience",
    skills: ["Leadership", "Cloud", "APIs"],
    matchScore: 72,
  },
];

export default function RecommendedSeekersList({
  candidates = mockRecommendedSeekers,
  isMember = false,
  resultLimit = 10,
  searchTerm = "Product engineer",
  filterLabel = "Filter",
}: RecommendedSeekersListProps) {
  const visibleCandidates = isMember
    ? candidates
    : candidates.slice(0, resultLimit);

  const hiddenCount = Math.max(candidates.length - visibleCandidates.length, 0);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-700">
            Showing Results for: {searchTerm} + {filterLabel}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Showing {visibleCandidates.length} of {candidates.length} recommended seekers.
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
          {hiddenCount} additional matches are hidden because this account does
          not have an active membership.
        </div>
      )}

      <div className="space-y-5">
        {visibleCandidates.map((candidate) => (
          <CandidateResultCard
            key={candidate.id}
            name={candidate.name}
            education={candidate.education}
            experience={candidate.experience}
            skills={candidate.skills}
            matchScore={candidate.matchScore}
          />
        ))}
      </div>
    </section>
  );
}