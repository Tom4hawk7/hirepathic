"use client";

import { useState } from "react";
import FormInput from "@/components/ui/forms/FormInput";
import FormRow from "@/components/ui/forms/FormRow";

type WorkExperience = {
  id: number;
};

export default function WorkExperienceForm() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    { id: Date.now() },
  ]);

  function addExperience() {
    setExperiences((current) => [
      ...current,
      { id: Date.now() },
    ]);
  }

  function removeExperience(id: number) {
    setExperiences((current) =>
      current.filter((experience) => experience.id !== id),
    );
  }

  return (
    <section className="space-y-5 border-t border-slate-200 pt-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Work experience
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Add any previous or current jobs.
        </p>
      </div>

      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900">
              Experience {index + 1}
            </h4>

            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <FormRow label="Job title">
            <FormInput name={`work_experiences[${index}][job_title]`} />
          </FormRow>

          <FormRow label="Company">
            <FormInput name={`work_experiences[${index}][company]`} />
          </FormRow>

          <FormRow label="Location">
            <FormInput name={`work_experiences[${index}][location]`} />
          </FormRow>

          <FormRow label="Start date">
            <input
              type="month"
              name={`work_experiences[${index}][start_date]`}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </FormRow>

          <FormRow label="End date">
            <input
              type="month"
              name={`work_experiences[${index}][end_date]`}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </FormRow>

          <FormRow label="Responsibilities">
            <textarea
              name={`work_experiences[${index}][description]`}
              rows={4}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Describe your main responsibilities and achievements"
            />
          </FormRow>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="rounded-2xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
      >
        + Add another work experience
      </button>
    </section>
  );
}