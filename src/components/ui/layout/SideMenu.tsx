type SideMenuProps = {
    onClose: () => void;
    accountHref?: string;
    settingsHref?: string;
    reportIssueHref?: string;
    contactHref?: string;
  };
  
  export default function SideMenu({
    onClose,
    accountHref = "/account",
    settingsHref = "/settings",
    reportIssueHref = "/report-issue",
    contactHref = "/contact",
  }: SideMenuProps) {
    return (
      <>
        {/* Dark click-away background */}
        <button
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/30"
          aria-label="Close side menu"
        />
  
        {/* Right side menu */}
        <aside className="fixed right-0 top-0 z-40 min-h-screen w-80 border-l border-slate-200 bg-white/95 px-5 py-6 shadow-2xl backdrop-blur">
          <div className="mb-8 flex items-center justify-between">
            <div className="h-12 w-12 rounded-full border border-slate-300 bg-slate-100" />
  
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 hover:bg-slate-50"
            >
              ✕
            </button>
          </div>
  
          <nav className="space-y-4">
            <a
              href={accountHref}
              className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              My Account
            </a>
  
            <a
              href={settingsHref}
              className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Settings
            </a>
  
            <a
              href={reportIssueHref}
              className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Report Issue
            </a>
  
            <a
              href={contactHref}
              className="block rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Contact Us
            </a>
          </nav>
  
          <button
            onClick={onClose}
            className="absolute bottom-8 left-6 text-3xl font-bold text-slate-500"
            aria-label="Close menu"
          >
            →
          </button>
        </aside>
      </>
    );
  }