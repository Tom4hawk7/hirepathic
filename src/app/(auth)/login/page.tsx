"use server"

import PopupPageLayout from "@/components/ui/layout/PopupPageLayout";
import LoginForm from "@/components/ui/forms/LoginForm";
import FormRow from "@/components/ui/forms/FormRow";
import FormInput from "@/components/ui/forms/FormInput";
import { authenticateUser } from "./actions";

export default async function LoginPage() {

  return (
    <PopupPageLayout title="Login">
          
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">Login</h2>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue to your HirePathic account.
              </p>
            </div>
      
            <form className="mx-auto max-w-4xl space-y-6" action={authenticateUser}>
              <FormRow label="Email">
                <FormInput type="email" name="email" placeholder="Enter your email" />
              </FormRow>
      
              <FormRow label="Password">
                <FormInput type="password" name="password" placeholder="Enter your password" />
              </FormRow>
      
              <div className="pt-8 text-center">
                <a
                  className="mx-auto block w-80 rounded-2xl bg-blue-600 px-6 py-3 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Login
                </a>
      
                <div className="mt-5 flex justify-center gap-6 text-sm font-medium">
                  <input 
                    type="submit" 
                    className="text-slate-600 underline hover:text-slate-900"
                    value="Create an account"
                  />
                </div>
              </div>
            </form>
    </PopupPageLayout>
  );
}