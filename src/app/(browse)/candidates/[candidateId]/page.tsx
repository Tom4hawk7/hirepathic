import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import CandidateProfileCard from "@/components/ui/cards/CandidateProfileCard";

type CandidateDetailPageProps = {
  params: Promise<{
    candidateId: string;
  }>;
};

const mockCandidates = [
  {
    id: "1",
    name: "Alex Johnson",
    education: "Bachelor of Computer Science",
    experience: "2 years experience",
    skills: ["React", "Node.js", "SQL"],
    personalityBlurb:
      "Motivated frontend developer who enjoys building clean user interfaces and working in collaborative teams.",
    contactEmail: "alex.johnson@example.com",
    phone: "0400 111 222",
    matchScore: 96,
  },
  {
    id: "2",
    name: "Mia Chen",
    education: "Bachelor of Information Technology",
    experience: "1 year experience",
    skills: ["JavaScript", "CSS", "React"],
    personalityBlurb:
      "Creative problem solver with strong attention to detail and a passion for user-focused design.",
    contactEmail: "mia.chen@example.com",
    phone: "0400 333 444",
    matchScore: 93,
  },
  {
    id: "3",
    name: "Samuel Lee",
    education: "Diploma of IT",
    experience: "3 years experience",
    skills: ["Python", "Databases", "APIs"],
    personalityBlurb:
      "Reliable developer with backend experience and an interest in scalable software systems.",
    contactEmail: "samuel.lee@example.com",
    phone: "0400 555 666",
    matchScore: 91,
  },
];

export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const { candidateId } = await params;

  const candidate =
    mockCandidates.find((person) => person.id === candidateId) ??
    mockCandidates[0];

  return (
    <MainPageLayout
      title="Candidate blurb"
      searchPlaceholder="Search candidates..."
      searchValue="Product engineer"
    >
      <CandidateProfileCard
        name={candidate.name}
        education={candidate.education}
        experience={candidate.experience}
        skills={candidate.skills}
        personalityBlurb={candidate.personalityBlurb}
        contactEmail={candidate.contactEmail}
        phone={candidate.phone}
        matchScore={candidate.matchScore}
      />
    </MainPageLayout>
  );
}