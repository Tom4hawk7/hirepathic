import MainPageLayout from "@/components/ui/layout/MainPageLayout";

export default function ContactPage() {
  return (
    <MainPageLayout
      title="Contact Us"
      searchPlaceholder="Search jobs, candidates, companies..."
    >
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Support and enquiries
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Get in touch with HirePathic
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Contact us for help with your account, job postings, candidate
            recommendations, membership, or general platform questions. This
            page is frontend-only for now and can later be connected to backend
            email/support functionality.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <form className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-950">
              Send a message
            </h3>

            <div className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Full Name
                  </label>

                  <input
                    placeholder="Enter your name"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Enquiry Type
                </label>

                <select className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option>Select enquiry type</option>
                  <option>Account help</option>
                  <option>Job posting help</option>
                  <option>Candidate recommendations</option>
                  <option>Membership or billing</option>
                  <option>General question</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Message
                </label>

                <textarea
                  placeholder="Write your message here..."
                  className="mt-2 min-h-40 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                Contact Information
              </h3>

              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p>support@hirepathic.com</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <p>02 9000 0000</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Location</p>
                  <p>Wollongong, NSW</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                Common Questions
              </h3>

              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">
                    Why can I only see 10 matches?
                  </p>
                  <p>
                    Free accounts display the top 10 matches. Membership can
                    unlock all ranked results.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Can employers contact candidates?
                  </p>
                  <p>
                    Employers can view candidate profiles and contact details
                    once candidate information is available.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/report-issue"
              className="block rounded-3xl border border-red-200 bg-red-50 p-6 text-center font-semibold text-red-700 shadow-sm transition hover:bg-red-100"
            >
              Need to report a bug?
            </a>
          </aside>
        </div>
      </section>
    </MainPageLayout>
  );
}