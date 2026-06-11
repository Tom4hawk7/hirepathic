"use client";

import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import SideMenu from "@/components/ui/layout/SideMenu";
import { globalSearch } from "./actions";
import { User } from "@/types/user";
import SearchHeader from "@/components/ui/layout/SearchHeader";

const titleMap: Record<string, string> = {
    "/account": "My Account",
    "/applications": "Applications",
    "/candidates": "Candidates",
    "/jobs": "Jobs",
    "/contact": "Contact Us",
    "/home": "Home",
    "/report-issue": "Report Issue",
    "/settings": "Settings",
    "/subscription": "Membership",
    "/jobs/create": "Create Job"
}


type BrowseLayoutProps = {
  children: React.ReactNode;
  user: any;
};

export default function ClientBrowseLayout({ children, user }: BrowseLayoutProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const pathname = usePathname();

  let title = titleMap[pathname] ?? "Home";
  let extended = pathname == "/jobs" || pathname == "/candidates";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <header className="border-b border-slate-200 bg-white/90 px-4 py-5 shadow-sm backdrop-blur sm:px-8">
      <form 
        action={globalSearch}
        className="mx-auto max-w-7xl"
      >
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/home"
            className="cursor-pointer rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            Home
          </a>

          <div className="min-w-[260px] flex-1 rounded-2xl border border-slate-300 bg-white px-5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              className="h-12 w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Search jobs, candidates, companies..."
            />
          </div>

          <select 
            name="filter_type"
            defaultValue="ALL"
            className="h-12 cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">Filter</option>
            <option value="SKILL">Skill</option>
            <option value="EDUCATION">Education</option>
            <option value="EXPERIENCE">Experience</option>
            <option value="LOCATION">Location</option>
          </select>

          <input 
            type="submit" 
            value="Search"
            className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          />

          <button
            type="button"
            onClick={() => setIsSideMenuOpen(true)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold leading-none text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Open side menu"
          >
            ☰
          </button>
        </div>

        { extended &&
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Pay</option>
            <option value="0-50000">$0 - $50k</option>
            <option value="50000-80000">$50k - $80k</option>
            <option value="80000-120000">$80k - $120k</option>
            <option value="120000+">$120k+</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Type</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CASUAL">Casual</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CONTRACT">Contract</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Remote</option>
            <option value="REMOTE">Remote</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ONSITE">On-site</option>
          </select>

          <select className="h-10 cursor-pointer rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="ALL">Listing time</option>
            <option value="24_HOURS">Last 24 hours</option>
            <option value="7_DAYS">Last 7 days</option>
            <option value="14_DAYS">Last 14 days</option>
            <option value="30_DAYS">Last 30 days</option>
          </select>
        </div>
        }
      </form>
    </header>
    

        {/* <form 
          action={globalSearch}
          className="mx-auto flex max-w-7xl items-center gap-4">
          <a
            href="/home"
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            Home
          </a>

          <div className="flex flex-1 items-center rounded-2xl border border-slate-300 bg-white px-5 shadow-sm">
            <input
              name="search"
              defaultValue=""
              className="h-12 w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Search..."
            />
          </div>

          <select 
            name="filter_type"
            defaultValue="ALL"
            className="h-12 rounded-2xl border border-slate-300 bg-white px-5 font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50"
          >
            <option value="ALL" >Filter</option>
            <option value="SKILL" >Skill</option>
            <option value="EDUCATION" >Education</option>
            <option value="EXPERIENCE" >Experience</option>
            <option value="LOCATION" >Location</option>
          </select>

          <input 
            type="submit" 
            value="Search"
            className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          />

          <button
            type="button"
            onClick={() => setIsSideMenuOpen(true)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold leading-none text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Open side menu"
          >
            ☰
          </button>
        </form>
      </header> */}

      <section className="px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-slate-950">{title}</h1>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl">
            {children}
          </div>
        </div>
      </section>

      {isSideMenuOpen && (
        <SideMenu picture={user.picture}  onClose={() => setIsSideMenuOpen(false)} />
      )}
    </main>
  );
}