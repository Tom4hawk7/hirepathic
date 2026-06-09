"use server"

import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import FormRow from "@/components/ui/forms/FormRow";
import FormInput from "@/components/ui/forms/FormInput";
import { registerUser } from "./actions";

export default async function Home() {
  return (
    <PopupPageLayout title="Create Account">
      <form className="mx-auto mt-2 max-w-4xl space-y-6" action={registerUser}>
        <div className="flex items-center justify-between gap-8 border-b border-slate-200 pb-6">
          <p className="text-2xl font-semibold text-slate-900">
            Create an account
          </p>
        </div>

        <FormRow label="Email">
          <FormInput type="email" name="email" required={true} />
        </FormRow>

        <FormRow label="Password">
          <FormInput type="password" name="password" required={true} />
        </FormRow>

        <div className="grid grid-cols-[280px_1fr] items-center gap-8">
          <label className="text-2xl font-semibold text-slate-800">
            Account type
          </label>

          <select
            className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            name="role"
          >
            <option value="SEEKER">Seeker</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </div>
        

        <div className="pt-8 text-center">
          <input type="submit" className="mx-auto block w-80 rounded-2xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700" value="Create"/>

          <a
            href="/login"
            className="mt-4 block text-sm font-medium text-slate-600 underline hover:text-slate-900"
          >
            Already a user? Click Here!
          </a>
        </div>
      </form >
    </PopupPageLayout>
  );
}