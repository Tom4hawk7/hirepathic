"use client";

import { useState } from "react";
import SideMenu from "./SideMenu";

type MainPageLayoutProps = {
  title: string;
  searchPlaceholder?: string;
  searchValue?: string;
  children: React.ReactNode;
};

export default function MainPageLayout({
  title,
  searchPlaceholder = "Search...",
  searchValue = "",
  children,
}: MainPageLayoutProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <header className="border-b border-slate-200 bg-white/90 px-8 py-5 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <a
            href="/home?role=seeker"
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700"
          >
            Home
          </a>

          <div className="flex flex-1 items-center rounded-2xl border border-slate-300 bg-white px-5 shadow-sm">
            <input
              defaultValue={searchValue}
              className="h-12 w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
              placeholder={searchPlaceholder}
            />
          </div>

          <select className="h-12 rounded-2xl border border-slate-300 bg-white px-5 font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-50">
            <option>Filter</option>
            <option>Skill</option>
            <option>Education</option>
            <option>Experience</option>
            <option>Location</option>
          </select>

          <button className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Go
          </button>

          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold leading-none text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Open side menu"
          >
            ☰
          </button>
        </div>
      </header>

      <section className="px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-slate-950">{title}</h1>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl">
            {children}
          </div>
        </div>
      </section>

      {isSideMenuOpen && (
        <SideMenu onClose={() => setIsSideMenuOpen(false)} />
      )}
    </main>
  );
}