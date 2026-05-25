"use client";

import { useState } from "react";
import FormRow from "./FormRow";
import FormInput from "./FormInput";

export default function LoginForm() {
  const [accountType, setAccountType] = useState("seeker");

  const loginHref =
    accountType === "employer"
      ? "/home?role=employer"
      : "/home?role=seeker";

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue to your HirePathic account.
        </p>
      </div>

      <form className="mx-auto max-w-4xl space-y-6">
        <FormRow label="Email">
          <FormInput type="email" placeholder="Enter your email" />
        </FormRow>

        <FormRow label="Password">
          <FormInput type="password" placeholder="Enter your password" />
        </FormRow>

        <div className="grid grid-cols-[280px_1fr] items-center gap-8">
          <label className="text-2xl font-semibold text-slate-800">
            Account type
          </label>

          <select
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="seeker">Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <div className="pt-8 text-center">
          <a
            href={loginHref}
            className="mx-auto block w-80 rounded-2xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Login
          </a>

          <div className="mt-5 flex justify-center gap-6 text-sm font-medium">
            <a
              href="/register/seeker"
              className="text-slate-600 underline hover:text-slate-900"
            >
              Create seeker account
            </a>

            <a
              href="/register/employer"
              className="text-slate-600 underline hover:text-slate-900"
            >
              Create employer account
            </a>
          </div>
        </div>
      </form>
    </>
  );
}