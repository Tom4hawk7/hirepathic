import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import SubscriptionPlanCard from "@/components/ui/cards/SubscriptionPlanCard";

export default function SubscriptionPage() {
  return (
    <MainPageLayout
      title="Membership"
      searchPlaceholder="Search jobs, candidates, companies..."
    >
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-amber-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Membership options
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Unlock more intelligent matches
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Free users can view their top 10 recommended matches. Members can
            view the full ranked list of matches, making it easier to compare
            jobs, companies, and candidates.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SubscriptionPlanCard
            title="Free Plan"
            price="$0"
            description="A basic plan for users who want to browse and receive a limited number of recommendations."
            features={[
              "Create seeker or employer profile",
              "Search jobs and candidates",
              "View top 10 recommended matches",
              "Basic filters and browsing",
            ]}
            buttonText="Current Plan"
          />

          <SubscriptionPlanCard
            title="Membership Plan"
            price="$9.99"
            description="A premium plan for users who want access to the full recommendation list and more visibility."
            features={[
              "View all recommended matches",
              "Access full ranked candidate/job lists",
              "Better comparison between matches",
              "Useful for active job seekers and employers",
            ]}
            buttonText="Upgrade Membership"
            highlighted
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">
            How this affects recommendations
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            This page is frontend-only for now. Later, the backend can store a
            value such as <span className="font-semibold">isMember</span>. If
            <span className="font-semibold"> isMember = false</span>, the
            recommendation pages show only the top 10 results. If
            <span className="font-semibold"> isMember = true</span>, the
            recommendation pages show all available matches.
          </p>
        </div>
      </section>
    </MainPageLayout>
  );
}