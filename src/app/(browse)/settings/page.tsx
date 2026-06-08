"use server"

import MainPageLayout from "@/components/ui/layout/MainPageLayout";
import { updatePreferences } from "./actions";
import { getId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user_id = await getId()
  if (!user_id) redirect("/login");

  const candidate = await prisma.candidate.findFirst({
    where: { user_id: user_id},
  })

  return (
    <MainPageLayout
      title="Settings"
      searchPlaceholder="Search jobs, candidates, companies..."
    >
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Preferences
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Manage your account settings
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Update notification preferences, privacy options, and display
            settings. These controls are frontend-only for now and can later be
            connected to backend account settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SettingsSection title="Notifications">
            <SettingToggle
              title="Email notifications"
              description="Receive updates about new matches, job postings, and account activity."
              checked
            />

            <SettingToggle
              title="Recommendation alerts"
              description="Notify me when new recommended jobs or candidates are available."
              checked
            />

            <SettingToggle
              title="Marketing updates"
              description="Receive occasional product updates and membership offers."
            />
          </SettingsSection>

          <SettingsSection title="Privacy">
            <SettingToggle
              title="Show profile in search"
              description="Allow your profile to appear in job or candidate search results."
              checked
            />

            <SettingToggle
              title="Show contact information"
              description="Allow matched users to view your contact information."
            />

            <SettingToggle
              title="Share profile with recommended matches"
              description="Allow your profile to be included in recommendation results."
              checked
            />
          </SettingsSection>
        </div>

        <form action={updatePreferences}>
          <SettingsSection title="Account preferences">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Preferred work mode
                </label>

                <select 
                  key={candidate?.preferred_work_mode}
                  name="work_mode"
                  defaultValue={candidate?.preferred_work_mode || "HYBRID"}
                  className="mt-3 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option value="HYBRID" >Hybrid</option>
                  <option value="REMOTE" >Remote</option>
                  <option value="ON_SITE" >On-site</option>
                </select>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Preferred location
                </label>

                <input
                  placeholder="e.g. Sydney"
                  name="location"
                  defaultValue={candidate?.preferred_location || ""}
                  className="mt-3 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6">
              <input 
                type="submit"
                value="Save Settings"
                className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
               />
            </div>
          </SettingsSection>
        </form>
      </section>
    </MainPageLayout>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-950">{title}</h3>

      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  checked = false,
}: {
  title: string;
  description: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={checked} className="peer sr-only" />
        <div className="h-7 w-12 rounded-full bg-slate-300 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:bg-blue-600 peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}