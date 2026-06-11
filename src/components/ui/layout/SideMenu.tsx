import { logout } from "@/lib/auth";
import Link from "next/link";

type SideMenuProps = {
  onClose: () => void;
  picture?: string;
  accountHref?: string;
  applicationsHref?: string;
  settingsHref?: string;
  reportIssueHref?: string;
  contactHref?: string;
};

export default function SideMenu({
  onClose,
  picture,
  accountHref = "/account",
  applicationsHref = "/applications",
  settingsHref = "/settings",
  reportIssueHref = "/report-issue",
  contactHref = "/contact",
}: SideMenuProps) {
  return (
    <>
      <button
        onClick={onClose}
        className="fixed inset-0 z-30 cursor-pointer bg-slate-950/30"
        aria-label="Close side menu"
      />

      <aside className="fixed right-0 top-0 z-40 flex min-h-screen w-80 flex-col border-l border-slate-200 bg-white/95 px-5 py-6 shadow-2xl backdrop-blur">
        <div className="mb-8 flex items-center justify-between">
          <img 
            src={picture || undefined}
            className="h-12 w-12 rounded-full border border-slate-300 bg-slate-100" 
          />

          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 transition hover:bg-slate-50"
            aria-label="Close side menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-4">
          <Link
            href={accountHref}
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            My Account
          </Link>

          <Link
            href={applicationsHref}
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            My Applications
          </Link>

          <Link
            href="/subscription"
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Membership
          </Link>

          <Link
            href={settingsHref}
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Settings
          </Link>

          <Link
            href={reportIssueHref}
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Report Issue
          </Link>

          <Link
            href={contactHref}
            onClick={onClose}
            className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </nav>

        <div className="mt-8 space-y-4 border-t border-slate-200 pt-5">
          <button
            onClick={logout}
            className="w-full block rounded-2xl bg-red-600 px-5 py-4 text-center font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            Logout
          </button>

          <button
            onClick={onClose}
            className="w-full cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-2xl font-bold text-slate-500 shadow-sm transition hover:bg-slate-50"
            aria-label="Close menu"
          >
            →
          </button>
        </div>
      </aside>
    </>
  );
}