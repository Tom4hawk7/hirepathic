"use client";

import { useState } from "react";
import FormInput from "@/components/ui/forms/FormInput";
import FormRow from "@/components/ui/forms/FormRow";

export type WorkExperience = {
  id: number;
  company: string;
  job_title: string;
  description: string;
  start_date: string;
  end_date: string;
};

export default function WorkExperienceForm() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    { 
      id: Date.now(),
      company: "",
      job_title: "",
      description: "",
      start_date: "",
      end_date: "",
     },
  ]);

  function addExperience() {
    setExperiences((current) => [
      ...current,
      { 
        id: Date.now(),
        company: "",
        job_title: "",
        description: "",
        start_date: "",
        end_date: "",
      },
    ]);
  }

  function updateExperience(
    id: number,
    field: keyof WorkExperience,
    value: string
  ) {
    setExperiences((current) =>
      current.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
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

      <input
        type="hidden"
        name="work_experiences"
        value={JSON.stringify(experiences)}
      />

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
            <FormInput 
              value={experience.job_title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateExperience(experience.id, "job_title", e.target.value)
              }
            />
          </FormRow>

          <FormRow label="Company">
            <FormInput
              value={experience.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateExperience(experience.id, "company", e.target.value)
              }
            />
          </FormRow>


          <FormRow label="Start date">
            <input
              type="date"
              value={experience.start_date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateExperience(experience.id, "start_date", e.target.value)
              }
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </FormRow>

          <FormRow label="End date">
            <input
              type="date"
              value={experience.end_date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateExperience(experience.id, "end_date", e.target.value)
              }
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </FormRow>

          <FormRow label="Description">
            <textarea
              value={experience.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                updateExperience(experience.id, "description", e.target.value)
              }
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